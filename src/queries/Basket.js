export default {
  baskets: `query basket($query: BasketInput) {
    baskets(query: $query) {
      _id
      price
      books {
        price
        title
        cover
        _id
      }
    }
  }`,
  basket: `query ($id: ID!) {
    basket(_id:$id) {
      _id
      price
      books {
        price
        title
        cover
        _id
      }
    }
  }`,
  updateBasket: `mutation($data: BasketInput, $id: ID!) {
    updateBasket(_id: $id, data: $data) {
      _id
      price
      status
      books {
        price
        title
        cover
        _id
      }
    }
  }`,
  createBasket: `mutation($data: BasketInput) {
    createBasket(data: $data) {
      _id
      price
      status
      books {
        price
        title
        cover
        _id
      }
    }
  }`,
  summary: `query ($id: ID!) {
    summary(_id:$id)
  }`
};
