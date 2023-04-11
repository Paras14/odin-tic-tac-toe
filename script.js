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

    const boardResetter = () => {
        board.forEach((element) => 'e');
    }

    return {markO, markX, victoryCheck, indecisiveCheck, getBoardInfo, getVictoryMark, boardResetter};
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

    const indecisiveMatchHandler = () => {
        const matchResult = document.querySelector('.match-result p');
        matchResult.innerHTML = 'Match has been indecisive. Please refresh to start again';
        matchResultDisplay();
    }

    const victoryMatchHandler = (winner) => {
        const matchResult = document.querySelector('.match-result p');
        matchResult.innerHTML = `${winner.getPlayerTitle()} has won the match. Please refresh to start again`;
        matchResultDisplay();
    }

    const playersNameSetter = (playerOne, playerTwo) => {
        const firstPlayerNamePositon = document.querySelector('.first-player');
        const secondPlayerNamePositon = document.querySelector('.second-player');

        firstPlayerNamePositon.innerHTML = playerOne;
        secondPlayerNamePositon.innerHTML = playerTwo;
    }

    const matchResultDisplay = () => {
        //select element and change their visibility, 2 elements
        const winnerPopUpBg = document.querySelector('.match-result-bg');
        const winnerPopUp = document.querySelector('.match-result');
        winnerPopUp.style.visibility = "visible";
        winnerPopUpBg.style.visibility = "visible";
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

    return {markOonGrid, markXonGrid, playerTurnIndicator, playersNameSetter, indecisiveMatchHandler, victoryMatchHandler};
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
                    gameBoard.getVictoryMark() === 'x' ? game.setWinner(game.getplayerOne()):game.setWinner(game.getplayerTwo());
                    playerInputController.gameStopController(game);
                }
                game.switchCurrentPlayer();
                displayController.playerTurnIndicator();
                gameBoard.indecisiveCheck() ? playerInputController.gameStopController(game) : console.log('');

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

const player = (playerName, playerTitle) => {
    let sign = '';
    const getPlayerTitle = () => playerTitle;
    const getPlayerName = () => playerName;
    const setPlayerSign = signSelected => {
        sign = signSelected;
    };
    const getPlayerSign = () => sign;
    //more details if needed
    return {getPlayerName, getPlayerSign, setPlayerSign, getPlayerTitle};
};

const game = (firstPlayerName, secondPlayerName) => {

    
    //playerOne
    const playerOne = player('first-player', firstPlayerName);
    //playerTwo
    const playerTwo = player('second-player', secondPlayerName);

    //game flow logic
    const playerSignSetter = () => {
        playerOne.setPlayerSign('x');
        playerTwo.setPlayerSign('o');
    };

    let currentPlayer = playerOne;

    let winner = 'nobody';

    const setWinner = (player) => {
        winner = player;
    }

    const getWinner = () => winner;

    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }

    const getCurrentPlayer = () => currentPlayer;

    const getplayerOne = () => playerOne;
    const getplayerTwo = () => playerTwo;

    const switchCurrentPlayer = () => {
        if(currentPlayer === playerOne){
            currentPlayer = playerTwo;
        }
        else if(currentPlayer === playerTwo){
            currentPlayer = playerOne;
        }
    };
    //each round logic and victory check and match progress display

    return {playerSignSetter, switchCurrentPlayer, setCurrentPlayer, getCurrentPlayer, setWinner, getWinner, getplayerOne, getplayerTwo};
};

const playerInputController = (() => {

    let gameIsOn = false;

    let firstNameValue = '';

    let secondNameValue = '';

    const playerNameInputter = () => {
        const firstPlayerName = document.querySelector('input[id="first-player-name"]');
        const secondPlayerName = document.querySelector('input[id="second-player-name"]');

        console.log(firstPlayerName.value);

        firstNameValue = firstPlayerName.value;
        secondNameValue = secondPlayerName.value;
    }

    const gameStopController = (game) => {
        const buttonText = document.querySelector('.start-stop-controller p');
        buttonText.innerHTML = 'Press to start';
        const buttonBg = document.querySelector('.start-stop');
        if(buttonBg.classList.contains('stop-button-bg')){
            buttonBg.classList.remove('stop-button-bg');
        }
        buttonBg.classList.add('start-button-bg');
        gameIsOn = false;
        //more code to manage the game winner or draw
        //display controller function () here for draw match result
        console.log('This is the game : ', game);
        if(game.getWinner() !== 'nobody'){
            displayController.victoryMatchHandler(game.getWinner());
        }
        else{
            displayController.indecisiveMatchHandler();
        }
        gameBoard.boardResetter();
        
        
    }

    const gameStartController = () => {
        const buttonText = document.querySelector('.start-stop-controller p');
        buttonText.innerHTML = 'Press to stop';
        const buttonBg = document.querySelector('.start-stop');
        if(buttonBg.classList.contains('start-button-bg')){
            buttonBg.classList.remove('start-button-bg');
        }
        buttonBg.classList.add('stop-button-bg');
        gameIsOn = true;
        //more code to start the gameflow and send the names of players and update the name on webpage
        playerNameInputter();
        gameFlow(firstNameValue, secondNameValue)
        

    }

    const gameStartStopButtonListener = () => {
        const buttonBg = document.querySelector('.start-stop');
        buttonBg.addEventListener('click', () => {
            if(gameIsOn){
                //steps to then stop the game
                gameStopOnButtonPress();
            }
            else{
                gameStartController();
                //steps and functional flow to play the game
            }
        })
    }

    const gameStopOnButtonPress = () => {
        const buttonText = document.querySelector('.start-stop-controller p');
        buttonText.innerHTML = 'Press to start';
        const buttonBg = document.querySelector('.start-stop');
        if(buttonBg.classList.contains('stop-button-bg')){
            buttonBg.classList.remove('stop-button-bg');
        }
        buttonBg.classList.add('start-button-bg');
        gameIsOn = false;

        gameBoard.boardResetter();

        const matchResult = document.querySelector('.match-result p');
        matchResult.innerHTML = "Match interrupted by manual stop. Please refresh to start again";
        const winnerPopUpBg = document.querySelector('.match-result-bg');
        const winnerPopUp = document.querySelector('.match-result');
        winnerPopUp.style.visibility = "visible";
        winnerPopUpBg.style.visibility = "visible";
    }

    return {gameStartStopButtonListener, gameStopController, gameStartController};

})();

function gameFlow(firstName, secondName){
    console.log("inside game flow");
    displayController.playersNameSetter(firstName, secondName);
    const newGame = game(firstName, secondName);
    newGame.playerSignSetter();
    inputController.boxesListener(newGame);
    
}

// gameFlow();
playerInputController.gameStartStopButtonListener();