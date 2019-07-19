<template>
    <div :id="elementId" class='dialog-wrapper'>
        <label>{{ who }}</label>
        <div class='dialog-text'>
            {{ text }}
        </div>
    </div>
</template>
<script>
export default {
    props: ['who','text','element-id'],
    mounted: function(){
        // 대화 내용이 추가되면 대화 내용으로 포커스 (허무하다...)
        this.focus();
    },
    methods : {
        // 대화 내용 포커스시 이벤트 (향후 스무스 스크롤, 반짝이기 등 애니메이션 추가)
        focus(){
            this.$el.scrollIntoView();
        }
    }
}
</script>
<style>
    .dialog-wrapper {margin:10px; margin-left: 5%; min-width: 260px; max-width: 80%;}
    .dialog-wrapper .dialog-text {background-color: burlywood; padding: 15px; border-radius: 5px;}
</style>