<template>
    <transition>
    <div id="user-card-wrapper">
        <div id="user-card"
        v-bind:class="connection_class"
        >
            {{ user.name}} :: <span class="status"> {{ connection }} </span> - {{ logindate }}
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
    computed: {
        connection(){
            if(this.user.connect == 1){
                return 'CONNECT'
            };
            return 'DISCONNECT'
        },
        connection_class(){
            if(this.user.connect == 1){
                return 'connect'
            };
            return 'disconnect'
        },
        logindate(){
            return moment(this.user.logindate).fromNow();
        },
    },
    methods: {
        dataUpdate(){
            this.logindate = moment(this.user.logindate).fromNow();
        }
    }
}
</script>
<style scoped>
#user-card-wrapper{
    width: 100%;
    height: 40px;
}

#user-card{
    padding: 3px;
    line-height: 20px;
    margin: 3px;
    border-radius: 5px;
}

#user-card.connect{
    border: 1px gray solid;
    color: black;
}

#user-card.connect span.status{
    color: #39e600;
}

#user-card.disconnect{
    border: 1px #e6e6e6 solid;
    color: #cccccc;
}

</style>
