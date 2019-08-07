<template>
    <div id="application">
        <!-- 닉네임 입력 전체화면 -->
        <WelcomeShow 
            @oldUser="oldUser"
            @newUser="newUser"
            :show="WelcomeToggle"></WelcomeShow>

        <!-- 채팅방 -->
        <ChatRoom ref="room"
            @LoginSuccess="UserLogin"
            @Connction="Connction"
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
    },
    methods: {
        newUser(data){
            console.log("SET NEW USER >> ",data);
            this.$refs.room.setUser(data);
        },
        oldUser(){
            console.log("USE OLD USER >> ",data);
            this.$refs.room.useCurrentUser(data);
        },
        UserLogin(data){
            console.log("USER LOGIN >> ",data);

            this.WelcomeToggle = false;
            this.ChatRooomBlur = false;
        },
        Connction(_val){
            this.Connect = _val;
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
