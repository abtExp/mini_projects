const area = document.querySelector('#text');
const stack = [];
class tag{
	constructor(){
		this.name = '';
		this.gotName = false;
	}
}

let checkState = false;
area.addEventListener('keypress',e=>{
	// 60 - < , 47 - / , 62 - >
	let t;
	
	if(e.keyCode === 60){
		checkState = true;
		return;
	}
	if(e.keyCode === 47 && stack.length > 0){
		e.preventDefault();
		console.log("Closing last opened tag");
		area.value += `/${stack.pop().name}>`;
		console.log(stack);
	}
	if(e.keyCode === 62){
		stack[stack.length-1].gotName = true;
		console.log("Name of last tag = ",stack[stack.length-1].name)
	}
	if(checkState === true && e.keyCode !== 47){
		t = new tag();
		stack.push(t);
		console.log("New Tag Created");
		checkState = false;
	}
	else if(stack.length > 0 && stack[stack.length-1].gotName === false){
		stack[stack.length-1].name += e.key;
		if(e.keyCode === 32){
			stack[stack.length-1].gotName = true;
		}
	}
	else{
		console.log(e.keyCode);
	}
})