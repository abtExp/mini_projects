window.onload = _=>{
    register_sw();
    get_data();
}

function get_data(){
	fetch('https://api.github.com/users/abt10/repos')
	.then(dat=>{
		return dat.json();
	})
	.then(data=>{
		data.forEach(i=>{
			to_footer(i);
		})
	})
	.catch(err=>{
		console.error("Can't fetch the data");
	})
}

function to_footer(data){
	const footer = document.getElementById("col2");
	let lin = document.createElement("a");
	lin.innerHTML = data.name;
	lin.setAttribute('href',`${data.html_url}`);
	footer.appendChild(lin);
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