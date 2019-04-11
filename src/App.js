import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Ingredients: [],
			Prices: [],
			Total: 0,
			Order: []
		};

		const Menu = {
			Bun: {
				'White Bread': 2,
				'Brown Bread': 2.5,
				'Salad wrap': 2
			},
			Patty: {
				'Beef Patty': 4,
				'Chicken Patty': 4,
				'Veggie Patty': 3
			},

			Addons: {
				Cheese: 1,
				Lettuce: 0.5,
				Tomatoes: 0.5,
				Pickles: 0.5,
				Mayo: 0.2,
				ketchup: 0.2
			}
		};

		this.keysBuns = Object.keys(Menu.Bun);
		this.keysPatties = Object.keys(Menu.Patty);
		this.keysAddons = Object.keys(Menu.Addons);
		this.valuesBuns = Object.values(Menu.Bun);
		this.valuesPatties = Object.values(Menu.Patty);
		this.valuesAddons = Object.values(Menu.Addons);
		this.keys = Object.keys(this.state.Order);
	}
	addBurger = () => {
		let order = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
		let orderDetail = [ ...this.state.Order ];
		orderDetail.push({
			orderItems: order,
			orderPrice: sum
		});
		console.log(1, orderDetail);
		this.setState(() => ({
			Ingredients: [],
			Prices: [],
			Order: orderDetail
		}));

		let burgerList = [];
		console.log(orderDetail);
		for (let i = 0; i < orderDetail.length; i++) {
			burgerList += `<li>` + orderDetail[i].orderItems + ' - €' + orderDetail[i].orderPrice + `</li>`;
		}
		document.getElementById('creations').innerHTML = burgerList;
		document.getElementById('totalCost').innerHTML = '€' + this.state.Total;
	};

	removeIng = (event) => {
		let currentList = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		let priceIng = parseFloat(event.target.dataset.price);
		let index = currentList.indexOf(event.target.dataset.tag);
		let priceIndex = currentPrices.indexOf(priceIng);
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
		console.log(2, index, priceIndex);

		this.setState((prevState) => ({
			Ingredients: currentList,
			Prices: currentPrices,
			Total: prevState.Total + priceIng
		}));

		if (index !== -1 && priceIndex !== -1) {
			currentPrices.splice(priceIndex, 1);
			currentList.splice(index, 1);
		}
		document.getElementById('burger').innerHTML = currentList;
		if (currentPrices.length > 0) {
			document.getElementById('price').innerHTML = '€' + sum;
		} else {
			document.getElementById('price').innerHTML = '';
		}

		
	};

	addIng = (event) => {
		let currentList = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		currentList.push(event.target.dataset.tag);
		let priceIng = parseFloat(event.target.dataset.price);
		currentPrices.push(priceIng);
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);

		this.setState((prevState) => ({
			Ingredients: currentList,
			Prices: currentPrices,
			Total: parseInt(prevState.Total) + priceIng
		}));
		document.getElementById('burger').innerHTML = currentList;
		document.getElementById('price').innerHTML = '€' + sum;
	};
	resetBurger = () => {
		this.setState(() => ({
			Ingredients: [],
			Prices: [],
			Total: 0
		}));
		document.getElementById('burger').innerHTML = '';
		document.getElementById('price').innerHTML = '';
	};
	render() {
		return (
			<div className="App">
				<div className="menu">
					<div className="options">
						<h2>Build A Burger</h2>
						<h5>Buns</h5>
						<ul>
							<IngredientsList
								things={this.keysBuns}
								prices={this.valuesBuns}
								addIng={() => this.addIng}
								removeIng={() => this.removeIng}
							/>
							<br />
						</ul>
						<h5>Patties</h5>
						<ul>
							<IngredientsList
								things={this.keysPatties}
								prices={this.valuesPatties}
								addIng={() => this.addIng}
								removeIng={() => this.removeIng}
							/>
							<br />
						</ul>
						<h5>Addons</h5>
						<ul>
							<IngredientsList
								things={this.keysAddons}
								prices={this.valuesAddons}
								addIng={() => this.addIng}
								removeIng={() => this.removeIng}
							/>
							<br />
						</ul>
					</div>

					<div className="controls">
						<h2>your chosen ingredients:</h2> <span id="burger" /> <span id="price" />
						<br />
						<div className="btn-group" role="group">
							<button className="btn btn-secondary" onClick={() => this.addBurger()}>
								add burger to order
							</button>
							<button className="btn btn-secondary" onClick={() => this.resetBurger()}>
								reset burger
							</button>
						</div>
					</div>
				</div>
				<div className="orderList">
					<h2>Your order</h2>
					<ol id="creations" />
					<h5>
						Total costs:
						<span id="totalCost">€ ---</span>
					</h5>

<<<<<<< HEAD
				<h2>Side Dish</h2>
				<ul>
					<li>
						<button>-</button>Fries<button>+</button>
					</li>
					<li>
						<button>-</button>Salad<button>+</button>
					</li>
					<li>
						<button>-</button>Onion Rings<button>+</button>
					</li>
				</ul>

          <h3>Total price: {this.state.total}</h3>
=======
					<button className="btn btn-success" onClick={() => alert('Thank you for your order!')}>
						Checkout
					</button>
				</div>
>>>>>>> Carolien
			</div>
		);
	}
}


export default App;
