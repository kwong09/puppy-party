var homeScreen = document.querySelector(".homeScreen");
var menuScreen = document.querySelector(".menuScreen");
var jumpingGameScreen = document.querySelector(".jumpingGameScreen");
var collectingGameScreen = document.querySelector(".collectingGameScreen");
var winScreen = document.querySelector(".winScreen");
var jumpingCharacter = document.getElementById("jumpingCharacter");
var jumpingObstacle1 = document.getElementById("jumpingObstacle1");
var screen, jumpingTimer = 0;
function invisible(screen) {
    screen.style.display = "none";
}

function visible(screen) {
    screen.style.display = "block";

    if (screen.classList.contains("jumpingGameScreen")) {
        var jumpingPoints = setInterval(function() {
        let jumpingCharacterTop = parseInt(window.getComputedStyle(jumpingCharacter).getPropertyValue("top"));
        let jumpingObstacle1Left = parseInt(window.getComputedStyle(jumpingObstacle1).getPropertyValue("left"));
        let jumpingTimerMath = Math.floor(jumpingTimer/75);
        let jumpingCharacterBoundary = jumpingCharacter.getBoundingClientRect();
        let jumpingObstacle1Boundary = jumpingObstacle1.getBoundingClientRect();
        if (jumpingCharacterTop >= 500 && jumpingCharacterTop <= 550 && 
            jumpingObstacle1Left>=10 && jumpingObstacle1Left<=200 && jumpingTimerMath<=20) {
            jumpingObstacle1.style.animation = "none";
            jumpingTimer = 0;
            alert("Game over.");
            jumpingObstacle1.style.animation = "jumpingObstacleAni 1.2s infinite linear";
        } else if (jumpingCharacterTop<500) {
            jumpingTimer++;
            document.getElementById("jumpingGameScore").innerHTML = jumpingTimerMath;
        } else {
            jumpingTimer++;
            document.getElementById("jumpingGameScore").innerHTML = jumpingTimerMath;
        }
        if (jumpingTimerMath>20) {
            jumpingObstacle1.style.animation = "none";
            jumpingCharacter.style.animation = "none";
            clearInterval(jumpingPoints);
            invisible(jumpingGameScreen);
            visible(winScreen);
        }
        }, 10);
    }

    if (screen.classList.contains("collectingGameScreen")) {
        const collectingObstacle1 = document.getElementById("collectingObstacle1");

        addEventListener("animationiteration", () => {
            let randomLocation = Math.floor(Math.random() * (700 - 10 + 1)) + 10;

            collectingObstacle1.style.left = `${randomLocation}px`
        })
    }
}

function jumpingCharacterAni(character) {
    if (character.classList == "jumpingCharacterAni") {return}
    character.classList.add("jumpingCharacterAni");
    setTimeout(function() {
        character.classList.remove("jumpingCharacterAni");
    }, 500);
}

