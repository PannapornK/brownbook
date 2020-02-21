<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "./styles/font.css";
$primary: #00b84f;
#app {
  font-family: Volte Regular;
  font-size: 14px;
}
.container {
  padding: 20px;
  margin-top: 80px;
}
a {
  color: $primary;
}
.text-description {
  color: $primary;
  font-size: 18px;
  font-family: Volte Medium;
}
.text-title {
  color: black;
  font-family: Volte SemiBold;
  font-size: 15px;
}
.text-header {
  text-align: center;
  font-family: Volte SemiBold;
  font-size: 44px;
  color: black;
  margin-top: 32px;
}
</style>
