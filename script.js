const gameBoard = (() => {
    let board = ['e','e','e',
                 'e','e','e',
                 'e','e','e'];

    const getBoardInfo = () => board;

    let victoryMark = '';

    const victoryArrays = [[0,1,2], [3,4,5], [6,7,8], 
                           [0,3,6], [1,4,7], [2,5,8],
                           [0,4,8], [2,4,6]];
    const markX = (index) => {
        if(board[index] === 'e'){
            board[index] = 'x';
        }
    }
    const markO = (index) => {
        if(board[index] === 'e'){
            board[index] = 'o';
        }
    }
    const victoryCheck = () => { //or maybe be bundled with indecisive logic
        victoryArrays.forEach((conditions) => {
            if((board[conditions[0]] === board[conditions[1]]) && (board[conditions[1]] === board[conditions[2]]) && (board[conditions[0]] === board[conditions[2]])){
                victoryMark = board[conditions[0]];
            }
        })
    }
    
    const getVictoryMark = () => victoryMark;
    
    const indecisiveCheck = () =>{
        //indecisive Logic check or maybe bundled in a single function
        return !board.includes('e');
    };

    return {markO, markX, victoryCheck, indecisiveCheck, getBoardInfo, getVictoryMark};
})();

const displayController = (() => {
    //display Controller logic and returns
    const playerTurnIndicator = () => {
        const playerIndicatorElements = document.querySelectorAll('.player-turn-indicator > div');
        if(playerIndicatorElements[0].classList.contains('active-player')){
            playerIndicatorElements[0].classList.remove('active-player');
            playerIndicatorElements[1].classList.add('active-player');
        }
        else if(playerIndicatorElements[1].classList.contains('active-player')){
            playerIndicatorElements[1].classList.remove('active-player');
            playerIndicatorElements[0].classList.add('active-player');
        }
    }

    const boxSelector = (index) => {
        return document.querySelector(`box-${index}`);
    };

    const markXonGrid = (index) => {
        const currentBox = boxSelector(index);
        currentBox.classList.add("x-marked");
    };

    const markOonGrid = (index) => {
        const currentBox = boxSelector(index);
        currentBox.classList.add("o-marked");
    };

    return {markOonGrid, markXonGrid, playerTurnIndicator};
})();

const inputController = (() => {

    const gameboardLocal = document.querySelectorAll(".gameboard button");
    const boxesListener = (game) => {
        console.log("inside boxListener");
        console.log(gameboardLocal);
        gameboardLocal.forEach((box) => box.addEventListener("click", (e) => {
            console.log(e.target);
            console.log(game.getCurrentPlayer().getPlayerName());
            if((game.getCurrentPlayer().getPlayerSign() === 'x') && (!e.target.classList.contains('o-marked') && !e.target.classList.contains('x-marked'))){
                e.target.classList.add('x-marked');
                console.log(e.target.classList[0].at(-1));
                gameBoard.markX(e.target.classList[0].at(-1));
                console.log(gameBoard.getBoardInfo());
                gameBoard.victoryCheck();
                console.log("Victory Check: ",gameBoard.getVictoryMark());
                if(gameBoard.getVictoryMark() !== 'e'){
                    console.log(`Match over ${gameBoard.getVictoryMark()} won`);
                }
                game.switchCurrentPlayer();
                displayController.playerTurnIndicator();
                gameBoard.indecisiveCheck()?console.log('Match Draw'):console.log('match not over');

            }

            else if((game.getCurrentPlayer().getPlayerSign() === 'o') && (!e.target.classList.contains('o-marked') && !e.target.classList.contains('x-marked'))){
                e.target.classList.add('o-marked');
                console.log(e.target.classList[0].at(-1));
                gameBoard.markO(e.target.classList[0].at(-1));
                console.log(gameBoard.getBoardInfo());
                gameBoard.victoryCheck();
                console.log("Victory Check: ",gameBoard.getVictoryMark());
                game.switchCurrentPlayer();
                displayController.playerTurnIndicator();
            }
        }));
    };
    return {boxesListener};
})();

const player = (playerName) => {
    let sign = '';
    const getPlayerName = () => playerName;
    const setPlayerSign = signSelected => {
        sign = signSelected;
    };
    const getPlayerSign = () => sign;
    //more details if needed
    return {getPlayerName, getPlayerSign, setPlayerSign};
};

const game = () => {

    
    //playerOne
    const playerOne = player('first-player');
    //playerTwo
    const playerTwo = player('second-player');

    //game flow logic
    const playerSignSetter = () => {
        playerOne.setPlayerSign('x');
        playerTwo.setPlayerSign('o');
    };

    let currentPlayer = playerOne;

    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }

    const getCurrentPlayer = () => currentPlayer;

    const switchCurrentPlayer = () => {
        if(currentPlayer === playerOne){
            currentPlayer = playerTwo;
        }
        else if(currentPlayer === playerTwo){
            currentPlayer = playerOne;
        }
    };
    //each round logic and victory check and match progress display

    return {playerSignSetter, switchCurrentPlayer, setCurrentPlayer, getCurrentPlayer};
};

function gameFlow(){
    console.log("inside game flow");
    const newGame = game();
    newGame.playerSignSetter();
    inputController.boxesListener(newGame);
    
}

gameFlow();