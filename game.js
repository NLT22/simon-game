var level=0;
var btnColors=[];
var gamePattern=[];
var userClickedPattern=[];
var sound=[];
var ranChosenColor;
var userChosenColor;
var checkSuccess=true;
btnColors.push("red","blue","green","yellow")

$("#your-turn").hide();

function playSound(color){
    var audio=new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(()=>{        
        $("#"+color).removeClass("pressed");
    },100);
}

function nextSequence(){
    level++;
    $("#level-title").html("Level "+level);
    userChosenColor=[];
    var ranNum=Math.floor(Math.random()*4);
    ranChosenColor=btnColors[ranNum];
    gamePattern.push(ranChosenColor);
    // playSound(ranChosenColor);
    // setTimeout(()=>{        
    //     $("#"+ranChosenColor).fadeOut(100).fadeIn(100);
    // },100);
}


$(".btn").on("click",function(){
    userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
})

function checkAnswer(){
    if (userChosenColor===gamePattern[count]){
        if (++count==gamePattern.length) {
            $("body").addClass("right-answer");
            playSound("right");
            setTimeout(()=>{
                $("body").removeClass("right-answer");
            },200)
            setTimeout(()=>{
                gameStart();
            },500)
            
        }
    }
    else {
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        gamePattern=[];
        level=0;
    }
}

function gameStart(){
    count=0;
    userClickedPattern=[];
    nextSequence();
    for (let i = 0; i < gamePattern.length; i++) {
        (function (index) {
            setTimeout(() => {
                playSound(gamePattern[index]);
                $("#" + gamePattern[index]).fadeOut(100).fadeIn(100);
            }, index * 1000+1000);
        })(i);
    }
    setTimeout(()=>{
        $("#your-turn").show();
        $(".row").hide();
    },(gamePattern.length+1)*1000);
    setTimeout(()=>{
        $("#your-turn").hide();
        $(".row").show();
    },(gamePattern.length+2)*1000);
}
$(document).on("keypress",function(){
    $("#level-title").text("OK, Let's play!");
    setTimeout(()=>{
        gameStart();
    },1000);
})