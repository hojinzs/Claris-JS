<template>
    <div id="application">
        <!-- 접속자수 영역 -->
        <div id="topmenu">
            <TopBar
                v-bind:counter='liveuser'>
            </TopBar>
        </div>

        <!-- 메시지 영역 -->
        <div id="app-message-lists-wrapper">
            <div id="app-message-lists">
                <ChatDialog
                    v-for="message in messageList"
                    :key="message.id"
                    :message='message'>
                </ChatDialog>
            </div>
        </div>

        <div id="app-message-input-wrapper">
            <div id="app-message-input" v-if="mode === 'user'">
                <!-- 닉네임 입력 영역 -->
                <MessageInput
                    :disabled="userInput.disabled"
                    :place-holder='userInput.placeholder'
                    :popup-message='userInput.popupMessage'
                    :default-text='userInput.default'
                    :button-message="userInput.button"
                    :input-focus="true"
                    @submit="setUser">
                </MessageInput>                    
            </div>
            <div id="app-message-input" v-else-if="mode === 'chat'">
                <!-- 메시지 입력 영역 -->
                <MessageInput
                    :disabled="messageInput.disabled"
                    :place-holder='messageInput.placeholder'
                    :popup-message='messageInput.popupMessage'
                    :default-text='messageInput.default'
                    :button-message="messageInput.button"
                    @submit="send">
                </MessageInput>
            </div>
        </div>
    </div>
</template>
<script>

import ChatController from '../static/claris.js'
import MessageHelper from '../static/messageHelper.js'
import TopBar from './components/TopBar.vue'
import ChatDialog from './components/ChatDialog.vue'
import MessageInput from './components/MessageInput.vue'

export default {
    components: {
        'TopBar' : TopBar,
        'ChatDialog' : ChatDialog,
        'MessageInput' : MessageInput,
    },
    data: function(){
        return{
            liveuser : 0,
            messageList : [],
            messageInput : {
                disabled : true,
                default : "",
                placeholder : "255자 이내",
                popupMessage : "type message",
                button : '전송',
            },
            userInput : {
                disabled : false,
                default : "",
                placeholder : "5자 이내",
                popupMessage : "닉네임을 입력해주세요",
                button : '설정',
            },
            user : "",
            mode : "user",
            Chat : {},
        }
    },
    mounted: function(){
        this.Chat = new ChatController();
        this.Chat.on(this.receive); //
        console.log("Vue Modile 'ChatApp' was Mounted!");

        let getMessage = new MessageHelper;
        this.messageList.push(getMessage.setSystemMessage("당신의 닉네임을 입력해주세요."));
    },
    methods: {
        send: function(msg){
            this.Chat.SendChat(msg);
        },
        setUser: function(value){
            this.Chat.setNickname(value);
            this.$data.mode = 'chat';
            this.$data.messageInput.disabled = false;
        },
        receive: function(response){
            console.log('SERVER RESPONSE >>',response);
            console.log('USERID::',this.Chat.user.id,'RESID::',response.user.id);
            if(this.Chat.user.id != undefined && this.Chat.user.id == response.user.id){
                response.user.currentUser = true;
            } else {
                response.user.currentUser = false;
            }
            this.messageList.push(response)
        },
    }
};
</script>
<style>
    #application{
        display: relative;
        bottom: 0px;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    #topmenu {
        display: block;
        overflow: hidden;
        top: 0px;
        height: 40px;
        width: 100%;
    }
    #app-message-lists-wrapper{
        display: block;
        overflow: hidden;
        padding-top: 5px;
        padding-bottom: 5px;
        width: 100%;
        height: calc(100vh - 90px);
        overflow-y: scroll;
    }
    #app-message-input-wrapper {
        display: fixed;
        overflow: hidden;
        background: #000; 
        height: 50px;
        width: 100%;
        bottom: 0px;
        z-index: 10;
    }
    #app-message-lists {
        width: 100%;
    }
    #app-message-input {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>