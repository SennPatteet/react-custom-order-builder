import React, { Component } from 'react';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: [
				{
					name: [],
					amount: 0
				}
			],
			total: 0
		};
	}

	addIng(e) {
		let priceIng = parseFloat(e.target.getAttribute('price'));
		let amountIng = parseInt(e.target.getAttribute('amount'));
		let nameIng = e.target.getAttribute('name');

		let currentList = this.state.ingredients;

		if (!currentList.filter((e) => e.name === nameIng).length > 0) {
			currentList.push({ name: nameIng, amount: amountIng });
		} else {
			for (let i = 0; i < currentList.length; i++) {
				console.log(11);
				if (currentList[i].name === nameIng) {
					currentList[i].amount++;
				}
			}
		}

		this.setState((prevState) => ({
			ingredients: currentList,
			total: prevState.total + priceIng
		}));

		console.log(this.state.ingredients);
	}
	render() {
		return (
			<div className="App">
				<h1>Build A Burger</h1>

				<h2>Bread</h2>
				<ul>
					<li>
						<button>-</button>White Bread<button
							name="White Bread"
							price={2.0}
							amount={1}
							onClick={this.addIng.bind(this)}
						>
							+
						</button>
					</li>

					<li>
						<button>-</button>Brown Bread<button
							name="Brown Bread"
							price={2.0}
							amount={1}
							onClick={this.addIng.bind(this)}
						>
							+
						</button>
					</li>
					<li>
						<button>-</button>Lettuce<button
							name="Lettuce"
							price={1.0}
							amount={1}
							onClick={this.addIng.bind(this)}
						>
							+
						</button>
					</li>
				</ul>

				<h2>Patty</h2>
				<ul>
					<li>
						<button>-</button>Beef<button>+</button>
					</li>
					<li>
						<button>-</button>Chicken<button>+</button>
					</li>
					<li>
						<button>-</button>Veggie<button>+</button>
					</li>
				</ul>

				<h2>Toppings</h2>
				<ul>
					<li>
						<button>-</button>Bacon<button>+</button>
					</li>
					<li>
						<button>-</button>Cheese<button>+</button>
					</li>
					<li>
						<button>-</button>Pickles<button>+</button>
					</li>
				</ul>

				<h2>Sauces</h2>
				<ul>
					<li>
						<button>-</button>BBQ<button>+</button>
					</li>
					<li>
						<button>-</button>Mayo<button>+</button>
					</li>
					<li>
						<button>-</button>Ketchup<button>+</button>
					</li>
				</ul>

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
			</div>
		);
	}
}


export default App;
