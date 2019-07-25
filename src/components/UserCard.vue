<template>
    <div>
        {{user.name}} :: {{ logindate }}
    </div>
</template>
<script>
import moment from 'moment'

export default {
    props:{
        user: {type: Object, default() {return {name : "unknow", logindate : ''}}}, // 컴포넌트 활성화시, 인풋 포커스 여부 (구현중)
    },
    computed: {
        logindate : function(){
            return moment(this.user.logindate).fromNow();
        }
    }
}
</script>
<style>

</style>
