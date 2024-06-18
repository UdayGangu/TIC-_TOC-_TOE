let boxes=document.querySelectorAll('.box')
let reset=document.querySelector(".reset")
let newGameButton=document.querySelector("#new-btn")
let message=document.querySelector('#msg')
let messageContainer=document.querySelector(".msg-container")

let turnO=true;
let count=0;
reset.classList.remove('resetHide');
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

for(let i=0;i<boxes.length;i++)
{
    let box=boxes[i];
    box.addEventListener('click',()=>{
        if(turnO){   //player_O
            turnO=false;
            box.textContent='O'
        }
        else{      //player_X
            turnO=true;
            box.textContent='X'
        }
        box.disabled=true;
        count++;
        let isWinner =checkWinner();
        if(count===9 && !isWinner){
            message.innerText = `Game was a Draw.`;
            messageContainer.classList.remove("hide");
            reset.classList.add('resetHide');
            turnO = true;
            count = 0;
            boxDisable();
        }

    })
}


function checkWinner()
{
    for(let i=0;i<winPatterns.length;i++)
    {
        let pattern=winPatterns[i];
        let position1=boxes[pattern[0]].innerText
        let position2=boxes[pattern[1]].innerText
        let position3=boxes[pattern[2]].innerText

        if(position1!=''&&position2!=''&&position3!=''){
            if(position1===position2 && position2===position3){
                boxDisable();
                showWinner(position1)
            }
        }
    }
}

function boxDisable()
{
    for(let i=0;i<boxes.length;i++){
        let box=boxes[i];
        box.disabled=true; 
    }
}

function showWinner(winner)
{
    message.innerText='Congartulations! Winner is '+ winner;
    messageContainer.classList.remove('hide');
    reset.classList.add('resetHide');
}

function boxEnable()
{
    turnO = true;
    count = 0;
    messageContainer.classList.add('hide');
    reset.classList.remove('resetHide');
    for(let i=0;i<boxes.length;i++){
        let box=boxes[i];
        box.disabled=false;
        box.innerText=''
    }
}

reset.addEventListener('click',boxEnable);
newGameButton.addEventListener('click',boxEnable)