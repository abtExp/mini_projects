// Service worker registration

// window.onload = ()=>{
// 	if(navigator.serviceWorker){
// 		console.log("Registering Service Worker!");
// 		navigator.serviceWorker.register('sw2.js')
// 		.then((reg)=>{
// 			console.log("Successfully Registered Service Worker!" + reg);
// 		})
// 		.catch((err)=>{
// 			console.log("An Error Occured while registering service worker.");
// 		});
// }
// }

// Getting DOM Elements 

const zone = document.getElementById("time_zone");
const timers = [];

const add_timer = document.getElementById("add_timer");
add_timer.addEventListener("click",toggle_form);

const time_config = document.getElementById("form");

const submit = document.getElementById("submit");
submit.addEventListener("click",get_vals);

class Timers{
	constructor(hrs,min,sec,color="#008382"){
		this.hrs = hrs;
		this.min = min;
		this.sec = sec;
		this.id = `timers_no.${timers.length}`;
		this.clr = color;
		this.finished = false;
		this.set_time(min,sec);
		this.display_time();
	}

	set_time(min,sec){
		if(this.min >=60){
			this.hrs += Math.floor(this.min/60);
			this.min -= (Math.floor(this.min/60))*60;
		}
		if(this.sec >=60){
			this.min += Math.floor(this.sec/60);
			this.sec -= (Math.floor(this.sec/60))*60;
		}
	}

	display_time(){
		let div = document.createElement("div"),
		sec = document.createElement("p"),
		min = document.createElement("p"),
		hrs = document.createElement("p");

		hrs.innerHTML = this.hrs ? ((this.hrs < 10) ? `0${this.hrs} :` : `${this.hrs} :`) : '00: ';
		min.innerHTML = this.min ? ((this.min < 10) ? `0${this.min} :` : `${this.min} :`) : '00: ';
		sec.innerHTML = this.sec ? ((this.sec < 10) ? `0${this.sec}` : this.sec) : '00';
		
		hrs.id = this.id + "_hrs";
		min.id = this.id + "_min";
		sec.id = this.id + "_sec";

		hrs.className = min.className = sec.className = "tim";

		div.appendChild(hrs);
		div.appendChild(min);
		div.appendChild(sec);

		div.id = this.id;
		div.style.backgroundColor = this.clr;
		div.className = "timer";
		zone.appendChild(div);
	}

	update_time(){
		
	}

}


function get_vals(){
	let hrs = parseInt(document.getElementById("hrs").value);
	let min = parseInt(document.getElementById("mins").value);
	let sec = parseInt(document.getElementById("secs").value);

	// toggle_form();
	if(hrs || min || sec){
		timers.push(new Timers(hrs,min,sec));
		toggle_form();
	}
	else{
		alert("Please fill in atleast some time");
	}
	// console.log(timers);
}

function toggle_form(){
	time_config.style.display = time_config.style.display === "flex" ? "none" : "flex"; 
}