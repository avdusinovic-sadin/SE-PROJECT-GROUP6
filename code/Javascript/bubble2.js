//define stopGame to stop the game by setting the value later on true, at the beginning it is at false & define the ects points & number of hearts
var stopGame2 = false;
var ects2 = 0;
var numberOfHearts = 3;

function g2() {
    if (stopGame2 == true) {
        return;
    }
    //define the size of the bubbles , a random number, the probability & the course colors for this semester
    var random = Math.random();
    var size = 100;
    var courses = ["#800000", "#00FFFF", "wheat", "#FFD700", "salmon", "#FF00e6", "#A6F5AA", "#B5A6F5"];
    var different = ["pink", "white"];
    var probability = 0.65;
    var color;
    
    //check if the probabilty is bigger then the random number
    if (probability > random) {
        color = courses[Math.floor(Math.random() * courses.length)];
    } else {
        color = different[Math.floor(Math.random() * different.length)];
    }

    //create the gaming bubbles
    var gameBubble = document.createElement("div");
    gameBubble.classList.add("gameBubbles2");
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
            sessionStorage.setItem("ects2", ects2);
            //add one ects
            ects2++;
            text.style.color = "lightgreen";
            text.innerHTML = "+1";
            document.body.appendChild(text);
        } else {
            //remove 1 heart
            numberOfHearts--;
            $(".heart").last().remove();
            //if you don't have any hearts left, then you will start to lose some ects
            if (numberOfHearts == 0) {
                ects2--;
                text.style.color = "red";
                text.innerHTML = "-1";
                document.body.appendChild(text);
            } else if (0 > ects2) {
                ects2 = 0;
                alert("dsad");
            }
        }
        
        //if you got 30 ects, then you have passed the 1st semester
        if (ects == 30) {
            sessionStorage.setItem("ects", ects);
          $("body").append(
            "<div id='wonBox'>Congrats! <br> You have passed the first semester. <br> You're now in the second semester!</div>"
          );
          passed = true;
        } 
        //show the ects number
        $("#ectsText").text(ects2);
    });

    //animation should last 6 s
    setTimeout(() => {
        gameBubble.remove();
    }, 6000);
}