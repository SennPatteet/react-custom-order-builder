import React, { Component } from 'react';

function addBurger(props) {
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
}

function removeIng(event, props) {
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
}

function addIng(event) {
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
}
function resetBurger() {
	this.setState(() => ({
		Ingredients: [],
		Prices: [],
		Total: 0
	}));
	document.getElementById('burger').innerHTML = '';
	document.getElementById('price').innerHTML = '';
}
function checkoutButton() {
	if (this.state.Total > 0) {
		alert('Thank you for your order!');
		window.location.reload();
	} else {
		alert('Your basket is empty =(');
	}
}
