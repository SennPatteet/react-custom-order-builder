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
		let orderDetail = [ ...this.state.Order ];
		if (currentPrices.length > 0) {
			let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);

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
			document.getElementById('burger').innerHTML = '';
			document.getElementById('price').innerHTML = '';
		} else {
			alert('Do you want a burger made out of air? =/');
		}
	};

	removeIng = (event) => {
		let currentList = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		let priceIng = parseFloat(event.target.dataset.price);
		let index = currentList.indexOf(event.target.dataset.tag);
		let priceIndex = currentPrices.indexOf(priceIng);

		if (index !== -1 && priceIndex !== -1) {
			currentPrices.splice(priceIndex, 1);
			currentList.splice(index, 1);
			this.setState((prevState) => ({
				Ingredients: currentList,
				Prices: currentPrices,
				Total: parseFloat(prevState.Total) - priceIng
			}));
		}
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);

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

		this.setState((prevState) => ({
			Ingredients: currentList,
			Prices: currentPrices,
			Total: parseFloat(prevState.Total) + priceIng
		}));
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
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
	checkoutButton = () => {
		if (this.state.Total > 0) {
			alert('Thank you for your order!');
			window.location.reload();
		} else {
			alert('Your basket is empty =(');
		}
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
						<button onClick={() => console.log(this.state)}> log </button>
					</div>
				</div>
				<div className="orderList">
					<h2>Your order</h2>
					<ol id="creations" />
					<h5>
						Total costs:
						<span id="totalCost">€ ---</span>
					</h5>

					<button className="btn btn-success" onClick={() => this.checkoutButton()}>
						Checkout
					</button>
				</div>
			</div>
		);
	}
}

export default App;
