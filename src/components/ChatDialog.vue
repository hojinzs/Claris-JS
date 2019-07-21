<template>
    <div class='dialog-wrapper'>
        <label>{{ message.user.name }}</label>
        <div 
            v-for="msg in message.outputs"
            :key="msg.id">
            <!-- message가 'simpleText'일 경우 보이는 내용 (향후 컴포넌트화)-->
            <div class='dialog-text simpleText'>
                {{ msg.simpleText.text }}
            </div>
            <!-- message가 'simpleText'일 경우 보이는 내용 END-->
        </div>
    </div>
</template>
<script>
export default {
    props: ['message'],
    mounted: function(){
        // 대화 내용이 추가되면 대화 내용으로 포커스 (허무하다...)
        this.focus();
    },
    methods : {
        // 대화 내용 포커스시 이벤트 (향후 스무스 스크롤, 반짝이기 등 애니메이션 추가)
        focus(){
            this.$el.scrollIntoView();
        },
    }
}
</script>
<style>
    .dialog-wrapper {margin:10px; margin-left: 5%; min-width: 260px; max-width: 80%;}
    .dialog-wrapper .dialog-text {background-color: burlywood; padding: 15px; border-radius: 5px; margin-bottom: 5px;}
</style>