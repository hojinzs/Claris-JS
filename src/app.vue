<template>
    <div id="application">
        <!-- 접속자수 영역 -->
        <div id="topmenu">
            <TopBar
                v-bind:counter='liveuser'>
            </TopBar>
        </div>

        <!-- 메시지 영역 -->
        <div id="app-message-lists">
            <div id="messages">
                <ChatDialog
                    v-for="message in messageList"
                    :key="message.id"
                    :element-id='"msg_" + message.id'
                    :who="message.who"
                    :text="message.text">
                </ChatDialog>
            </div>
        </div>

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
</template>
<script>
import ChatController from '../static/claris.js'
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
        console.log("Vue Modile 'ChatApp' was Mounted!");

        this.messageList.push({
            who : "(system)",
            text : "당신의 닉네임을 입력해주세요.",
        })
    },
    methods: {
        send: function(msg){
            this.Chat.SendChat(msg);
        },
        setUser: function(value){
            // try {
                this.Chat.on(this.receive);
            // } catch (error) {
            //     alert(error)
            // };

            this.Chat.setNickname(value);
            this.$data.user = value;
            this.$data.mode = 'chat';
            this.$data.messageInput.disabled = false;
            this.messageList.push({
                who : "(system)",
                text : "당신의 닉네임은 '"+this.$data.user+"' 입니다.",
            })
        },
        receive: function(response){
            let length = this.messageList.length;
            this.messageList.push({
                id : length,
                who : response.who,
                text : response.value,
            })
        },
    }
};
</script>
<style>
    #application{
        position: relative;
        bottom: 0px;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    #topmenu {
        position: fixed;
        top: 0px;
        height: 40px;
        width: 100%;
    }
    #app-message-lists {
        margin-top: 30px;
        padding-top: 10px;
        margin-bottom: 70px;
        padding-bottom: 10px;
        width: 100%;
        height: calc(100% - 110px) ;
        overflow-y: scroll;
    }
    #app-message-input {
        background: #000; 
        position: fixed;
        height: 50px;
        width: 100%;
        bottom: 0px;
        z-index: 5;
    }
</style>