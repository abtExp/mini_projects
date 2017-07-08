let //game_mode = document.getElementById('players').value,
grid = document.getElementsByClassName('Box'),
p1_score = document.querySelector('#p1_score'),
p2_score = document.querySelector('#p2_score'),
p1,
p2,
marked = [],
all_weights = [],
occurences = [],
game_over = false;


const weights = [[1,2,3],
                 [1,4],
                 [1,6,8],
                 [2,3],
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
        if(!check_win()){
            if(p1.moves.length >= 2){
                idx = get_best_move(p1);
                if(idx === -1){
                    idx = get_best_move(this);
                }
                else if(idx === -2){
                    return;
                }
            }
            else idx = 5;
        }
        else{
            game_over = true;
        }
        marked[idx] = true;
        this.moves.push(idx);
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
    bst_idx_cnt = 0;

    for(let i of p.moves){
        all_weights = Array.prototype.concat.apply(all_weights,weights[i-1]);
    }
    for(let i of all_weights){
        occurences[i]++;
    }

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
    return best_idx;
}

function find_other(w){
    for(let i=0; i<weights.length; i++){
        for(let j=0; j<weights[i].length; j++){
            if(weights[i][j] === w){
                return i;
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
        occurences[i] = 0;
    }
}


function get_position(j){
    for(let i=0; i<grid.length; i++){
        if(grid[i] === j){
            if(marked[i] === 0){
                marked[i] = 1;
                p1.moves.push(i);
                p1.moved = true;
                p2.make_mov();
            }
            else{
                alert('Already marked');
                return;
            }
        }
    }
}


window.onload = def_players('1');