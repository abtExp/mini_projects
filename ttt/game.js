let //game_mode = document.getElementById('players').value,
game = '1';
grid = document.getElementsByClassName('Box'),
p1_score = document.querySelector('#p1_score'),
p2_score = document.querySelector('#p2_score'),
p1,
p2,
marked = [],
game_over = false;


const weights = [[1,2,3],
                 [1,4],
                 [1,6,8],
                 [2,5],
                 [3,5,4,8],
                 [5,6],
                 [2,7,8],
                 [4,7],
                 [3,6,7]];


class Player{
    constructor(typ){
        this.moves = [];
        this.score = 0;
        this.win = false;
        this.type = typ;
        this.moved = false;
    }

    make_mov(){
        let idx;
        //check for the user's next best move and block it if win
        //if user can't win check for self winning move
        //if both can't win, make a move

        

        marked[idx] = 1;
        this.moves.push(idx);
        grid[idx].style.backgroundColor = '#a03288';
        check_win();
    }
}

function check_win(){
    if(p1.win === true){
        p1.scores++;
        return true;
    }
    else if(p2.win === true){
        p2.scores++;
        return true;
    }
    return false;
}


function get_best_move(p){
    /* Pseudo-code :
         * Iterate over player's moves
         * push the weights related to that move in all_weights
         * iterate over all weights and make an occurences array
         * if any occurence == 2
         * iterate over weights and look for block with same weight
         * if it's marked, player has won
         * else make a move to that block
         * CHECK FOR AI'S WIN BY REPEATING THE SAME PROCEDURE FOR AI MOVES
        */
    
    let best_idx = -1,
    bst_idx_cnt = 0,
    all_weights = [],
    occurences = [];

    for(let i=0; i<grid.length; i++){
        occurences[i] = 0;
    }

    for(let i of p.moves){
        all_weights = Array.prototype.concat.apply(all_weights,weights[i]);
    }
    
    for(let i of all_weights){
        occurences[i-1]++;
    }

    console.log(all_weights);
    console.log(occurences);
    for(let i=0; i<occurences.length; i++){
        if(occurences[i] === 2){
            bst_idx_cnt++;
            best_idx = find_other(i);
        }

        else if(occurences[i] === 3 || bst_idx_cnt === 2){
            p.win = true;
            p.score++;
            game_over = true;
            return -2;
        }
    }

    if(best_idx === -1){
        for(let k=0; k<all_weights.length; k++){
            let i = find_other(all_weights[k]);
            if(marked[i] === 0){
                best_idx = i;
            }
        }
    }
    console.log(best_idx);
    return best_idx;
}

function find_other(w){
    for(let i=0; i<weights.length; i++){
        for(let j=0; j<weights[i].length; j++){
            if(weights[i][j] === w ){
                if(marked[i] === 0){
                    return i;
                }
                else{
                    return;
                }
            }
        }
    }
}


function def_players(game){
    if(game === '1'){
        p1 = new Player('user');
        p2 = new Player('ai');
    }
    else{
        p1 = new Player('user');
        p2 = new Player('user');
    }

    
    for(let i=0; i<grid.length; i++){
        marked[i] = 0;
        grid[i].style.backgroundColor = '#fff';
    }
}


function get_position(j){
    for(let i=0; i<grid.length; i++){
        if(grid[i] === j){
            if(marked[i] === 0){
                marked[i] = 1;
                p1.moves.push(i);
                p1.moved = true;
                grid[i].style.backgroundColor = '#008382';
                p2.make_mov();
            }
            else{
                alert('Already marked');
                return;
            }
        }
    }
    console.log(p1.moves);
    console.log(p2.moves);
}

function reset(){
    def_players(game);
}


window.onload = def_players(game);