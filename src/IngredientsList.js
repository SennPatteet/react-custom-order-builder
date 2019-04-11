import React, { Component } from 'react';
class IngredientsList extends Component {
	render() {
		return this.props.things.map((item, index) => (
			<li key={index} name={item}>
				<button
					data-tag={item}
					data-price={this.props.prices[index]}
					onClick={this.props.removeIng(item)}
				>
					-
				</button>
				<span className="menuItems">
					{item} - € {this.props.prices[index]}
				</span>
				<button
					data-tag={item}
					data-price={this.props.prices[index]}
					onClick={this.props.addIng(item)}
				>
					+
				</button>
			</li>
		));
	}
}
export default IngredientsList;
