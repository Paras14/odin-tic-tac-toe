const gameboard = (() => {
    let board = ['e','e','e',
                 'e','e','e',
                 'e','e','e'];

    const victoryArrays = [[0,1,2], [3,4,5], [6,7,8], 
                           [0,3,6], [1,4,7], [2,5,8],
                           [0,4,8], [2,4,6]];
    const markX = (index) => {
        board[index] = 'X';
    }
    const markO = (index) => {
        board[index] = 'O';
    }
    const victoryCheck = () => { //or maybe be bundled with indecisive logic
        victoryArrays.forEach((conditions) => {
            if(board[conditions[0]] === board[conditions[1]] === board[conditions[2]]){
                const victoryMark = board[conditions[0]];
                return victoryMark;
            }
        })
    }
    
    const indecisiveCheck = () =>{
        //indecisive Logic check or maybe bundled in a single function
    }

    return {markO, markX, victoryCheck, indecisiveCheck};
})();

const displayController = (() => {
    //display Controller logic and returns
    const playerSignSelectionDisplay = (player) => {
        const displayPrompt = document.querySelector('.game-options > p');
        displayPrompt.innerText = `${player.getPlayerName()} should select their sign`;
    };

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

    return {markOonGrid, markXonGrid, playerSignSelectionDisplay};
})();

const inputController = (() => {
    const playerSignSelection = (player) =>{
        const signSelectionButtons = document.querySelectorAll('.game-options button');
        signSelectionButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                player.setPlayerSign(e.target.classList[0]);
                console.log(player.getPlayerSign());
            });
        });
        displayController.playerSignSelectionDisplay(player);

        
    };

    const gameboard = document.querySelectorAll(".gameboard button");
    const boxesListener = (player) => {
        console.log("inside boxListener");
        console.log(gameboard);
        let playerSign = player.getPlayerSign();
        gameboard.forEach((box) => box.addEventListener("click", (e) => {
            console.log(e.target);
            console.log(playerSign);
            if(playerSign === 'x'){
                console.log("inside x");
                e.target.classList.add('x-marked');
            }
            else if(playerSign === 'o'){
                e.target.classList.add('o-marked');
            }
        }));
    };
    // const boxEntryHandler = (e, sign) => {
        
    // };

    return {boxesListener, playerSignSelection};
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

const game = (gameboard, displayController) => {

    
    //playerOne
    const playerOne = player('Player One');
    //playerTwo
    const playerTwo = player('Player Two');

    //game flow logic
    const firstTurnSelector = () => {
        //first turn selector and display
    }
    //each round logic and victory check and match progress display
};

function gameFlow(){
    console.log("inside game flow");
    const playerOne = player('Paras');
    playerOne.setPlayerSign('x');
    console.log(playerOne.getPlayerSign());
    inputController.boxesListener(playerOne);
}

gameFlow();