<template>
  <App>
    <div class="text-header">
      Brown's Library
    </div>
    <div v-if="basket && basket.books.length > 0">
      <Basket v-bind:baskets="basket.books" />
    </div>
    <div style="text-align:center;font-size:40px">
      <b-icon
        style="display:inline-block;margin-right:10px;vertical-align:middle"
        icon="search"
      ></b-icon>
      <b-form-input
        debounce="500"
        id="input-large"
        size="lg"
        placeholder="Search keyword ..."
        v-model="word"
      ></b-form-input>
    </div>
    <div v-if="loading">
      <Brown />
    </div>

    <div v-else>
      <b-row>
        <b-col
          class="book-col"
          xs="12"
          sm="4"
          lg="2"
          v-for="book in books"
          v-bind:key="book.id"
          v-on:click="selectBook(book)"
        >
          <b-card
            v-bind:class="{
              'book-card': true,
              active:
                (basket ? basket.books || [] : []).filter(
                  v => v._id === book._id
                ).length > 0
            }"
          >
            <b-img-lazy
              style="border-radius:3px;"
              v-bind:src="book.cover"
              v-bind:alt="book.title"
            ></b-img-lazy>
            <div class="text-title" style="text-align:center;margin-top:8px">
              {{ book.title }}
            </div>
            <div class="text-description" style="text-align:center">
              {{ `${parseInt(book.price).format(0)} THB` }}
            </div>
          </b-card></b-col
        >
      </b-row>
    </div>
  </App>
</template>

<script>
import Basket from "../components/Basket.vue";
import App from "../App.vue";
import Brown from "../../public/images/brown-loading.svg";
import gql from "graphql-tag";
import query from "../queries/index.js";

export default {
  name: "Home",
  data: () => {
    return {
      books: [],
      loading: true,
      basket: undefined,
      word: "",
      baskets: []
    };
  },
  components: {
    Basket,
    App,
    Brown
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    books: {
      query: gql`
        ${query.book.books}
      `,
      fetchPolicy: "cache-and-network",
      result() {
        this.loading = false;
      }
    },
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
      }
    }
  },
  watch: {
    word(word) {
      this.$apollo.queries.books.refetch({
        title: word
      });
    }
  },
  mounted() {},
  methods: {
    selectBook(book) {
      if (this.basket) {
        this.$apollo
          .mutate({
            mutation: gql`
              ${query.basket.updateBasket}
            `,
            variables: {
              data: {
                books:
                  (this.basket.books || []).filter(v => v._id === book._id)
                    .length == 0
                    ? [...this.basket.books, book].map(v => v._id)
                    : (this.basket.books || [])
                        .filter(v => v._id !== book._id)
                        .map(v => v._id)
              },
              id: this.basket._id
            }
          })
          .then(data => {
            this.basket = data.data.updateBasket;
          });
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              ${query.basket.createBasket}
            `,
            variables: {
              data: {
                books: [book._id],
                status: "PENDING"
              }
            }
          })
          .then(data => {
            this.basket = data.data.createBasket;
          });
      }
    }
  }
};
</script>

<style scoped>
.book-col {
  margin: 8px 0;
  padding: 1px;
}
.book-card {
  border: 0;
}
.book-card.active {
  background-color: #eeeeee;
}
.book-card:hover {
  cursor: pointer;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.4);
}
img {
  margin: auto;
  display: block;
  width: 100%;
  object-fit: contain;
}
#input-large {
  display: inline-block;
  margin: 16px auto;
  max-width: 800px;
  border: 0;
  border-bottom: 1px solid #e7e8ec;
  width: 80%;
}
.form-control:focus {
  box-shadow: 0;
  -webkit-box-shadow: 0;
}
.form-control {
  width: 80%;
}
.spinner-border {
  display: block;
  margin: auto;
}
.b-icon.bi {
  vertical-align: 0;
}
svg {
  object-fit: "contain";
  display: block;
  margin: auto;
}
</style>
