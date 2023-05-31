// set the timer for the second semester on 60 seconds
var semester2Timer = 60;

$(document).ready(function() {
    //now you are on the second semester
    $("#descriptionBox2").remove();
    $(document).on("goToSemester2", function() {
        //hide or remove some elements
        $("#gtSemester2").hide();
        $("#playerNameBox").hide();
        $("#eth").remove();
        $( "#finish" ).remove();
        //define some new variables
        var ects2 = 0;
        var skip2 = false;
        var time2 = 25;
        //get the playername with the session
        var playerName = sessionStorage.getItem("playername");
        //show the 2nd semester description

        $("body").append(
            "<div id='descriptionBox2'><p id='memorizeText'>Try to memorize those colors in the next <span id='intro2'>20</span> seconds</p><h1>2nd Semester: </h1><div id='courseBox'><div class='course2' style='border: 3px solid #800000;'>Mathe discrète 2</div><div class='course2' style='border: 3px solid #00FFFF;'>Programming 2</div><div class='course2' style='border: 3px solid wheat;'>Linear Algebra</div><div class='course2' style='border: 3px solid #FFD700;'>Real World Data Aq.</div><div class='course2' style='border: 3px solid salmon;'>Technical English 2</div><div class='course2' style='border: 3px solid #FF00e6;'>Introduction to Graphics</div><div class='course2' style='border: 3px solid #A6F5AA;'>Algorithmns 1</div><div class='course2' style='border: 3px solid #B5A6F5;'>Gestion de projects</div><br><button id='skip'>Skip</button></div>"
        );
        //by clicking on the skip button you can start playing the game
        $("#skip").click(function() {
            skip2 = true;
            time2 = 1;
            $("#descriptionBox2").remove();
            $("#gamingTitle").hide();
            $("#buttonsBox").hide();
        });
        var intro2 = setInterval(function() {
            //if the time for the second semester intro is 0
            if (time2 <= 0) {
                clearInterval(intro2);
                var intro2Element = document.getElementById("intro2");
                //check if the elements exist and then use the .innerHTML to write the time down
                if (intro2Element) {
                    intro2Element.innerHTML = time2;
                }
                $("#descriptionBox2").hide();
                //show the already existing player's name
                $("body").append(
                    "<div id='playerNameBox2'>Player: " + playerName + "</div>"
                );
                //show his ects, hearts & time
                $("body").append(
                    "<table id='eth2'><tr><td>ECTS</td><td>TIME</td><td>HEARTS</td></tr><tr><td id='ectsText'>" +
                    ects2 +
                    "</td><td id='showTimeLeft'></td><td><span id='heartsBox'></span></td></tr></table>"
                );
                //show the finish button
                $("body").append("<button id='finish'>Finish</button>");
                //by clicking on the finish button then the game will be done
                $(document).on("click", "#finish", function() {
                    clearInterval(gameTimer);
                    clearInterval(gameBubble);
                    window.location.reload();
                });
                //add the hearts
                for (s = 0; s < 3; s++) {
                    var heart = document.createElement("span");
                    heart.innerHTML = "&hearts;";
                    heart.classList.add("heart");
                    var heartsBox = document.getElementById("heartsBox");
                    if (heartsBox) {
                        heartsBox.appendChild(heart);
                    }
                }
                setInterval(g2, 700);
                var gameTimer2 = setInterval(function() {
                    //decrease the timer for the second semester
                    semester2Timer--;
                    // if the time is 0 and you did not got 30 ects, then you have failed the second semester
                    if (semester2Timer == 0 && ects2 < 30) {
                        //show a alert
                        alert("GAME OVER! YOU DID NOT PASS THE 2ND SEMESTER!");
                        //set ects & the timer back to 0
                        ects2 = 0;
                        semester2Timer = 0;
                        stopGame = true;
                        clearInterval(gameTimer2);
                        clearInterval(gameBubble2);
                        $("body").append("<button id='retry'>Retry</button>");
                        $(document).on("click", "#retry", function() {
                            clearInterval(gameTimer2);
                            clearInterval(gameBubble2);
                            retry();
                        });
                    }
                    //if you have 30 ects, then you have passed the second semester
                    if (ects2 == 30) {
                        semester2Timer = 0;
                        stopGame2 = true;
                        //alert
                        alert("You have passed both semesters!");
                        clearInterval(gameTimer2);
                        clearInterval(g2);
                        $(document).trigger("buttonClicked");
                        $("body").append(
                            "<div id='wonBox'><button id='gtSemester2'>go to semester 2</button></div>"
                        );
                    }
                    $("#showTimeLeft").text(semester2Timer);
                }, 1000);
            } else {
                var intro2Element = document.getElementById("intro2");
                if (intro2Element) {
                    intro2Element.innerHTML = time2;
                }
            }
            time2--;
        }, 1000);
        

    });
});




