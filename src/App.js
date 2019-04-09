import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    }
  }


  addIng(e) {

    let priceIng = parseFloat(e.target.getAttribute('price'));

    this.setState(
      (prevState)=>({
        total: prevState.total + priceIng,
      })
    );

  }
  render() {


    return (
      <div className="App">
        <h1>Build A Burger</h1>

        {/* -------------------------------------------------------------------------- BREAD */}
        <h2>Bread</h2>
        <ul>
          <li><button>-</button>White Bread<button
          name="White Bread"
          price={0.50}
          amount = {1}
          onClick={this.addIng.bind(this)}>+</button></li>

          <li><button>-</button>Brown Bread<button
          name="Brown Bread"
          price={2.00}
          amount = {1}
          onClick={this.addIng.bind(this)}>+</button></li>
        </ul>

        {/* -------------------------------------------------------------------------- PATTY */}
        <h2>Patty</h2>
        <ul>
        <li><button>-</button>Beef<button
          name="Beef"
          price={1.00}
          amount = {1}
          onClick={this.addIng.bind(this)}>+</button></li>

          <li><button>-</button>Chicken<button>+</button></li>
          <li><button>-</button>Veggie<button>+</button></li>
        </ul>

        {/* -------------------------------------------------------------------------- TOPPINGS */}
        <h2>Toppings</h2>
        <ul>
          <li><button>-</button>Bacon<button>+</button></li>
          <li><button>-</button>Cheese<button>+</button></li>
          <li><button>-</button>Pickles<button>+</button></li>
        </ul>

        {/* -------------------------------------------------------------------------- SAUCES */}
        <h2>Sauces</h2>
        <ul>
          <li><button>-</button>BBQ<button>+</button></li>
          <li><button>-</button>Mayo<button>+</button></li>
          <li><button>-</button>Ketchup<button>+</button></li>
        </ul>

        {/* -------------------------------------------------------------------------- SIDE DISH */}
        <h2>Side Dish</h2>
        <ul>
          <li><button>-</button>Fries<button>+</button></li>
          <li><button>-</button>Salad<button>+</button></li>
          <li><button>-</button>Onion Rings<button>+</button></li>
        </ul>



        <h3>Total Price: {this.state.total}</h3>
      </div>
    );
  }
}


export default App;
