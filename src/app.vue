<template>
    <div id="application">
        <!-- 닉네임 입력 전체화면 -->
        <WelcomeShow 
            @submit="setUser"
            :show="WelcomeShow"></WelcomeShow>

        <!-- 접속자수 영역 -->
        <div id="app-topmenu">
            <TopBar>
                <template v-slot:right>
                    <div id="counter"
                        v-on:click="siderToggle(true)">
                        Live :: <span>{{ userConnections }}</span>명
                    </div>
                </template>
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
            :show="RightsliderToggle"
            @siderToggle="siderToggle">
            <template v-slot:header>
                Live User :: {{ userConnections }} 명
            </template>
            <template v-slot:contents>
                <UserCard
                    v-for="user in userList"
                    :key="user.id"
                    :user="user">
                </UserCard>
            </template>
        </RightSilder>
    </div>
</template>
<script>

// controller & librarys
import ChatController from '../static/claris.js'
import MessageHelper from '../static/messageHelper.js'

// Vue components
import WelcomeShow from './components/WelcomeShow'
import TopBar from './components/TopBar'
import ChatDialog from './components/ChatDialog'
import MessageInput from './components/MessageInput'
import RightSilder from './components/RightSlider'
import UserCard from './components/UserCard'


export default {
    components: {
        'TopBar' : TopBar,
        'ChatDialog' : ChatDialog,
        'MessageInput' : MessageInput,
        'RightSilder' : RightSilder,
        'UserCard' : UserCard,
        'WelcomeShow' : WelcomeShow,
    },
    data: function(){
        return{
            messageList : [],
            userList : [],
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
            WelcomeShow : true,
            mode : "user",
            Chat : {},
            currentTime : {},
            RightsliderToggle : false,
        }
    },
    mounted: function(){
        this.Chat = new ChatController();
        this.Chat.on({
            chatMessage : this.receive,
            userList : this.setUserList
        });
        console.log("Vue Modile 'ChatApp' was Mounted!");

        // Welcome 메시지
        let getMessage = new MessageHelper;
        let SetMsg = getMessage.setSystemMessage("당신의 닉네임을 입력해주세요.");
        SetMsg.id = this.messageList.length; //message 에 key(id) 넣기
        this.messageList.push(SetMsg);
    },
    watch: {
        userList: function(){
            console.log('UserList Update!!',this.userList);
        }
    },
    computed: {
        userConnections : function(){
            return this.userList.length;
        },
    },
    methods: {
        /**
         * 메시지 전송시, 채팅 모듈의 SendChat으로 데이터 보냄
         */
        sendMessage: function(msg){
            this.Chat.SendChat(msg);
        },
        /**
         * 유저 정보 설정시, 채팅 모듈의 setUser로 데이터 보냄
         */
        setUser: function(value){
            this.Chat.setNickname(value);
            this.WelcomeShow = false;
            this.$data.mode = 'chat';
            this.$data.messageInput.disabled = false; //메시지 input창 활성화
        },
        /**
         * 채팅 모듈의 메시지 수신 이벤트에 넣을 콜백
         */
        receive: function(response){
            console.log('SERVER RESPONSE >>',response); // (개발용) 서버 메시지 로그

            if(this.Chat.user.id != undefined && this.Chat.user.id == response.user.id){
                response.user.currentUser = true;
            } else {
                response.user.currentUser = false;
            }
            response.id = this.messageList.length + 1; //message 에 key(id) 넣기
            this.messageList.push(response)
        },
        /**
         * 채팅 모듈의 유저 정보 업데이트에 넣을 콜백
         */
        setUserList : function(msg){
            this.userList = msg;
        },
        siderToggle : function(val = false){
            console.log('Slider toggled ::',val);
            this.RightsliderToggle = val;
        },
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
        #app-topmenu {
            display: block;
            overflow: hidden;
            top: 0px;
            height: 40px;
            width: 100%;
        }
        #app-message-lists-wrapper{
            /* padding-top: 5px; */
            /* padding-bottom: 5px; */
            width: 100%;
            height: calc(100% - 90px);
        }
            #app-message-lists {
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
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
        transition: all 0.5s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(15px);
    }
</style>