var homeScreen = document.querySelector(".homeScreen");
var menuScreen = document.querySelector(".menuScreen");
var jumpingGameScreen = document.querySelector(".jumpingGameScreen");
var collectingGameScreen = document.querySelector(".collectingGameScreen");
var winScreen = document.querySelector(".winScreen");
var jumpingCharacter = document.getElementById("jumpingCharacter");
var jumpingObstacle1 = document.getElementById("jumpingObstacle1");

var collectingCharacter = document.getElementById("collectingCharacter");
var collectingObstacle1 = document.getElementById("collectingObstacle1");


var screen, jumpingTimer = 0, collectingScore = 0;
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

        document.addEventListener("animationiteration", () => {
            let randomLocation = Math.floor(Math.random() * (700 - 10 + 1)) + 10;

            collectingObstacle1.style.left = `${randomLocation}px`;
        })
        
        var canCollect = true;

        var collectingInterval = setInterval(function() {
            let collectingObstacleTop = parseInt(window.getComputedStyle(collectingObstacle1).getPropertyValue("top"));
            let collectingObstacleLeft = parseInt(window.getComputedStyle(collectingObstacle1).getPropertyValue("left"));
            let collectingCharacterLeft = parseInt(window.getComputedStyle(collectingCharacter).getPropertyValue("left"));

            if (canCollect 
                &&collectingObstacleTop >= 320 && collectingObstacleTop <= 500
                && collectingObstacleLeft > collectingCharacterLeft - 60
                && collectingObstacleLeft < collectingCharacterLeft + 90) {

                canCollect = false;

                collectingScore++;
                collectingObstacle1.style.animation = 'none';
                collectingObstacle1.offsetHeight;
                collectingObstacle1.style.animation = 'collectingObstacleAni 1.5s infinite linear';
                
                let randomLocation = Math.floor(Math.random() * (700 - 10 + 1)) + 10;

                collectingObstacle1.style.left = `${randomLocation}px`;

                setTimeout(() => {
                    canCollect = true;
                }, 20);
            }
        }, 50);

        var moveLeftInterval = null;
        var moveRightInterval = null;
        var isMovingLeft = false;
        var isMovingRight = false;

        document.addEventListener("keydown", function(k) {
            if (k.key === "ArrowLeft" && !isMovingLeft) {
                moveLeftInterval = setInterval(function() {
                    isMovingLeft = true;
                    let collectingCharacterLeft = parseInt(window.getComputedStyle(collectingCharacter).getPropertyValue("left"));
                    if (collectingCharacterLeft > 10) {
                        collectingCharacter.style.left = `${collectingCharacterLeft - 5}px`;
                    }
                }, 10);
            }
        });

        document.addEventListener("keydown", function(k) {
            if (k.key === "ArrowRight" && !isMovingRight) {
                isMovingRight = true;
                moveRightInterval = setInterval(function() {
                    let collectingCharacterLeft = parseInt(window.getComputedStyle(collectingCharacter).getPropertyValue("left"));
                    if (collectingCharacterLeft < 700) {
                        collectingCharacter.style.left = `${collectingCharacterLeft + 5}px`;
                    }
                }, 10);
            }
        });

        document.addEventListener("keyup", function(k) {
            if (k.key === "ArrowLeft") {
                clearInterval(moveLeftInterval);
                isMovingLeft = false;
            }

            if (k.key === "ArrowRight") {
                clearInterval(moveRightInterval);
                isMovingRight = false;
            }
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

