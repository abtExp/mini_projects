/*******************************************************************/

/* Define Players */

ai = {
	moves : [],
	score : 0,
	name : "AI",
	symbol : 'O',
	color : "#830082",
	make_mov : function(idx,win){
		var win_pos_usr = check_win(usr);
		var win_pos_ai = check_win(this);
		console.log(win_pos_usr);
		console.log(win_pos_ai);
		console.log("Marking...");
		if(play_on() && !winner){
			if(!win){
				if(win_pos_usr){
					var flag = 0;
					for(var i=0; i<win_pos_usr.length; i++){
						flag = 0;
						for(var j=0; j<usr.moves.length; j++){
							if(i == usr.moves[j]){
								flag = 1;
							}
						}
						if(flag == 0){
							this.make_mov(i,true);
							break;
						}
					}
				}
				else if(win_pos_ai){
					var flag = 0;
					for(var i=0; i<win_pos_ai.lenght; i++){
						flag = 0;
						for(var j=0; j<usr.moves.length; j++){
							if(i == usr.moves[j]){
								flag = 1;
							}
						}
						if(flag == 0){
							this.make_mov(i,true);
							break;
						}
					}
				}
			}
			if(marked[idx] == 0){
				marked[idx] = 1;
				console.log(marked);
				boxes[idx].style.backgroundColor = this.color;
				boxes[idx].innerHTML = this.symbol;
				console.log("User to make a move.");
			}
			else{
				this.make_mov(get_best_idx(),1);
			}
		}
		else{
			console.log("Game Over!");
			check_winner();
			reset();
		}
	}
};


usr = {
	moves : [],
	score : 0,
	name : "User",
	symbol : 'X',
	color : "#008382",
	make_mov : function(idx){
		win_on = true;
		if(play_on() && !winner){
			check_win(usr);
			if(marked[idx] == 0){
				marked[idx] = 1;
				boxes[idx].style.backgroundColor = usr.color;
				boxes[idx].innerHTML = usr.symbol;
				console.log("AI to make a move.");
				setTimeout(()=>{ai.make_mov(get_best_idx())},1000);;
			}
			else{
				console.log(`${idx+1} is already marked, Please make a valid move`);
			}
		}
		else{
			console.log("Game Over!");
			check_winner();
			reset();
		}
	}
};

/******************/

/****** Global Variables to determine game state ******/
var win_matrix = [[1, 2, 3],
				  [1, 4, 7],
				  [1, 5, 9],
				  [2, 5, 8],
				  [4, 5, 6],
				  [3, 6, 9],
				  [7, 8, 9],
				  [3, 5, 7]];

var marked = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var winner = null;
var player = usr;
var win_on = true;
var boxes = document.getElementsByClassName("Box");
/******************************************************/


/***** Game Functions *****/

function reset(){
	marked = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	set_up_board();
}

function get_position(clicked){
	for(var i=0; i<boxes.length; i++){
		if(boxes[i] === clicked){
			usr.make_mov(i);
		}
	}
}

function get_best_idx(){
	//intended to look over all possible moves and generate the best one

	return idx;
}

function play_on(){
	for(var i=0; i<9; i++){
		if(marked[i] == 0){
			return true;
		}
	}
	return false;
}

function check_win(player){
	//check if win_on call ai.make_mov for winning index after setting win_on = false;
	if(!win_on){
		return null;
	}
	else{
		console.log("checking win....");
		for(var i of player.moves){
			if(i )
		}
	}
}

function set_up_board(){
	for(var i=0; i<9; i++){
		boxes[i].style.backgroundColor = "#ffffff";
		boxes[i].innerHTML = "";
	}
}

function check_winner(){
	if(winner !== null){
		console.log(`${winner.name} won the match`);
		winner.score++;
	}
	else{
		console.log('Game Drawn!');
	}
}
