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
          <b-card style="height:500px;overflow:auto;">
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
                      @click="onClick"
                      v-model="form.numBooks[index]"
                      type="number"
                      style="width:100%;margin-top:8px;margin-bottom:8px"
                      min="1"
                      inline
                      center
                      controls
                    ></b-form-input>
                  </div>
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
                  {{ this.sum }}
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
                  {{ this.discount }}
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
                  {{ this.net }}
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
              ฿ {{ this.net }}
            </div>
            <div class="text-title" style="text-align:left;margin-top:32px;">
              CASH
            </div>
            <div v-if="change < 0" style="color:red;">{{ "Not enough !" }}</div>
            <div style="display:block;text-align:center;margin-top:8px;">
              <b-form-input
                @click="onClick()"
                id="input-large"
                v-model="pay"
                size="lg"
                type="number"
                placeholder="Amount ..."
              ></b-form-input>
            </div>
            <div v-if="parseInt(pay) - parseInt(this.net)>0" style="margin-top:16px;color:red;"
              >
              Change : ฿ {{parseInt(pay) - parseInt(this.net)}}
            </div>
            <div style="text-align:center;margin-top:16px;margin-bottom:16px;">
              <b-button
                variant="success"
                style="font-family:Volte Regular;font-size:18px"
                @click="onClickPay()"
                >PAY</b-button
              >
            </div>
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
      form: { numBooks: [] },
      discount: 0,
      pay: 0,
      change: 0,
      net: 0
    };
  },

  methods: {
    calSum() {
      this.sum = 0;
      var ibook;
      for (ibook = 0; ibook < this.basket.books.length; ibook++) {
        this.sum =
          parseInt(this.sum) +
          parseInt(this.form.numBooks[ibook] * this.basket.books[ibook].price);
      }
      this.net = parseInt(this.sum) - parseInt(this.discount)
    },
    onClick() {
      this.calSum()
      this.$apollo
        .query({
          query: gql`
            ${query.basket.summary}
          `,
          variables: {
            id: this.basket._id
          }
        })
        .then(data => {
          this.discount = data.data.summary;
        });
    },
    onClickPay() {
      this.change =
        parseInt(this.pay) - parseInt(this.net);
      if (this.change >= 0) {
        this.$apollo
          .mutate({
            mutation: gql`
              ${query.basket.updateBasket}
            `,
            variables: {
              data: {
                price: this.net,
                status: "DONE"
              },
              id: this.basket._id
            }
          }).then(this.$router.push({path: `/complete?id=${this.basket._id}`}))
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
        this.basket =
          data && data.data && data.data.baskets && data.data.baskets.length > 0
            ? data.data.baskets[0]
            : null;
        this.form.numBooks = this.basket ? Array(this.basket.books.length).fill(1) : null;
        if(this.basket){
          this.$apollo
            .query({
              query: gql`
                ${query.basket.summary}
              `,
              variables: {
                id: this.basket._id
              }
            })
            .then(data => {
              this.discount = data.data.summary;
              this.calSum();
            });
        }
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
