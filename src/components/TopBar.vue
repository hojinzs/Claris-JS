<template>
    <div id="top-bar">
        <div class="cr-left cr-box">
            <slot name="left"></slot>
        </div>
        <div class="cr-right cr-box">
            <slot name="right"></slot>
        </div>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
<style scoped>
#top-bar {
  background-color: white;
  top: 0;
  width: 100%;
  height: 100%;
  border-bottom: black 1px solid;
}

#top-bar .cr-box{
    display: table;
}

#top-bar .cr-box div{
    display: table-cell;
    vertical-align: middle;
}

#top-bar .cr-left{
    padding-left: 10px;
    float: left;
    height: 100%;
}

#top-bar .cr-right{
    padding-right: 10px;
    float: right;
    height: 100%;
}
</style>