<template>
    <transition name="pade-opacity">
    <div id="app-welcome"
        v-show="show">
        <div id="app-welcome-wrapper">
            <div class="header">닉네임을 입력해주세요.</div>
            <form v-on:submit.prevent = "submit">
                <input
                    v-model='text'
                    autocomplete="off"/>
                    <div class="button-wrapper">
                        <button >설정</button>
                    </div>
            </form>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    props: ['show'],
    data: function(){
        return {
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
        submit(){ // 버튼이 눌러졌을때 실행할 액션
            // 빈값이면 그냥 팅긴다
            if(this.text == '' || null) return;

            // 검증 통과 후 상위 컴포넌트에서 submit 이벤트를 받아 실행한다.
            this.$emit('submit',this.text);

            // 입력상자 초기화
            this.text = "";
        },
    }
}
</script>
<style>
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
    top: 30%;
}

#app-welcome-wrapper .header{
    width: 100%;
    text-align: center;
}

#app-welcome-wrapper form input{
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
