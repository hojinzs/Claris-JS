<template>
    <div id="app-right-slider-backdrop"
        v-on:click.self="hideThis">
        <div id="app-right-slider">
            <div id="app-right-slider-wrapper">
                <div>
                    <slot name="header">Untitled</slot>
                    <button v-on:click.self="hideThis">X</button>
                </div>
                <hr>
                <div>
                    <slot name="contents"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        hideThis : function(){
            this.$emit('toggle',false);
        }
    }
};
</script>
<style>
#app-right-slider-backdrop{
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    width : 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
}
    #app-right-slider{
        position: absolute;
        max-width: 80%;
        width: 320px;
        height: 100%;
        right: 0px;
        background-color: aliceblue;
    }
        #app-right-slider-wrapper{
            position: relative;
            width: 100%;
            height: 100%;
        }

    .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
