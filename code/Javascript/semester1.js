var gameTime = 60;
var ects = 0;
var skip = false;
var time = 20;

$(document).ready(function () {
  //the animation bubbles should appear ever 200 miliseconds
  setInterval(animationBubble, 200);
  //if you click on the htp button -> how to play on the starting page
  $("#htp").click(function () {
    // a div will appear where you can read how to play the game
    $("body").append(
      "<div class='information'><h1>How to play</h1><br><br><div id='internBox'> 1.Click on start.<br> 2.A menu will appear where you can see which color represents a binfo course. <br>3.Click only on those colored bubbles. <br>4.Get 30 ects after 60 seconds otherwise try again!</div><br><button class='x'>X</button></div>"
    );
    //if you click on x, then remove the div
    $(".x").click(function () {
      $(".information").remove();
    });
  });
  //if you have clicked on start,...
  $("#start").click(function () {
    //stop the animation bubbles by setting stopAnimation on true
    stopAnimation = true;
    clearInterval(animationBubble);
    //hide some elements because we don't need them anymore
    $("#buttonsBox").hide();
    $("#gamingTitle").hide();
    //ask the player for a name
    $("body").append(
      "<div id='askPlayerNameBox'><p>Enter a player name</p> <br> <input type='text' id='enterPlayerName' autocomplete='off'><br><button id='continue'>continue</button></div>"
    );
    //if you clicked on continue,...
    $("#continue").click(function () {
      //save the player's name in a session
      sessionStorage.setItem("playername", $("#enterPlayerName").val());
      //if the player's name is empty, show a error message
      if ($("#enterPlayerName").val() == "") {
        alert(
          "These field can't be null or empty! Please enter a player name."
        );
      }
      //if not, then hide the menu where you have asked the player to enter a name
      else {
        $("#askPlayerNameBox").hide();
        //the intro of the semester will be shown for 20 seconds, where you can see your courses from the semester
        var intro = setInterval(function () {
          //if time is smaller or equal to 0
          if (time <= 0) {
            clearInterval(intro);
            document.getElementById("intro").innerHTML = time;
            //remove some elements
            $("#descriptionBox").remove();
            $("#gamingTitle").hide();
            $("#buttonsBox").hide();
            //show the player's name at the top left corner
            $("body").append(
              "<div id='playerNameBox'>Player: " +
                $("#enterPlayerName").val() +
                "</div>"
            );
            //show the ects, the hearts & time at the top right corner
            $("body").append(
              "<table id='eth'><tr><td>ECTS</td><td>TIME</td><td>HEARTS</td></tr><tr><td id='ectsText'>" +
                ects +
                "</td><td id='showTimeLeft'></td><td><span id='heartsBox'></span></td></tr></table>"
            );
            //show the finish button at the bottom right corner
            $("body").append("<button id='finish'>Finish</button>");
            //if you click on finish the game will be done
            $(document).on("click", "#finish", function () {
              clearInterval(gameTimer);
              clearInterval(gameBubble);
              window.location.reload();
            });
            //create the 3 hearts will a for loop
            for (s = 0; s < 3; s++) {
              var heart = document.createElement("span");
              heart.innerHTML = "&hearts;";
              heart.classList.add("heart");
              document.getElementById("heartsBox").appendChild(heart);
            }
            setInterval(gameBubble, 1000);
            // this timer is used for the game
            var gameTimer = setInterval(function () {
              //decrease the value of the game time
              gameTime--;
              //if the game time is equal to 0 and you have less then 30 ects
              if (gameTime == 0 && ects < 30) {
                //set ects, game time to 0 & stop the game by setting stop game atv true
                ects = 0;
                gameTime = 0;
                stopGame = true;
                clearInterval(gameTimer);
                clearInterval(gameBubble);
                $("body").append("<button id='retry'>Retry</button>");
                $(document).on("click", "#retry", function () {
                  clearInterval(gameTimer);
                  clearInterval(gameBubble);
                  retry();
                });
              }
              //if you have 30 ects, then you have passed the 1st semester and you can move on to the second semester
              if (ects == 30) {
                //set ects at 0 and the stop the function for the for the first semester bubbles
                ects = 0;
                stopGame = true;
                clearInterval(gameTimer);
                clearInterval(gameBubble);
                // a button will appear where you can move on to the second semester by clicking on the button
                $("body").append(
                  "<div id='wonBox'><button id='gtSemester2'>go to semester 2</button></div>"
                );
                $(document).on("click", "#gtSemester2", function () {
                  $(document).trigger("goToSemester2");
                });
              }
              $("#showTimeLeft").text(gameTime);
            }, 1000);
          } else {
            document.getElementById("intro").innerHTML = time;
          }
          time--;
        }, 1000);
        //show the description
        $("body").append(
          "<div id='descriptionBox'><p id='memorizeText'>Try to memorize those colors in the next <span id='intro'>20</span> seconds</p><h1>1st Semester: </h1><div id='courseBox'><div class='course' style='border: 3px solid red;'>Mathe discrète 1</div><div class='course' style='border: 3px solid blue;'>Statistique 1</div><div class='course' style='border: 3px solid green;'>Calculus</div><div class='course' style='border: 3px solid yellow;'>Programming 1</div><div class='course' style='border: 3px solid orange;'>Intro à l'informatque</div><div class='course' style='border: 3px solid purple;'>Operating System 1</div><br><button id='skip'>Skip</button></div>"
        );
        //if you click on skip, then you can start playing the game directly
        $("#skip").click(function () {
          skip = true;
          time = 1;
          $("#descriptionBox").hide();
          $("#gamingTitle").hide();
          $("#buttonsBox").hide();
        });
      }
    });
  });
});
//retry function
function retry() {
  stopGame = false;
  ects = 0;
  numberOfHearts = 3;
  gameTime = 60;
  $("#retry").hide();
  setInterval(gameBubble, 1000);
}
