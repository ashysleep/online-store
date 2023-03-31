// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

// const { transform } = require("terser-webpack-plugin/types/minify");


// ===================================== INPUT ==============================

let input = document.querySelector('.input');
let search = document.getElementById('search');
let clear = document.querySelector('.clear');


search.addEventListener('click', function() {
	input.classList.toggle("input_active");
	if (input.classList.contains("input_active")) {
		clear.style.display = "block";
	}	else {
		clear.style.display = "none";
	}
})


clear.addEventListener('click', function() {
	input.value = ""
});


// ===================================== SLIDER =============================

let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.slider__button');
let slideIndex = 0;

function activeSlide(n) {
	for (let slide of slides) {
		slide.classList.remove('active');
	}

	slides[n].classList.add('active');
}

function activeDot(n) {
	for (let dot of dots) {
		dot.classList.remove('active');
	}

	dots[n].classList.add('active');
}

function currentSlide(index) {
	activeSlide(index);
	activeDot(index);
}


function nextSlide() {
	if (slideIndex == slides.length - 1) {
		slideIndex = 0;
		currentSlide(slideIndex) 
	}	else {
		slideIndex++;
		currentSlide(slideIndex) 
	}
}

let interval;

dots.forEach((item, indexDot) => {
	item.addEventListener('click', function() {
		slideIndex = indexDot;
		currentSlide(slideIndex);
		clearInterval(interval);
      interval = setInterval(nextSlide, 3000);
	})
})

interval = setInterval(nextSlide, 3000);


// ================================= SHOP ============================================
let newItems = [];
let saleItems = [];
let bestItems = [];
let allItems = [];

window.addEventListener('load', getCard(newItems, saleItems, bestItems, allItems))

let links = document.querySelectorAll('.shop__item');

let activeLinkLink;

for (let link of links) {
	link.addEventListener('click', function() {
		let activeLink = document.querySelector('.item-active');
		if (activeLink) {
			activeLink.classList.remove('item-active');
		}
		link.classList.add('item-active');
		let block = document.querySelector('.shop__block');
		block.innerHTML = '';
		switch (link.innerText) {
			case 'New Product':
				addItemsToWindow(newItems, block)
				break;
			case 'Best Saler':
				addItemsToWindow(bestItems, block)
				break;
			case 'Sale Product':
				addItemsToWindow(saleItems, block)
				break;
			default:
				addItemsToWindow(allItems, block)
				break;
		}
	})
}

function addItemsToWindow(items, block) {
	items.forEach((item) => {
		block.insertAdjacentHTML('beforeend', item);
	})
}

// ==============================


function getCard(newItems, saleItems, bestItems, allItems) {
	let block = document.querySelector('.shop__block');
	let bold = '<i class="fa-solid fa-bolt" style="color: #000000;"></i>'
	let hotjar = '<i class="fa-brands fa-hotjar" style="color: #000000;"></i>'
	let regular = '<i class="fa-regular fa-star" style="color: #000000;"></i>'
	let array = getData();
for (let i = 0; i < array.length; i++) {
	let shopItemClass = '';
	let actualItem = '';
	switch (array[i].status) {
		case 'New':
			actualItem = bold;
			shopItemClass = "New";
		break

		case 'BEST SELLER':
			actualItem = hotjar;
			shopItemClass = "Best";
		break

		case 'TOP RATE':
			actualItem = regular;
			shopItemClass = "Top";
		break
	}
	
	// console.log(parseFloat(array[i].price));
	let stringi;
	if (array[i].price == 0) {
		stringi = `<a href=""><h2 class="card-shop__price">Out of stock</h2></a>`;
	}	else {
		stringi = `<a href=""><h2 class="card-shop__price">$${array[i].price.toFixed(2)}</h2></a>`;
	}

	let discountSpan;
	if (array[i].discount == 0) {
		discountSpan = `<span class="card-shop__discount"></span>`;
	}	else {
		discountSpan = `<span class="card-shop__discount">${array[i].discount.toFixed(2)}</span>`;
	}
	
	let cardHtml = `
	<div class="shop__card ${shopItemClass} card-shop">
		<div class="card-shop__image">
			<a href=""><img src="img/card/${array[i].imageSource}" alt="" class="card-shop__picture"></a>
		</div>
		<div class="card-shop__info">
			<div class="card-shop__status">
				${actualItem}
				<h3 class="card-shop__status_title">${array[i].status}</h3>
			</div>			
			<a href=""><p class="card-shop__name">${array[i].title}</p></a>
			<div class="card-shop__block-price">
			${stringi} ${discountSpan}
			</div>
			<button class="card-shop__button">ADD TO BAG</button>
		</div>`;
		
		switch (shopItemClass) {
			case 'New':
				newItems.push(cardHtml)
			break
	
			case 'Best':
				bestItems.push(cardHtml)
			break
	
			case 'Top':
				saleItems.push(cardHtml)
			break
		}

	allItems.push(cardHtml)
	block.insertAdjacentHTML('beforeend', cardHtml)

		// console.log(typeof array[i].price);
}
}

console.log(document.querySelectorAll('.shop__item'));

function getData() {
	let json = `[
		{
			"id": 1,
			"title": "Eye Mesh Boat Shoes",
			"status": "New",
			"price": 220.00,
			"discount": 0,
			"imageSource": "card1.png"
		},
		{
			"id": 2,
			"title": "Azure Tote",
			"status": "",
			"price": 290.00,
			"discount": 0,
			"imageSource": "card2.png"
		},
		{
			"id": 3,
			"title": "Blue Raincoat",
			"status": "",
			"price": 0,
			"discount": 0,
			"imageSource": "card3.png"
		},
		{
			"id": 4,
			"title": "Backpack with contrasting buckle",
			"status": "BEST SELLER",
			"price": 125.00,
			"discount": 0,
			"imageSource": "card4.png"
		},
		{
			"id": 5,
			"title": "Shirt in organic cotton classic gingham",
			"status": "BEST SELLER",
			"price": 59.50,
			"discount": 0,
			"imageSource": "card5.png"
		},
		{
			"id": 6,
			"title": "Tailored indigo jumpsuit",
			"status": "BEST SELLER",
			"price": 59.50,
			"discount": 165.00,
			"imageSource": "card6.png"
		},
		{
			"id": 7,
			"title": "Triple stone drop earrings",
			"status": "TOP RATE",
			"price": 49.50,
			"discount": 0,
			"imageSource": "card7.png"
		},
		{
			"id": 8,
			"title": "Backpack with contrasting buckle",
			"status": "",
			"price": 158.00,
			"discount": 0,
			"imageSource": "card8.png"
		},
		{
			"id": 9,
			"title": "Eye Mesh Boat Shoes",
			"status": "Only a few left",
			"price": 220.00,
			"discount": 0,
			"imageSource": "card9.png"
		},
		{
			"id": 10,
			"title": "Azure Tote",
			"status": "",
			"price": 290.00,
			"discount": 0,
			"imageSource": "card10.png"
		}
	]`;
	
	return JSON.parse(json);
}

