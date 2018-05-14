<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<style lang="less">
[v-cloak]{
  display: 'none';
}
html {
  min-width: 1200px;
}
html,body,#app{
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0px;
}
#app {
  background: #F8F8F9;
}
#app .menu-disabled {
  /* cursor: not-allowed!important; */
  opacity: 0.6;
}
/* 旋转动画 */
.loading-load-c {
  animation: rotating 1s linear infinite;
}

@keyframes rotating
{
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
