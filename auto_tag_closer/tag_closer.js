const area = document.querySelector('#text'),
stack = [],
tags = [{ name : 'html', auto_close : false },
		{ name : 'head', auto_close : false },
		{ name : 'title', auto_close : false },
		{ name : 'div', auto_close : false },
		{ name : 'header', auto_close : false },
		{ name : 'p', auto_close : false },
		{ name : 'a', auto_close : false },
		{ name : 'body', auto_close : false },
		{ name : 'textarea', auto_close : false },
		{ name : 'form', auto_close : false },
		{ name : 'script', auto_close : false },
		{ name : 'style', auto_close : false },
		{ name : 'input', auto_close : true },
		{ name : 'br', auto_close : true },
		{ name : 'meta', auto_close : true },
		{ name : 'link', auto_close : true }]


let s_div = document.getElementById('u'),
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

	if(e.keyCode === 8){
		console.log('you deleted something');
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
		let [found,val] = search(stack[stack.length-1],true);
		if(found){
			e.preventDefault();
			area.value += (e.key+val);
		}
	}

	else if(!stack[stack.length-1].gotName){
		stack[stack.length-1].name += e.key;
		if(e.keyCode === 32){
			stack[stack.length-1].gotName = true;
			stack[stack.length-1].name = stack[stack.length-1].name.trim();
		}
		let [found,val] = search(stack[stack.length-1]);
		if(found){
			e.preventDefault();
			area.value += (e.key+val);
		}
	}
	console.log(e.keyCode);
})

function search(key,closed=false){
	console.log('Searching');
	suggestions = [];
	let found = false,
	val = '';
	for(let i of tags){
		if(i.name.includes(key.name)){
			suggestions.push(i.name);			
		}
		if(i.name === key.name){
			found = true;
			if(i.auto_close===false && closed=== true){
				stack.pop();
				val = `</${key.name}>`; 
			}
			else if(i.auto_close){
				stack.pop();
				val = ' />';
			}  
		}
	}
	show_suggestions(suggestions);
	return [found,val];
}

function show_suggestions(s){
	s_div.innerHTML = '';
	for(let i of s){
		let li = document.createElement('li');
		li.innerHTML = i;
		s_div.appendChild(li);
	}
}