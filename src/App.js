import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'burger',
      total: 0,
      amount: 0,
    }
  }


  addIng(e) {

    let priceIng = parseInt(e.target.getAttribute('price'));
    let amountIng = parseInt(e.target.getAttribute('amount'));
    let nameIng = e.target.getAttribute('name');

    this.setState(
      (prevState)=>({
        name: nameIng,
        total: prevState.total + priceIng,
        amount: prevState.amount + amountIng
      })
    );

    const order = [];

    order.push(nameIng, priceIng)
    console.log(order);
    console.log(this.state);
  }
  render() {

    return (
      <div className="App">
        <h1>Build A Burger</h1>

        <h2>Bread</h2>
        <ul>
          <li><button>-</button>White Bread<button
          name="White Bread"
          price={2.00}
          amount = {1}
          onClick={this.addIng.bind(this)}>+</button></li>
          
          <li><button>-</button>Brown Bread<button>+</button></li>
          <li><button>-</button>Lettuce<button>+</button></li>
        </ul>

        <h2>Patty</h2>
        <ul>
          <li><button>-</button>Beef<button>+</button></li>
          <li><button>-</button>Chicken<button>+</button></li>
          <li><button>-</button>Veggie<button>+</button></li>
        </ul>

        <h2>Toppings</h2>
        <ul>
          <li><button>-</button>Bacon<button>+</button></li>
          <li><button>-</button>Cheese<button>+</button></li>
          <li><button>-</button>Pickles<button>+</button></li>
        </ul>

        <h2>Sauces</h2>
        <ul>
          <li><button>-</button>BBQ<button>+</button></li>
          <li><button>-</button>Mayo<button>+</button></li>
          <li><button>-</button>Ketchup<button>+</button></li>
        </ul>

        <h2>Side Dish</h2>
        <ul>
          <li><button>-</button>Fries<button>+</button></li>
          <li><button>-</button>Salad<button>+</button></li>
          <li><button>-</button>Onion Rings<button>+</button></li>
        </ul>

      </div>
    );
  }
}

export default App;
