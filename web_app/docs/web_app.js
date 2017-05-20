window.onload = register_sw();
var btn = document.getElementById("menu_btn");
var menu = document.getElementById("side_slide_menu");
btn.addEventListener('click',()=>{
	menu.className = 'slide-in';
});

var close = document.getElementById('close_menu');
close.addEventListener('click',()=>{
	menu.className = 'slide-out';
});


var prom = new Promise((resolve,reject)=>{
	var req = new XMLHttpRequest();
	req.open("GET","https://api.github.com/users/abt10/repos");
	req.send();
	req.onreadystatechange = ()=>{
		if(req.status !== 404){
			var data = req.responseText;
			if(data){
				console.log("data recieved");
				resolve(data);
			}
		}
		else{
			reject(req.status);
		}
	}
})
.then((data)=>{
	var parsed_data = JSON.parse(data);
	console.log(parsed_data);
	parsed_data.forEach((i)=>{
		insert_card(i);
	});
})
.catch((err)=>{
	console.log("Request To The API Failed with Status : " + err);
});


function insert_card(data){
	var container = document.getElementById('container_div');
	var card = document.createElement('div');
	card.className = 'card';
	var heading = document.createElement('h1');
	heading.innerHTML = data.name;
	heading.className = 'card_heading';
	card.appendChild(heading);
	var link = document.createElement('a');
	link.innerHTML = ">> " + data.name;
	link.setAttribute('href','https://abt10.github.io/' + data.name);
	card.appendChild(link);
	container.appendChild(card);
}

function register_sw(){
	if(navigator.serviceWorker){
		console.log("Registering Service Worker");
		navigator.serviceWorker.register('sw.js')
		.then((reg)=>{
			console.log("Service Worker Registered. " + reg);
		})
		.catch((err)=>{
			console.log("Error Registering Service Worker. Error "  + err);
		});
	}
	else{
		console.log("Service Worker Not Found!");
	}
}
