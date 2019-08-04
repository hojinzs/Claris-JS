<template>
    <div id="message-input">
        <div class="popup-wrapper">{{ popupMessage }} </div>
        <form v-on:submit.prevent = "submit">
            <input class="cl-input-box"
                v-model='text'
                v-bind:placeholder="placeHolder" 
                :disabled="disabled"
                autocomplete="off"/>
                <div class="button-wrapper">
                    <button v-show='buttonShow' :disabled="disabled">{{ buttonMessage }}</button>
                </div>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        disabled: {type: Boolean, default() {return false;}}, //인풋 비활성화 여부
        defaultText: {type:String, default() {return 'default-text'}}, // 컴포넌트 활성화시, 인풋 기본 입력값
        placeHolder: {type:String, default() {return 'default-placeholder'}}, // 인풋 placeholder
        buttonMessage: {type:String, default() {return'submit'}}, // 버튼 텍스트 지정
        inputFocus: {type: Boolean, default() {return true;}}, // 컴포넌트 활성화시, 인풋 포커스 여부 (구현중)
        popupMessage: {type:String, default() {return'default-popup-message'}}, //인풋 상자 위 안내 메시지 (구현중)
    },
    data: function(){
        return {
            text: this.defaultText,
            buttonShow: false,
        }
    },
    watch: {
        text: function(newText){
            if(this.text!=''){
                this.buttonShow = true
            } else {
                this.buttonShow = false
            }
        }
    },
    methods: {
        submit(){ // 버튼이 눌러졌을때 실행할 액션
            // 빈값이면 그냥 팅긴다
            if(this.text == '' || null) return;

            // 입력값 검증 시행
            try {
                this.validation(this.text)
            } catch (error) {
                console.log('message validation fail',error);
                return;
            }

            // 검증 통과 후 상위 컴포넌트에서 submit 이벤트를 받아 실행한다.
            this.$emit('submit',this.text);

            // 입력상자 초기화
            this.text = "";
        },
        validation(value){ // 검증 메소드
            // 상위 컴포넌트에서 validation 이벤트를 받아 실행한다.
            this.$emit('validation',value); // 상위 컴포넌트에서 이벤트 상속이 없을때 기본 validation 구현 필요 (오또케 하지)
            return true;  // 일단 나중에 구현. 무조건 성공.
        }
    },
};
</script>
<style scoped>
    #message-input {padding: 3px; height: 100%; width: 100%; overflow: hidden; position: relative;}
    #message-input form {line-height: 100%; height: 100%; width: 100%; overflow: hidden; position: relative; z-index: 10;}
    #message-input input {border: 1px grey solid; padding: 10px; left:0px; height: 100%; width: 100%; padding-right: 100px; border-radius: 5px}
    #message-input .button-wrapper {position: absolute; right: 0; top:0; height: 100%; padding: 5px; display: table;}
    #message-input button {text-align: center; height: auto; height: 100%; max-width: 100px; min-width: 80px; background: rgb(130, 224, 255); border: none; margin-right: 5px; margin-left: 5px; border-radius: 5px; display:table-cell;}
    #message-input .popup-wrapper {background-color:darkred; color: white; width: 100%; line-height: 27px; position: absolute; top:-27px; z-index: 99;}
</style>