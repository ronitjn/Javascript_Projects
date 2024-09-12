let body = document.getElementsByTagName("body");
let board = document.querySelector(".board");
let preset = board.innerHTML;
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let turn = true; //true-X,false-Y
let counter = 0;

//winnig patterns
let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const reset = ()=>{
    init();
    boxes.forEach((box) =>{
        box.addEventListener("click",()=>{
            if(turn){
                box.innerText = "X";
                turn = false;
            }
            else{
                box.innerText = "O";
                turn = true;
            }
            box.disabled = true;
            counter++;
            let isWin = checkWinner();
            if(counter === 9 && !isWin){
                dispWinner("DRAW!");
            }
        })
    })
}

const checkWinner = ()=>{
    for(p of winningPatterns){
        let v1 = boxes[p[0]].innerText;
        let v2 = boxes[p[1]].innerText;
        let v3 = boxes[p[2]].innerText;
        //console.log(v1+","+v2+","+v3)
        if(v1 != "" && v2 != "" && v3 != ""){
            if(v1 === v2 && v2 === v3){
                //console.log(`${v1} WINS`)
                dispWinner(`${v1} WINS`);
            }
        }
    }
}

const dispWinner = (val)=>{
    for(box of boxes){
        box.classList.add("box-hide")
    }
    board.classList.add("board-msg");
    board.innerText = `${val}`;
}

const init = ()=>{
    board.classList.remove("board-msg");
    //console.log("working");
    board.innerHTML = preset;
    boxes = document.querySelectorAll(".box");
    for(box of boxes){
        box.classList.remove("box-hide");
        //console.log(box.classList);
    }
    turn = true;
    counter = 0;
}