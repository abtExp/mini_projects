const area = document.querySelector('#text'),
stack = [],
tags = ['html','head','title','div','header','p',
'a','body','textarea','form'];

let s_div = document.getElementById('s'),
suggestions = [];

class tag{
	constructor(){
		this.name = '';
		this.gotName = false;
		this.isOpen = true;
	}
}

let checkState = false;

area.addEventListener('keypress',e=>{
	// 60 - < , 47 - / , 62 - >
	
	//creation of a new tag
	let t;
	if(e.keyCode === 60){
		checkState = true;
		return;
	}

	if(checkState && e.keyCode === 47){
		e.preventDefault();
		area.value += `/${stack.pop().name}>`;
		checkState = false;
	}

	if(checkState && e.keyCode !== 47){
		t = new tag();
		stack.push(t);
		checkState = false;
	}

	if(e.keyCode === 62 && !stack[stack.length-1].gotName){
		stack[stack.length-1].gotName = true;
	}

	else if(!stack[stack.length-1].gotName){
		stack[stack.length-1].name += e.key;
		search(stack[stack.length-1].name);
	}
	console.log(e.keyCode);
})

function search(key){
	console.log('Searching');
	suggestions = [];
	for(let i of tags){
		if(i.includes(key)){
			suggestions.push(i);			
		}
	}
	show_suggestions(suggestions);
}

function show_suggestions(s){
	s_div.innerHTML = '';
	for(let i of s){
		let li = document.createElement('li');
		li.innerHTML = i;
		s_div.appendChild(li);
	}
}