//this code produces the bubbles which you can see at the starting page it's only been used for a animation

var stopAnimation = false;

function animationBubble() {
    if (stopAnimation == true) {
        return;
    }
    //define new divs for the bubbles
    var animation = document.querySelector("#animatedBubbles");
    var createBubble = document.createElement("div");
    //define the size of the bubbles
    var size = 100;
    var random = Math.random();
    //style of the bubbles
    createBubble.style.width = size + "px";
    createBubble.style.height = size + "px";
    createBubble.style.right = innerWidth * random + "px";
    animation.appendChild(createBubble);
    //remove the bubbles after 4 seconds animation duration
    setTimeout(() => {
        createBubble.remove();
    }, 4000);
}