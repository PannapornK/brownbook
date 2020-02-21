# Little Brown Book Store

## Project setup

### Start Frontend
```
cd brownbook
npm install
npm run serve

```
### Start Backend
```
cd brownbook-back
node start

```
## Class Diagram
![GitHub Logo](/public/images/Diagram.svg)

There are 4 class that refers to Book, Category, Basket, and Discount.
- A book includes One Category. Book is composed of Id, Title, Price, and CategoryId that refers to Category name of book.

- Category is composed of Id and Title.
- A basket includes one or many books. Basket is composed of Id, Books that refers to the list of added book, and Price that refers to the total price of basket. The total price is calculated by calling function.
- Discount includes Id, num that refers to the number of book, Price that refers to percent of discount, and CategoryId.

## Introduction
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This project uses the MVC architectural pattern. The pattern separates an application into 3 main logical components such as the model, the view, and the controller.

![GitHub Logo](/public/images/MVC.svg)

- View is used for all the UI logic of the application.

- Controller act as an interface between Model and View components to process all the business logic using the Model component and interact with the Views to render the final output.
- Model corresponds to all the data-related logic that the user works with.

## Frontend Architecture
![GitHub Logo](/public/images/Frontend.svg)

- In this pattern, the view component includes all the UI components that is composed of HTML and CSS.

- The view component generates event and sends it to Vue JS that is the part of the controllers.
- The frontend controllers include Vue JS and Apollo Client.
- Vue JS makes requests to Apollo Client
- Apollo Client sends API requests to backend and get responses. Then, responses are forwarded directly to Vue JS.
- Vue JS sends responses to view by using callback function.

## Backend Architecture
![GitHub Logo](/public/images/Backend.svg)

- Frontend makes API requests to GraphQL Interface.

- GraphQL Interface forward the API requests to Controller (Express Interface).
- Controller calls service that mentions by API asynchronously.
- In this pattern, Service includes Resolver and Repository. So, service query directly to model (MongoDB).
- Then, model returns the query result to service.
- Service passes an ASYNC or AWAIT function as a callback to controller
- The ASYNC function works like a combination of controllable promise chain and generator function.
- Passing the query result from controller to GraphQL Interface by Resolver.
- Frontend gets responses from GraphQL Interface.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
