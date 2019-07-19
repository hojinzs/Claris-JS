<template>
<div id="top-bar">
    <div id='counter'>
        Live :: <span>{{ counter }}</span>명
    </div>
</div>
</template>
<script>
export default {
    template: '#live-users-template',
    props: ['counter'],
}
</script>
<style>
    #top-bar {background-color: white; top:0; width: 100%; height: 100%; vertical-align: middle; display: table; border-bottom: black 1px solid; }
    #top-bar #counter {display: table-cell; vertical-align: middle; padding-right: 15px; padding-left: 15px;}
</style>