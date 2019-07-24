<template>
  <div id="top-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
    methods: {}
};
</script>
<style>
#top-bar {
  background-color: white;
  top: 0;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  display: table;
  border-bottom: black 1px solid;
}
#top-bar div {
  display: table-cell;
  vertical-align: middle;
  padding-right: 15px;
  padding-left: 15px;
}
</style>