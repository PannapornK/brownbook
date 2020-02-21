<template>
  <App>
    <div class="text-header">
      Completed
    </div>
    <BrownMoney />
    <div class="text-title" style="font-size:20px;text-align:center;">
      Total Amount
    </div>
    <div class="text-description" style="font-size:48px;text-align:center;">
      ฿ {{ this.total }}
    </div>

    <div style="text-align:center;margin-top:32px">
      <b-button
        variant="success"
        style="font-family:Volte Medium;font-size:24px;width:50%;height:60px;line-height:60px;padding:0;"
        href="/"
      >
        Back to Library
      </b-button>
    </div>
  </App>
</template>

<script>
import App from "../App.vue";
import BrownMoney from "../../public/images/brown-money.svg";
import gql from "graphql-tag";
import query from "../queries/index.js";
export default {
  name: "Complete",
  data: () => {
    return {
      total: 0
    };
  },
  components: {
    App,
    BrownMoney
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    baskets: {
      query: gql`
        ${query.basket.basket}
      `,
      variables() {
        // Use vue reactive properties here
        return {
          id: this.$route.query.id
        };
      },
      fetchPolicy: "cache-and-network",
      result(data) {
        this.basket =
          data && data.data && data.data.basket
            ? data.data.basket
            : null;
        this.total = this.basket ? this.basket.price : null;

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    }
  }
};
</script>

<style>
svg {
  object-fit: "contain";
  display: block;
  margin: auto;
}
</style>
