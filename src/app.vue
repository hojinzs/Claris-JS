<template>
    <div id="application">
        <!-- 닉네임 입력 전체화면 -->
        <WelcomeShow 
            @submit="setUser"
            :show="WelcomeToggle"></WelcomeShow>

        <!-- 채팅방 -->
        <ChatRoom :class="{ blur: ChatRooomBlur }" ref="room"></ChatRoom>
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
            this.WelcomeToggle = false;
            this.$refs.room.setUser(data);
            this.ChatRooomBlur = false;
        }
    },
}
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
    .blur {
        -webkit-filter: blur(4px);
        -moz-filter: blur(4px);
        -o-filter: blur(4px);
        -ms-filter: blur(4px);
        filter: blur(4px);
    }
</style>
