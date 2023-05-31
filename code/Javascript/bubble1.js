//define stopGame to stop the game by setting the value later on true, at the beginning it is at false & define the ects points & number of hearts
var stopGame = false;
var ects = 0;
var numberOfHearts = 3;

function gameBubble() {
    if (stopGame == true) {
        return;
    }

    //define some variables for a random number, size & probability
    //define some arrays for the course colors & different colors
    var random = Math.random();
    var size = 100;
    var courses = ["red", "blue", "green", "yellow", "orange", "purple"];
    var different = ["pink", "white"];
    var probability = 0.65;
    var color;

    //check if the probability is bigger than a random number
    if (probability > random) {
        color = courses[Math.floor(Math.random() * courses.length)];
    } else {
        color = different[Math.floor(Math.random() * different.length)];
    }

    //create the gaming bubbles
    var gameBubble = document.createElement("div");
    gameBubble.classList.add("gameBubbles");
    gameBubble.style.width = size + "px";
    gameBubble.style.height = size + "px";
    gameBubble.style.border = "3px solid " + color;
    gameBubble.style.right = innerWidth * random + "px";
    document.body.appendChild(gameBubble);

    //after a click on a gaming bubble
    gameBubble.addEventListener("click", () => {
        //remove the text after 1 s
        setTimeout(() => {
            text.remove();
        }, 1000);
        //remove the bubble after 100 ms
        setTimeout(() => {
            gameBubble.remove();
        }, 100);

        //create the +1 or -1 text
        var text = document.createElement("div");
        text.classList.add("clickedText");
        text.style.top = gameBubble.offsetTop + "px";
        text.style.left = gameBubble.offsetLeft + "px";

        //check if the clicked bubble is part of the courses array or different array
        if (courses.includes(color)) {
            //add 1 ects
            ects++;
            sessionStorage.setItem("ects", ects);
            text.style.color = "lightgreen";
            text.innerHTML = "+1";
            document.body.appendChild(text);
        } else {
            //remove 1 heart
            numberOfHearts--;
            $(".heart").last().remove();
            //if you don't have any hearts left, then you will start to lose some ects
            if (numberOfHearts == 0) {
                if (0 > ects) {
                    alert("GAME OVER!");
                    window.location.reload();
                } else {
                    //remove one ects
                    ects--;
                    text.style.color = "red";
                    text.innerHTML = "-1";
                    document.body.appendChild(text);
                }
            } else if (0 > ects) {
                ects = 0;
            }                        
        }
        //show the ects number
        $("#ectsText").text(ects);
    });

    //animation should last 6 s
    setTimeout(() => {
        gameBubble.remove();
    }, 6000);
}