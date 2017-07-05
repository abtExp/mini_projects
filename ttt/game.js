const game_mode = '2p';
let p1,p2;
make_players(game_mod);

function make_players(game){
    if(game === '2p'){
        p1 = new Player('p'),
        p2 = new Player('p');
    }
    else{
        p1 = new Player('p');
        p2 = new Player('ai');        
    }
}

