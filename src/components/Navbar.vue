<template>
  <b-navbar toggleable="sm" type="white" variant="white">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
    <b-navbar-brand
      ><a href="/"><img
        src="../../public/images/logo-main.png"
        style="width:45px;object-fit:contain;margin-right:10px"
      /></a>Book Store</b-navbar-brand
    >
    <b-collapse id="nav-text-collapse" is-nav> </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar"
};
</script>
<style scoped>
.navbar {
  padding: 20px;
  border-bottom: 2px solid #e7e8ec;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
}
.navbar-brand {
  color: black;
  font-family: Volte SemiBold;
  font-size: 26px;
  padding-left: 60px;
}
svg {
}
</style>
