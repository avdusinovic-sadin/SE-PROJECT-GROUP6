//when the website is loaded
$(document).ready(function(){
//call the animationBubble every 2 seconds
    setInterval(animationBubble, 200);
//when you click on a menu
    $('#htp').click(function(){
        $("body").append("<div class='information'>dsjakadsj<button class='x'>X</button></div>");
//remove the menu
        $(".x").click(function(){
            $(".information").remove();
        })    });
    $('#sep').click(function(){
        $("body").append("<div class='information'>dsjakadsj<button class='x'>X</button></div>");
        $(".x").click(function(){
            $(".information").remove();
        })    });
    $('#gt').click(function(){
        $("body").append("<div class='information'>dsjakadsj<button class='x'>X</button></div>");
        $(".x").click(function(){
            $(".information").remove();
        })    });
//when you clicked on the start menu
    $('#start').click(function(){
        //define a variable to stop the anmiation
        stopAnimation = true;  
        clearInterval(animationBubble);
        //hide the menus + title
        $("#buttonsBox").hide();
        $("#gamingTitle").hide();
        //ask the user for a player name
        $("body").append("<div id='askPlayerNameBox'><p>Enter a player name</p> <br> <input type='text' id='enterPlayerName'><br><button id='continue'>continue</button></div>");
        //after a click on the continue button
        $('#continue').click(function(){
        //when the player name is empty a error message will appear
            if($("#enterPlayerName").val() == ""){
                alert("These field can't be null or empty! Please enter a player name.");
            }
            //there is a real player name
            else{
                $("#askPlayerNameBox").hide();
                //define some varibale for the ects, skip & time
                var ects=0;
                var counter = 20;
                var skip = false;
                var time= 20;
                var intro= setInterval(function(){
                    if(time<=0){
                        clearInterval(intro);
                        document.getElementById("intro").innerHTML = time;
                        //hide some elements
                        $("#descriptionBox").hide();
                        $("#gamingTitle").hide();
                        $("#buttonsBox").hide();
                        //show the name, ects & hearts
                        $("body").append("<div id='playerNameBox'>Player: "+$("#enterPlayerName").val()+"</div>");
                        $("body").append("<div id='pauseBox'><button id='pause'>Pause</button></div>");
                        $("body").append("<table id='eth'><tr><td>ECTS</td><td>TIME</td><td>HEARTS</td></tr><tr><td id='ectsText'>"+ects+
                        "</td><td id='showTimeLeft'></td><td><span id='heartsBox'></span></td></tr></table>");
                        //this for loop will display 3 hearts
                        for(s=0;s<3;s++){
                            var heart=document.createElement('span');
                            heart.innerHTML="&hearts;";
                            heart.classList.add("heart");
                            document.getElementById("heartsBox").appendChild(heart);
                        }
                        //if you click on pause -> the game will be paused
                        $('#pause').click(function(){
                            stopGame=true;
                            clearInterval(gameBubble);
                            clearInterval(gameTimer);
                            $("#pause").replaceWith("<div><button id='continueGameButton'>continue</button></div>");
                            $("body").append("<div id='pausedBox'>the game has been paused</div>");
                        });
                        // show the gaming animation every  1 second
                        setInterval(gameBubble, 1000);
                    }
                    else{
                        document.getElementById("intro").innerHTML = time;
                    }
                    time--;

                },1000);

               
                //show the desription box with the semester courses
                $("body").append(
                    "<div id='descriptionBox'><p id='memorizeText'>Try to memorize those colors in the next <span id='intro'>20</span> seconds</p><h1>1st Semester: </h1><div id='courseBox'><div class='course' style='border: 3px solid red;'>Mathe discrète 1</div><div class='course' style='border: 3px solid green;'>Statistique 1</div><div class='course' style='border: 3px solid yellow;'>Calculus</div><div class='course' style='border: 3px solid blue;'>Programming 1</div><div class='course' style='border: 3px solid pink;'>Intro à l'informatque</div><div class='course' style='border: 3px solid orange;'>Operating System 1</div><br><button id='skip'>Skip</button></div>"
                  );
                //if you have clicked on the skip button you will skip the description
                  $('#skip').click(function(){
                    skip = true;
                    time=1;
                    $("#descriptionBox").hide();
                    $("#gamingTitle").hide();
                    $("#buttonsBox").hide();
            
                });
                //set a timer for 60 seconds
                var gameTime=60;
                var gameTimer= setInterval(function(){
                    gameTime--;
                    if(gameTime==0){
                        //there is no time left
                        alert("no time left");
                        clearInterval(gameBubble);
                        window.location.reload();
                    }
                    $("#showTimeLeft").text(gameTime);
                },1000);
            }
        }); 
    });

});

//to stop the animation
var stopAnimation= false;
var stopGame= false;


function animationBubble() {

    if(stopAnimation == true){
        return;
    }
    //define new divs for the bubbles
    var animation = document.querySelector("#animatedBubbles");
    var createBubble = document.createElement("div");
    var size = 100;
    var random = Math.random();
    //style of the bubbles
    createBubble.style.width =  size + "px";
    createBubble.style.height =  size + "px";
    createBubble.style.right = innerWidth * random + "px";
    animation.appendChild(createBubble);
    //remove the bubbles after 4 seconds animation duration
    setTimeout(() => {
        createBubble.remove();
    }, 4000);
  }


  var ects=0;
  var numberOfHearts=3;

  function gameBubble() {
    if(stopGame == true){
        return;
    }

    //define some variables for a random number, size & probability
    //define some arrays for the course colors & different colors
    var random = Math.random();
    var size = 100;
    var courses = ["blue", "red", "pink", "yellow", "orange", "green"];
    var different = ["lightblue", "black"];
    var probability=0.5;
    var color;


      if(stopGame == true){
          return;
      }
//check if the probability is bigger than a random number
      if(probability > random){
        color = courses[Math.floor(Math.random() * courses.length)];
      }else{
        color = different[Math.floor(Math.random() * different.length)];
      }
      
      //create the gaming bubbles
      var gameBubble = document.createElement("div");      
      gameBubble.classList.add("gameBubbles");
      gameBubble.style.width =  size + "px";
      gameBubble.style.height =  size + "px";
      gameBubble.style.boxShadow =  " 0 0 8px " + color ;
      gameBubble.style.right = innerWidth * random + "px";
      document.body.appendChild(gameBubble);

    //after a click on a gaming bubble
      gameBubble.addEventListener("click", ()=>{

        //remove the text after 1 s
        setTimeout(()=>{
            text.remove();
        },1000);
        //remove the bubble after 100 ms
        setTimeout(()=>{
            gameBubble.remove();
        },100);
        
        //create the +1 or -1 text
        var text= document.createElement("div");
        text.classList.add("clickedText");
        text.style.top = gameBubble.offsetTop + "px";
        text.style.left = gameBubble.offsetLeft + "px";

       
        //check if the clicked bubble is part of the courses array or different array
        if(courses.includes(color)){
            //remove 1 ects
            ects++;
            text.style.color="lightgreen";
            text.innerHTML="+1";
            document.body.appendChild(text);
        }
        else{ 
            //remove 1 heart
            numberOfHearts--;
            $(".heart").last().remove();
            //if you don't have any hearts left, then you will start to lose some ects
            if(numberOfHearts==0){
                    ects--;
                    text.style.color="red";          
                    text.innerHTML="-1";
                    document.body.appendChild(text);   
                }
            else if(0>ects){
                ects=0;
                alert("dsad");
                window.location.reload();
            }
        }
        //if you got 30 ects, then you have passed the 1st semester
        if(ects==30){
            $("body").append("<div id='wonBox'>Congrats! <br> You have passed the first semester. <br> You're now in the second semester!</div>");
        }
       //show the ects number
        $("#ectsText").text(ects);

      });

//animation should last 4 s
      setTimeout(() => {
        gameBubble.remove();
      }, 4000);
    }



