var homeScreen = document.querySelector(".homeScreen");
var jumpingGameScreen = document.querySelector(".jumpingGameScreen");
var jumpingCharacter = document.getElementById("jumpingCharacter");
var screen;
function invisible(screen) {
    screen.style.display = "none";
}

function visible(screen) {
    screen.style.display = "block";
}

function jumpingCharacterAni(character) {
    if (character.classList == "jumpingCharacterAni") {return}
    character.classList.add("jumpingCharacterAni");
    setTimeout(function() {
        character.classList.remove("jumpingCharacterAni")
    }, 500);
}

var jumpingPoints = setInterval(function() {
    let jumpingCharacterTop = parseInt(window.getComputedStyle(jumpingCharacter).getPropertyValue("top"));
    let jumpingObstacle1Left = parseInt(window.getComputedStyle(jumpingObstacle1).getPropertyValue("left"));
    if (jumpingCharacterTop>=460 && jumpingObstacle1Left>=30 && jumpingObstacle1Left<=100) {
        jumpingObstacle1.style.animation = "none";
        alert("Game over.");
        jumpingObstacle1.style.animation = "jumpingObstacleAni 1.6s infinite linear";
    }
}, 10);