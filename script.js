var homeScreen = document.querySelector(".homeScreen");
var menuScreen = document.querySelector(".menuScreen");
var jumpingGameScreen = document.querySelector(".jumpingGameScreen");
var collectingGameScreen = document.querySelector(".collectingGameScreen");
var clickDragGameScreen = document.querySelector(".clickDragGameScreen");
var outfitGameScreen = document.querySelector(".outfitGameScreen");
var winScreen = document.querySelector(".winScreen");
var jumpingCharacter = document.getElementById("jumpingCharacter");
var jumpingObstacle1 = document.getElementById("jumpingObstacle1");

var collectingCharacter = document.getElementById("collectingCharacter");
var collectingObstacle1 = document.getElementById("collectingObstacle1");

var giftOrder = 1;

var hatRight = document.getElementById("hatRight");
var hatLeft = document.getElementById("hatLeft");
var hatSelection = document.getElementById("hatSelection");
let hatList = ["floralwhite", "blue", "pink", "red"];
let hatOrder = 0;

var outfitRight = document.getElementById("outfitRight");
var outfitLeft = document.getElementById("outfitLeft");
var outfitSelection = document.getElementById("outfitSelection");
let outfitList = ["floralwhite", "blue", "pink", "red"];
let outfitOrder = 0;

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

        document.addEventListener("keydown", (k) => {
            if (k.key === "ArrowUp") {
                jumpingCharacterAni(jumpingCharacter)
            }
        })

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


            if (collectingObstacleTop >= 320 && collectingObstacleTop <= 500
                && collectingObstacleLeft > collectingCharacterLeft - 60
                && collectingObstacleLeft < collectingCharacterLeft + 90) {
                collectingScore++;
                collectingObstacle1.style.animation = 'none';
                collectingObstacle1.offsetHeight;
                collectingObstacle1.style.animation = 'collectingObstacleAni 1.5s infinite linear';
                
                let randomLocation = Math.floor(Math.random() * (700 - 10 + 1)) + 10;

                collectingObstacle1.style.left = `${randomLocation}px`;

                document.getElementById("collectingGameScore").innerHTML = collectingScore;
            }

            if (collectingScore >= 15) {
                invisible(collectingGameScreen);
                visible(winScreen);
                clearInterval(collectingInterval);
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


    if (screen.classList.contains("clickDragGameScreen")) {
        var giftItem1 = document.getElementById("giftItem1");

        if (giftOrder === 1) {
            draggingItem(giftItem1);
        }

        if (giftOrder > 5) {
            invisible(clickDragGameScreen);
            visible(winScreen);
        }

    }

    if (screen.classList.contains("outfitGameScreen")) {
        //finish code here
    }
}

function jumpingCharacterAni(character) {
    if (character.classList == "jumpingCharacterAni") {return}
    character.classList.add("jumpingCharacterAni");
    setTimeout(function() {
        character.classList.remove("jumpingCharacterAni");
    }, 500);
}


function draggingItem(giftItem) {
    var isDragging = false;

    document.addEventListener("mousedown", (k) => {
        giftItem.style.cursor = "grabbing";
        isDragging = true;
    })

    document.addEventListener("mousemove", (k) => {
        var giftBasket = document.getElementById("giftBasket");
        var giftBasketBoundary = giftBasket.getBoundingClientRect();
        var giftItemBoundary = giftItem.getBoundingClientRect();

        var giftItem2 = document.getElementById("giftItem2");
        var giftItem3 = document.getElementById("giftItem3");
        var giftItem4 = document.getElementById("giftItem4");
        var giftItem5 = document.getElementById("giftItem5");

        if (isDragging){
            giftItem.style.top = (k.clientY - 130) + "px"
            giftItem.style.left = (k.clientX - 350) + "px"
            
            if (giftItemBoundary.left < giftBasketBoundary.right &&
                giftItemBoundary.right > giftBasketBoundary.left &&
                giftItemBoundary.top < giftBasketBoundary.bottom &&
                giftItemBoundary.bottom > giftBasketBoundary.top) {
                invisible(giftItem);
                giftBasket.style.backgroundColor = "green";
                giftOrder++;


                if (giftOrder === 2) {
                    giftItem2.style.cursor = "grab";
                    draggingItem(giftItem2);
                }
                if (giftOrder === 3) {
                    giftItem3.style.cursor = "grab";
                    draggingItem(giftItem3);
                }
                if (giftOrder === 4) {
                    giftItem4.style.cursor = "grab";
                    draggingItem(giftItem4);
                }
                if (giftOrder === 5) {
                    giftItem5.style.cursor = "grab";
                    draggingItem(giftItem5);
                }

                if (giftOrder > 5) {
                    invisible(clickDragGameScreen);
                    visible(winScreen);
                }
            }
        }
    })

    document.addEventListener("mouseup", (k) => {
        giftItem.style.cursor = "grab";
        isDragging = false;
    })
}


function outfitGameButtons(button) {

    if (button === "outfitRight") {
        if (outfitOrder >= 3) {
            outfitOrder = 0;
            outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundColor = outfitSelected;
        } else {
            outfitOrder++;
            outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundColor = outfitSelected;
        }
    }

    if (button === "outfitLeft") {
        if (outfitOrder <= 0) {
            outfitOrder = 3;
            outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundColor = outfitSelected;
        } else {
            outfitOrder--;
            outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundColor = outfitSelected;
        }
    }

    if (button === "hatRight") {
        if (hatOrder >= 3) {
            hatOrder = 0;
            hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundColor = hatSelected;
        } else {
            hatOrder++;
            hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundColor = hatSelected;
        }
    }

    if (button === "hatLeft") {
        if (hatOrder <= 0) {
            hatOrder = 3;
            hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundColor = hatSelected;
        } else {
            hatOrder--;
            hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundColor = hatSelected;
        }
    }
};