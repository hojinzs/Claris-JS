<template>
    <transition name="pade-opacity">
    <div id="app-welcome"
        v-show="show">
        <div id="app-welcome-wrapper">
            <div id="app-welcome-contents">

                <div v-if="mode == 'new'">
                    <div class="header">닉네임을 입력해주세요.</div>
                    <form v-on:submit.prevent = "newUser">
                        <input
                            class="cl_input"
                            v-model='text'
                            autocomplete="off"/>
                        <button class="cl_button cl_button_blue">설정</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    props: ['show','UserInfo'],
    computed: {
        setMode(){
            if(this.UserInfo == Object){
                return 'reconnect';
            }
            return 'new';
        }
    },
    data: function(){
        return {
            mode : 'new',
            text : ''
        }
    },
    mounted: function(){
        console.log('WelcomeShow Mounted >> ',this.show);
    },
    methods: {
        Hide(){
            this.$emit('siderToggle')
        },
        // 새로운 유저 정보를 사용
        newUser(){
            // 빈값이면 그냥 팅긴다
            if(this.text == '' || null) return;

            // 검증 통과 후 상위 컴포넌트에서 submit 이벤트를 받아 실행한다.
            this.$emit('newUser',this.text);

            // 입력상자 초기화
            this.text = "";
        },
        // 기존 유저 정보를 사용
        oldUser(){

        }
    }
}
</script>
<style scoped>
#app-welcome{
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    width : 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
}

#app-welcome-wrapper{
    position: absolute;
    width: 100%;
    top: 25%;
    padding: 5%;
}

#app-welcome-contents{
    width: 100%
}

#app-welcome-wrapper .header{
    width: 100%;
    text-align: center;
}

#app-welcome-wrapper form input{
    width: 100%;
}

#app-welcome-wrapper button{
    width: 100%;
}

.pade-opacity-enter-active {
  animation: pade-in .5s;
}
.pade-opacity-leave-active {
  animation: pade-in .5s reverse;
}
@keyframes pade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
