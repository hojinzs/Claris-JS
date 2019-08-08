<template>
    <div id="application">
        <!-- 닉네임 입력 전체화면 -->
        <WelcomeShow ref="welcome"
            @oldUser="oldUser"
            @newUser="newUser"
            @dropUserData="dropUserData"
            :show="WelcomeToggle"></WelcomeShow>

        <!-- 채팅방 -->
        <ChatRoom ref="room"
            @LoginSuccess="UserLogin"
            @Connction="Connction"
            @getCurrentUserInfo="getCurrentUserInfo"
            :class="{ blur: ChatRooomBlur }">
        </ChatRoom>
    </div>
</template>
<script>
import WelcomeShow from './layouts/WelcomeShow'
import ChatRooom from './layouts/ChatRoom'

export default {
    components: {
        'WelcomeShow' : WelcomeShow,
        'ChatRoom' : ChatRooom,
    },
    data: function(){
        return {
            Connect : 0,
            userInfo : null,
            WelcomeToggle : true,
            ChatRooomBlur : true,
        }
    },
    watch: {
        Connect: function(){
            console.log("Connection Status >> ",this.Connect);

            if(this.Connect == 1){
                this.WelcomeToggle = false;
                this.ChatRooomBlur = false;
            } else {
                this.WelcomeToggle = true;
                this.ChatRooomBlur = true;
            }
        },
        userInfo: function(){
            this.$refs.welcome.setUserInfo(this.userInfo);
        }
    },
    methods: {
        newUser(data){
            console.log("SET NEW USER >> ",data);
            this.$refs.room.setUser(data);
        },
        oldUser(){
            console.log("USE OLD USER >> ",this.userInfo);
            this.$refs.room.useCurrentUser();
        },
        UserLogin(data){
            console.log("USER LOGIN >> ",data);

            this.WelcomeToggle = false;
            this.ChatRooomBlur = false;
        },
        Connction(_val){
            this.Connect = _val;
        },
        getCurrentUserInfo(_user){
            this.userInfo = _user;
        },
        dropUserData(){
            this.$refs.room.dropUserData();
        }
    },
}
</script>
<style scoped>
    #application{
        /* position: relative; */
        top: 0px;
        bottom: 0px;
        height: 100%;
        width: 100%;
        position: fixed;
        /* overflow: hidden; */
    }
</style>
