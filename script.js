const options = document.querySelector(".options"),
xBtn = document.querySelector(".x"),
oBtn = document.querySelector(".o"),
playBoard = document.querySelector(".playBoard"),
player = document.querySelector(".details"),
result = document.querySelector(".result"),
winnerName = document.querySelector(".result h1"),
p = document.querySelector(".result p"),
replay = document.querySelector(".result button"),
boxes = document.querySelectorAll(".playBoard section span");


let run = true;

window.onload = ()=>{
    let sign =  "X";
    for(let i = 0; i < boxes.length; i++){
        boxes[i].setAttribute("onclick","clickedBox(this)")
    };

    xBtn.onclick=()=>{
        options.classList.add("hide");
        playBoard.classList.add("show");
        player.innerText= "X turn";
        player.classList.add("Xturn");
    };
    oBtn.onclick=()=>{
        options.classList.add("hide");
        playBoard.classList.add("show");
        player.innerText = "O turn";
        player.classList.add("Oturn");
    };
}
//User Function
function clickedBox(element){
    if(run){ 
        if(player.classList.contains("Oturn")){
            sign = "O";
            element.innerHTML = `<i class='bx bx-radio-circle'></i>`;
            player.innerText = "X turn";
            element.setAttribute("id",sign);
        }else{
            sign = "X";
            element.innerHTML = `<i class='bx bx-x'></i>`;
            player.innerText = "O turn";
            element.setAttribute("id", sign);
        };
        winner();
        element.style.pointerEvents = "none";
        playBoard.style.pointerEvents = "none";
        setTimeout(() => {bot(run)}, 500);   
    }
}
//Bot Function
function bot(run){
    let array = [];
    if (run) {
        for (let i = 0; i < boxes.length; i++) {
            if(boxes[i].childElementCount==0){
            array.push(i);
        }};
    }
    let randomBox = array[Math.floor(Math.random()*array.length)];
    if (array.length > 0){
        if(player.classList.contains("Xturn")){
            sign = "O";
            boxes[randomBox].innerHTML = `<i class='bx bx-radio-circle'></i>`;
            player.innerText = "X turn";
            boxes[randomBox].setAttribute("id", sign);
        }else{
            sign = "X";
            boxes[randomBox].innerHTML = `<i class='bx bx-x'></i>`;
            player.innerText = "O turn";
            boxes[randomBox].setAttribute("id",sign);
        }
        winner();
    }  
    playBoard.style.pointerEvents = "auto";
    boxes[randomBox].style.pointerEvents = "none";
    sign = "X";
}

function getClass(id){
    return document.querySelector(".box" + id).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1)==sign && getClass(val2)==sign && getClass(val3)==sign){
        return true;        
    }
}

function winner(){
    if (checkClass(1,2,3,sign) || checkClass(4,5,6, sign) || checkClass(7,8,9, sign) || checkClass(1,4,7, sign) || checkClass(2,5,8, sign) || checkClass(3,6,9, sign) || checkClass(1,5,9, sign) || checkClass(3,5,7, sign)) {
        console.log(sign+" IS WINNER");
        setTimeout(()=>{
            result.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        winnerName.innerText = sign; 
        run = false;
        bot(run);
               
    }else if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
        setTimeout(()=>{
            result.classList.add("show");
            playBoard.classList.remove("show");
        }, 1000);
        winnerName.innerText ="XO";
        p.innerText ="DRAW!";
        run = false;
        bot(run);
    }
}

replay.onclick = ()=>{
    window.location.reload();
}