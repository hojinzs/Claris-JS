<template>
    <transition>
    <div id="user-card-wrapper">
        <div id="user-card">
            {{ user.name}} :: {{ user.status }}  - {{ logindate }}
        </div>
    </div>
    </transition>
</template>
<script>
import moment from 'moment';
moment.locale('ko');

export default {
    props:{
        user: {type: Object, default() {return {name : "unknow", logindate : ''}}}, // 컴포넌트 활성화시, 인풋 포커스 여부 (구현중)
    },
    data: function(){
        return {
            logindate: moment(this.user.logindate).fromNow()
        }
    },
    methods: {
        dataUpdate(){
            this.logindate = moment(this.user.logindate).fromNow();
        }
    }
}
</script>
<style>
#user-card-wrapper{
    width: 100%;
    height: 40px;
}

#user-card{
    padding: 3px;
    line-height: 20px;
    margin: 3px;
    border-radius: 5px;
    border: 1px gray solid;
}
</style>
