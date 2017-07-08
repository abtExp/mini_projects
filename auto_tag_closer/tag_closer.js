const area = document.querySelector('#text');
const stack = [];
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
		if(e.keyCode === 2){};
		stack[stack.length-1].name += e.key;
	}
	
	console.log(e.keyCode);

})