<template>
  <div id="app">
    <Navbar />
    <b-row>
      <b-col xs="0" lg="2"></b-col>
      <b-col xs="12" lg="8"></b-col>
      <b-col xs="0" lg="2"></b-col>
      <div class="container">
        <slot></slot>
      </div>
    </b-row>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: { Navbar }
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
  color: #00b84f;
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
