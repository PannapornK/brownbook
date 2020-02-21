<template>
  <b-card class="container">
    <b-icon icon="wallet" style="width:40px;height:40px" />
    <b-badge variant="primary">{{ baskets.length }}</b-badge>
    <div>
      {{
        `THB ${(baskets || [])
          .map(v => parseInt(v.price))
          .reduce((a, b) => a + b, 0)
          .format(0)}`
      }}
    </div>
    <router-link to="/bill">CHECK OUT</router-link>
  </b-card>
</template>
<script>
export default {
  name: "Basket",
  props: {
    baskets: Array
  },
  methods: {
    redirect() {
      this.$router.push("bill");
    }
  }
};
</script>
<style scoped>
.container {
  display: block;
  position: fixed;
  width: 100px;
  height: 140px;
  z-index: 1;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 0;
  text-align: center;
}
.card {
  padding: 0;
}
a {
  font-size: 11px;
  font-family: Volte Bold;
}
a:hover {
  cursor: pointer;
}
.badge {
  position: absolute;
  padding: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  right: 40px;
  top: 15px;
}
</style>
