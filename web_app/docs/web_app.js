"use strict";

window.onload = _=>{
	get_data();
}

const btn = document.getElementById("menu_btn");
const menu = document.getElementById("side_slide_menu");
btn.addEventListener('click',()=>{
	menu.className = 'slide-in';
});

const close = document.getElementById('close_menu');
close.addEventListener('click',()=>{
	menu.className = 'slide-out';
});

function get_data(){
	fetch('https://api.github.com/users/abt10/repos')
	.then(dat=>{
		return dat.json();
	})
	.then(data=>{
		data.forEach(i=>{
			insert_card(i);
			to_footer(i);
		})
	})
	.catch(err=>{
		console.error("Can't fetch the data");
	})
}

function insert_card(data){
	const container = document.getElementById('container_div');
	const card = document.createElement('div');
	card.className = 'card';
	const heading = document.createElement('h1');
	heading.innerHTML = data.name;
	heading.className = 'card_heading';
	card.appendChild(heading);
	const link = document.createElement('a');
	link.innerHTML = ">> " + data.name;
	link.setAttribute('href',`${data.html_url}`);
	card.appendChild(link);
	container.appendChild(card);
}

function to_footer(data){
	const footer = document.getElementById("col2");
	let lin = document.createElement("a");
	lin.innerHTML = data.name;
	lin.setAttribute('href',`${data.html_url}`);
	footer.appendChild(lin);
}

