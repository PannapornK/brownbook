<template>
  <App>
    <div class="text-header">
      Checkout
    </div>
    <div v-if="loading">
      <Brown />
    </div>
    <div v-else>
      <b-row>
        <b-col sm="12" lg="6">
          <div class="text-title" style="margin-top:32px;margin-bottom:4px;">
            ORDER
          </div>
          <b-card style="height:450px;overflow:auto;">
            <div v-for="(book, index) in basket.books" :key="book._id">
              <b-row style="margin:8px;border-bottom: 1px solid #e7e8ec;">
                <b-col sm="12" md="3" lg="3">
                  <b-img-lazy
                    style="width:100%;border:2px solid #e7e8ec;object-fit:contain;margin-bottom:8px;"
                    v-bind:src="book.cover"
                    v-bind:alt="book.title"
                  ></b-img-lazy>
                </b-col>
                <b-col sm="6" md="7" lg="7">
                  <div class="text-title" style="margin-top:8px">
                    {{ book.title }}
                  </div>
                  <div>
                    <b-form-input
                      v-model="form.numBooks[index]"
                      type="number"
                      style="width:100%;margin-top:8px;margin-bottom:8px"
                      inline
                      center
                      controls
                    ></b-form-input>
                  </div>
                  <div>{{ form.numBooks[index] }}</div>
                </b-col>
                <b-col sm="6" md="2" lg="2">
                  <div
                    class="text-description"
                    style="text-align:right;margin-top:8px"
                  >
                    {{ book.price.format(0) }}
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card>
          <b-button
            variant="success"
            style="font-family:Volte Regular;font-size:18px;margin-top:8px;"
            @click="onClick()"
          >
            PROCEED
          </b-button>
        </b-col>
        <b-col sm="12" lg="6">
          <div class="text-title" style="margin-top:32px;margin-bottom:4px;">
            PAYMENT
          </div>
          <b-card style="height:500px;overflow:auto;padding:16px;">
            <b-row style="margin-top:16px;">
              <b-col sm="4">
                <div>
                  Subtotal
                </div>
              </b-col>
              <b-col sm="8">
                <div class="text-description" style="text-align:right">
                  {{
                    basket
                      ? (basket.books || [])
                          .map(v => v.price)
                          .reduce((a, b) => a + b, 0)
                      : null
                  }}
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top:16px;">
              <b-col sm="4">
                <div>
                  Discount
                </div>
              </b-col>
              <b-col sm="8">
                <div class="text-description" style="text-align:right">
                  0
                </div>
              </b-col>
            </b-row>
            <b-row style="margin-top:16px;margin-bottom:16px;">
              <b-col sm="4">
                <div>
                  Net
                </div>
              </b-col>
              <b-col sm="8">
                <div class="text-description" style="text-align:right">
                  {{
                    basket
                      ? (basket.books || [])
                          .map(v => v.price)
                          .reduce((a, b) => a + b, 0)
                      : null
                  }}
                </div>
              </b-col>
            </b-row>

            <div
              class="text-title"
              style="padding-top:32px;border-top:1px solid #e7e8ec;"
            >
              ORDER TOTAL
            </div>
            <div
              class="text-description"
              style="font-size:48px;border-bottom:1px solid #e7e8ec;"
            >
              {{
                `฿ ${
                  basket
                    ? (basket.books || [])
                        .map(v => v.price)
                        .reduce((a, b) => a + b, 0)
                    : null
                }`
              }}
            </div>
            <div class="text-title" style="text-align:left;margin-top:32px;">
              CASH
            </div>
            <div style="display:block;text-align:center;margin-top:8px;">
              <b-form-input
                id="input-large"
                size="lg"
                type="number"
                placeholder="Amount ..."
              ></b-form-input>
            </div>
            <div style="text-align:center;margin-top:16px;margin-bottom:16px;">
              <b-button
                variant="success"
                style="font-family:Volte Regular;font-size:18px"
                href="/complete"
                >PAY</b-button
              >
            </div>
            <div>{{ sum }}</div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </App>
</template>

<script>
import App from "../App.vue";
import gql from "graphql-tag";
import query from "../queries/index.js";
import Brown from "../../public/images/brown-loading.svg";
export default {
  name: "Bill",
  data: () => {
    return {
      baskets: [],
      basket: {},
      loading: true,
      sum: 0,
      form: { numBooks: [] }
    };
  },

  methods: {
    onClick() {
      var ibook;
      var bookName;
      for (ibook = 0; ibook < this.basket.books.length; ibook++) {
        this.sum = parseInt(this.sum) + parseInt(this.form.numBooks[ibook]);
      }
    }
  },
  components: {
    App,
    Brown
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    baskets: {
      query: gql`
        ${query.basket.baskets}
      `,
      variables() {
        // Use vue reactive properties here
        return {
          query: { status: "PENDING" }
        };
      },
      fetchPolicy: "cache-and-network",
      result(data) {
        this.basket = data && data.data && data.data.baskets[0];
        this.form.numBooks = Array(this.basket.books.length).fill(1);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    }
  }
};
</script>

<style>
.btn-success {
  width: 100%;
  margin: 1px;
}
#input-large {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.card-body {
  padding: 0px;
}
</style>
