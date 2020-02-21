export default {
  books: `query ($query:BookInput,$title:String)  {
    books(query:$query,title:$title) {
      _id
      title
      cover
      price
    }
  }`
};
