<template>
    <div id="chat-room">

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
            <div id="app-message-input">
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
import ChatController from '../../static/claris.js'
import MessageHelper from '../../static/messageHelper.js'

// Vue components
import TopBar from '../components/TopBar'
import ChatDialog from '../components/ChatDialog'
import MessageInput from '../components/MessageInput'
import RightSilder from '../components/RightSlider'
import UserCard from '../components/UserCard'


export default {
    components: {
        'TopBar' : TopBar,
        'ChatDialog' : ChatDialog,
        'MessageInput' : MessageInput,
        'RightSilder' : RightSilder,
        'UserCard' : UserCard,
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
            mode : "user",
            Chat : {},
            currentTime : {},
            RightsliderToggle : false,
        }
    },
    mounted: function(){
        this.Chat = new ChatController({
            _setUser : this.LoginSuccess,
            _chatMessage : this.receive,
            _userList : this.setUserList,
            _connectLost : this.connectLost,
        });
        console.log("Vue Modile 'ChatApp' was Mounted!");

        //객체 등록 후 상위 컴포넌트로 유저 정보를 보낸다.
        this.$emit('getCurrentUserInfo',this.Chat.user);
    },
    watch: {
        userList: function(){
            console.log('UserList Update!!',this.userList);
        }
    },
    computed: {
        /**
         * 현재 접속중인 유저 수 (STATUS == 'LIVE')
         */
        userConnections : function(){
            return this.userList.filter(u => u.connect == 1).length;
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
        },
        /**
         * 기존 유저 정보 사용
         */
        useCurrentUser: function(){
            this.Chat.getUserInfo_to_Server();
        },
        /**
         * 채팅 모듈의 메시지 수신 이벤트에 넣을 콜백
         */
        receive: function(response){
            console.log('SERVER RESPONSE >>',response); // (개발용) 서버 메시지 로그

            response.id = this.messageList.length + 1; //message 에 key(id) 넣기
            this.messageList.push(response)
        },
        /**
         * 채팅 모듈의 유저 정보 업데이트에 넣을 콜백
         */
        setUserList : function(_msg){
            this.userList = _msg;
        },
        LoginSuccess : function(_arr){

            if(_arr != null){
                console.log('LoginSuccess!!',_arr)

                this.$data.mode = 'chat';
                this.$data.messageInput.disabled = false; //메시지 input창 활성화

                this.$emit('LoginSuccess');
                this.$emit('Connction',1);
            };

            this.$emit('getCurrentUserInfo',this.Chat.user);
        },
        connectLost : function(){
            this.$emit('Connction',0);
        },
        /**
         * 오른쪽 슬라이드 메뉴 토글
         */
        siderToggle : function(_val = false){
            console.log('Slider toggled ::',_val);
            this.RightsliderToggle = _val;
        },
        /**
         * 유저 정보를 지움
         */
        dropUserData : function(){
            this.Chat.clearUserInfo();
        },
    }
};
</script>
<style scoped>
    #chat-room{
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