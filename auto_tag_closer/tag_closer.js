/*Auto tag closing like sublime text */

var stack = [];
var t;

class tag{
	constructor(){
		this.name = '';
		this.isOpen = true;
	}
}

var text = document.getElementById("text");
text.addEventListener('keypress',(e)=>{
	/* <  === 60  
	 * /  === 47
	 * >  === 62
	 */
	console.log('Key : ' , e.key);
	if(e.keyCode === 47 && stack.length > 0){
		e.preventDefault();
		text.value += `</${stack.pop().name}>`;
	}
	else if(e.keyCode === 60 && !t){
		t = new tag();
		stack.push(t);
	}
	else{
		if(t){
			if(e.keyCode === 62){
				t.isOpen = false;
				t = undefined;	
			}
			else{
				if(t.isOpen){
					t.name += e.key;
				}
			}
		}
	}
})