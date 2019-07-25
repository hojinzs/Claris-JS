<template>
    <transition name="pade-opacity">
    <div 
        v-show="show"
        id="app-right-slider-backdrop"
        v-on:click.self="Hide()">
        <transition name="right-slide">
        <div id="app-right-slider"
            v-show="show">
            <div id="app-right-slider-wrapper">
                <div>
                    <slot name="header">Untitled</slot>
                    <button v-on:click.self="Hide()">X</button>
                </div>
                <hr>
                <div>
                    <slot name="contents"></slot>
                </div>
            </div>
        </div>
        </transition>
    </div>
    </transition>
</template>
<script>
export default {
    props: ['show'],
    methods: {
        Hide: function(){
            this.$emit('siderToggle')
        },
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

.right-slide-enter-active{
    animation: right-slide-in .5s;
}
.right-slide-leave-active {
    animation: right-slide-in .5s reverse;
}
@keyframes right-slide-in {
    0% {
        right: -500px;
    }
    50% {
        right: -350px;
    }
    80% {
        right: -50px;
    }
    100%{
        right: 0px;
    }
}

</style>
