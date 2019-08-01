<template>
    <div id="application">
        <!-- 닉네임 입력 전체화면 -->
        <WelcomeShow 
            @submit="setUser"
            :show="WelcomeToggle"></WelcomeShow>

        <!-- 채팅방 -->
        <ChatRoom ref="room"
            @LoginSuccess="UserLogin"
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
            WelcomeToggle : true,
            ChatRooomBlur : true,
        }
    },
    methods: {
        setUser(data){
            console.log("SET USER >> ",data);
            this.$refs.room.setUser(data);
        },
        UserLogin(data){
            console.log("USER LOGIN >> ",data);

            this.WelcomeToggle = false;
            this.ChatRooomBlur = false;
        },
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
