<template>
    <div id="application">
        <!-- 접속자수 영역 -->
        <div id="topmenu">
            <TopBar>
                <div id="counter"
                    v-on:click="toggleRightSilder(true)">
                    Live :: <span>{{ userConnections() }}</span>명
                </div>
            </TopBar>
        </div>

        <!-- 메시지 영역 -->
        <div id="app-message-lists-wrapper">
            <div id="app-message-lists">
                <transition-group name="list" key="ChatDialog">
                <ChatDialog
                    v-for="message in messageList"
                    :key="message.id"
                    :message='message'>
                </ChatDialog>
                </transition-group>
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
                    @submit="sendMessage">
                </MessageInput>
            </div>
        </div>
        <RightSilder
            v-show="showRightSilder"
            @toggle="toggleRightSilder">
            <template v-slot:header>
                Live User :: {{ userList.connections }}
            </template>
            <template v-slot:contents>
                <div
                    v-for="user in userList"
                    :key="user.id">
                    {{user.name}} :: {{ user.logindate }}
                </div>
            </template>
        </RightSilder>
    </div>
</template>
<script>

// controller & librarys
import ChatController from '../static/claris.js'
import MessageHelper from '../static/messageHelper.js'

// Vue components
import TopBar from './components/TopBar'
import ChatDialog from './components/ChatDialog'
import MessageInput from './components/MessageInput'
import RightSilder from './components/RightSlider'

export default {
    components: {
        'TopBar' : TopBar,
        'ChatDialog' : ChatDialog,
        'MessageInput' : MessageInput,
        'RightSilder' : RightSilder,
    },
    data: function(){
        return{
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
            userList : [],
            mode : "user",
            Chat : {},
            showRightSilder : false,
            currentTime : {},
        }
    },
    mounted: function(){
        this.Chat = new ChatController();
        this.Chat.on(this.receive,this.setUserList); //
        console.log("Vue Modile 'ChatApp' was Mounted!");

        let getMessage = new MessageHelper;
        let SetMsg = getMessage.setSystemMessage("당신의 닉네임을 입력해주세요.");
        this.messageList.push(getMessage.setSystemMessage("당신의 닉네임을 입력해주세요."));
    },
    watch: {
        userList: function(){
            console.log('UserList Update!!',this.userList);
        }
    },
    methods: {
        sendMessage: function(msg){
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
            response.id = this.messageList.length + 1;
            this.messageList.push(response)
        },
        toggleRightSilder: function(toggleVal = null){
            if(toggleVal != null){
                this.showRightSilder = toggleVal;
            } else {
                this.showRightSilder = !this.showRightSilder;
            }
        },
        userConnections : function(){
            return this.userList.length;
        },
        setUserList : function(msg){
            this.userList = msg;
        }
    }
};
</script>
<style>
    * { 
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html body{
        font: 1em Helvetica, Arial;
        margin: 0;
        padding: 0;
        height: 100%;
        /* overflow: hidden; */
    }
    #application{
        /* position: relative; */
        top: 0px;
        bottom: 0px;
        height: 100%;
        width: 100%;
        position: fixed;
        /* overflow: hidden; */
    }
        #topmenu {
            display: block;
            overflow: hidden;
            top: 0px;
            height: 40px;
            width: 100%;
        }
        #app-message-lists-wrapper{
            padding-top: 5px;
            padding-bottom: 5px;
            width: 100%;
            height: calc(100% - 100px);
        }
            #app-message-lists {
                width: 100%;
                height: 100%;
                overflow-y: scroll;
            }
        #app-message-input-wrapper {
            display: block;
            position: absolute;
            overflow: hidden;
            background: #000; 
            height: 50px;
            width: 100%;
            bottom: 0px;
            z-index: 10;
        }
            #app-message-input {
                position: relative;
                width: 100%;
                height: 100%;
            }


    /**animation**/
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
</style>