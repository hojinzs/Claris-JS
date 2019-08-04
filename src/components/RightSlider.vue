<template>
    <transition name="pade-opacity">
    <div id="app-right-slider-backdrop" 
    v-show="show"
    v-on:click.self="Hide()">

        <transition name="right-slide">
        <div id="app-right-slider-wrapper"
        v-show="show">

            <div id="app-right-slider">
                <div id="header">
                    <div id="header-contents">
                        <slot name="header">Untitled</slot>
                    </div>
                    <div id="hider">
                        <button class="cl_button" v-on:click.self="Hide()">X</button>
                    </div>
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
<style scoped>
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
#app-right-slider-wrapper{
    position: absolute;
    max-width: 80%;
    width: 320px;
    height: 100%;
    width: 100%;
    right: 0px;
    padding: 10px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: aliceblue;
}

#app-right-slider{
    position: relative;
    width: 100%;
    height: 100%;
}

#app-right-slider #header{
    height: 28px;
    font-size: 20px;
    line-height: 20px;
}

#app-right-slider #header #header-contents{
    float: left;
}

#app-right-slider #header #hider{
    float: right;
}

#app-right-slider #header #button{
    float: right;
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
    100%{
        right: 0px;
    }
}

</style>
