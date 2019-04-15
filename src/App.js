import React, { Component } from 'react';
import IngredientsList from './components/IngredientsList';
// this generates the ingredients found in the menu, along with the +/- buttons
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
				Onions: 0.5,
				Tomatoes: 0.5,
				Pickles: 0.5,
				Mayo: 0.5,
				ketchup: 0.5
			}
		};
		//use keys and values found in menu array to generate the list of possible ingredients for your burger
		this.keysBuns = Object.keys(Menu.Bun);
		this.keysPatties = Object.keys(Menu.Patty);
		this.keysAddons = Object.keys(Menu.Addons);
		this.valuesBuns = Object.values(Menu.Bun);
		this.valuesPatties = Object.values(Menu.Patty);
		this.valuesAddons = Object.values(Menu.Addons);
		this.keys = Object.keys(this.state.Order);
	}
	addBurger = () => {
		//add your finished burger to the order list
		let order = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		let orderDetail = [ ...this.state.Order ];

		if (currentPrices.length > 0) {
			//make sure there is an actual burger to be added
			let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
			this.setState((prevState) => ({
				Ingredients: [],
				Prices: [],
				Total: parseFloat(prevState.Total) + sum,
				Order: orderDetail
			}));
			//push it to the list of orders
			orderDetail.push({
				orderItems: order,
				orderPrice: sum
			});
			//print it in the checkout in a list with the total price for the burger
			let burgerList = [];
			for (let i = 0; i < orderDetail.length; i++) {
				burgerList += `<li>` + orderDetail[i].orderItems + ' - €' + orderDetail[i].orderPrice + `</li>`;

				document.getElementById('creations').innerHTML = burgerList;
				document.getElementById('totalCost').innerHTML = '€' + (this.state.Total + sum);
				//clear the 'creations' list, make room for a new burger
				document.getElementById('burger').innerHTML = '';
				document.getElementById('price').innerHTML = '';
			}
		} else {
			//har har I'm so funny (happens if 'creations' is empty, meaning there is no burger created)
			alert('Do you want a burger made out of air? =/');
		}
	};

	removeIng = (event) => {
		//remove the chosen ingredient and subtract the price form the total
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
				Prices: currentPrices
			}));
		}
		//print the changes, if the removal results in no more ingredients-> clear the list
		document.getElementById('burger').innerHTML = currentList;
		if (currentPrices.length > 0) {
			let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
			document.getElementById('price').innerHTML = '€' + sum;
		} else {
			document.getElementById('price').innerHTML = '';
		}
	};
	addIng = (event) => {
		//add chosen ingredients to the creation list for an overview of the burger being created.
		let currentList = [ ...this.state.Ingredients ];
		let currentPrices = [ ...this.state.Prices ];
		currentList.push(event.target.dataset.tag);
		let priceIng = parseFloat(event.target.dataset.price);
		currentPrices.push(priceIng);
		//add to state
		this.setState((prevState) => ({
			Ingredients: currentList,
			Prices: currentPrices
		}));
		//print it in the list
		let sum = currentPrices.reduce((partial_sum, a) => partial_sum + a);
		document.getElementById('burger').innerHTML = currentList;
		document.getElementById('price').innerHTML = '€' + sum;
	};
	resetBurger = () => {
		//reset your creation, start over
		this.setState(() => ({
			Ingredients: [],
			Prices: []
		}));
		document.getElementById('burger').innerHTML = '';
		document.getElementById('price').innerHTML = '';
	};
	checkoutButton = () => {
		// when the customer is done creating his/her dream burgers, they can checkout and give us their money!
		console.log(2, this.state.Order);
		if (this.state.Order.length > 0) {
			alert('Thank you for your order!');
			window.location.reload();
		} else {
			//notify that basket is empty
			alert('Your basket is empty =(');
		}
	};
	render() {
		return (
			<div>
				<h2>
					<i className="fas fa-hamburger" />Build A Burger<i className="fas fa-hamburger" />
				</h2>
				<div className="App">
					<div className="menu">
						<div className="options">
							<h5>Buns</h5>
							<ul>
								<IngredientsList
									//give the values for each ingredient (name, price)
									things={this.keysBuns}
									prices={this.valuesBuns}
									// the functions to remove and add the ingredients
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
							<h3>your chosen ingredients:</h3> <span id="burger" /> <span id="price" />
							<br />
							<div>
								<button onClick={() => this.addBurger()}>add burger to order</button>
								<button onClick={() => this.resetBurger()}>reset burger</button>
							</div>
						</div>
					</div>
				</div>
				<div className="orderList">
					<h3>Your order</h3>
					<ol id="creations" />
					<h5>
						Total costs:
						<span id="totalCost"> € ---</span>
					</h5>
					<textarea className="form-control" placeholder="Anything you would like to add?" />
					<br />
					<button className="btn btn-success" onClick={() => this.checkoutButton()}>
						Checkout
					</button>
				</div>
			</div>
		);
	}
}

export default App;
