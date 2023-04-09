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
    const gameboard = document.querySelector(".gameboard");

    const boxSelector = (index) => {
        return document.querySelector(`box-${index}`);
    };

    const markX = (index) => {
        const currentBox = boxSelector(index);
        currentBox.classList.add("x-marked");
    };

    const markO = (index) => {
        const currentBox = boxSelector(index);
        currentBox.classList.add("o-marked");
    };
})();

const player = (number, sign) => {
    const getPlayerNumber = () => number;
    const getPlayerSign = () => sign;
    //more details if needed
    return {getPlayerNumber, getPlayerSign};
};

const game = (gameboard, displayController) => {
    //game flow logic
    const firstTurnSelector = () => {
        //first turn selector and display
    }
    //each round logic and victory check and match progress display
};

