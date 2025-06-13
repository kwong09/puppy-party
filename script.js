var homeScreen = document.querySelector(".homeScreen");
var jumpingGameScreen = document.querySelector(".jumpingGameScreen");
var screen;
function invisible(screen) {
    screen.classList.add("invisible");
    screen.classList.remove("visible");
}

function visible(screen) {
    screen.classList.add("visible");
    screen.classList.remove("invisible");
}