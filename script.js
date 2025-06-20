var homeScreen = document.querySelector(".homeScreen");
var menuScreen = document.querySelector(".menuScreen");
var jumpingGameScreen = document.querySelector(".jumpingGameScreen");
var collectingGameScreen = document.querySelector(".collectingGameScreen");
var clickDragGameScreen = document.querySelector(".clickDragGameScreen");
var outfitGameScreen = document.querySelector(".outfitGameScreen");
var winScreen = document.querySelector(".winScreen");
var instructionsScreen = document.querySelector(".instructionsScreen");
var jumpingCharacter = document.getElementById("jumpingCharacter");
var jumpingObstacle1 = document.getElementById("jumpingObstacle1");

var collectingCharacter = document.getElementById("collectingCharacter");
var collectingObstacle1 = document.getElementById("collectingObstacle1");
var ingredientList = ["https://kwong09.github.io/puppy-party/assets/eggIngredient.png", "https://kwong09.github.io/puppy-party/assets/flourIngredient.png", "https://kwong09.github.io/puppy-party/assets/milkIngredient.png", "https://kwong09.github.io/puppy-party/assets/saltIngredient.png", "https://kwong09.github.io/puppy-party/assets/butterIngredient.png"];
var ingredientOrder = 0;

let giftOrder = 0;

var hatRight = document.getElementById("hatRight");
var hatLeft = document.getElementById("hatLeft");
var hatSelection = document.getElementById("hatSelection");
let hatList = ["blank0", "hat1", "hat2", "hat3"];
let hatOrder = 1;

var outfitRight = document.getElementById("outfitRight");
var outfitLeft = document.getElementById("outfitLeft");
var outfitSelection = document.getElementById("outfitSelection");
let outfitList = ["blank0", "shirt1", "shirt2", "shirt3"];
let outfitOrder = 1;

var screen, jumpingTimer = 0, collectingScore = 0;


function invisible(screen) {
    screen.style.display = "none";
}


var jumpingStartButton = document.getElementById("jumpingStartButton");
var collectingStartButton = document.getElementById("collectingStartButton");
var outfitStartButton = document.getElementById("outfitStartButton");
var giftStartButton = document.getElementById("giftStartButton");
var nextButton = document.getElementById("nextButton");
let completedGames = 0;
let currentGame = "bobross";

jumpingStartButton.addEventListener('click', () => {
    instructionsScreen.style.backgroundImage = 'url(https://kwong09.github.io/puppy-party/assets/jumpingInstructions.png)';
    currentGame = "jumping game";
    winScreen.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/endScreen.png')";
    invisible(menuScreen);
    invisible(menuButton);
    visible(instructionsScreen);
})

collectingStartButton.addEventListener('click', () => {
    instructionsScreen.style.backgroundImage = 'url(https://kwong09.github.io/puppy-party/assets/collectingInstructions.png)';
    currentGame = "collecting game";
    winScreen.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/winCake.png')";
    invisible(menuScreen);
    visible(instructionsScreen);
})

outfitStartButton.addEventListener('click', () => {
    instructionsScreen.style.backgroundImage = 'url(https://kwong09.github.io/puppy-party/assets/outfitInstructions.png)';
    currentGame = "outfit game";
    winScreen.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/winOutfit.png')";
    invisible(menuScreen);
    visible(instructionsScreen);
})

giftStartButton.addEventListener('click', () => {
    instructionsScreen.style.backgroundImage = 'url(https://kwong09.github.io/puppy-party/assets/giftInstructions.png)';
    currentGame = "gift game";
    winScreen.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/winGift.png')";
    invisible(menuScreen);
    visible(instructionsScreen);
})

nextButton.addEventListener('click', () => {
    invisible(instructionsScreen);
    if (currentGame === "jumping game") {
        visible(jumpingGameScreen);
    };
    if (currentGame === "outfit game") {
        visible(outfitGameScreen);
    };
    if (currentGame === "collecting game") {
        visible(collectingGameScreen);
    };
    if (currentGame === "gift game") {
        visible(clickDragGameScreen);
    };
})

function visible(screen) {
    screen.style.display = "block";

    if (giftStartButton.src.endsWith("giftUnlock.png") && collectingStartButton.src.endsWith("cakeUnlock.png") && outfitStartButton.src.endsWith("outfitUnlock.png")) {
        jumpingStartButton.style.display = 'block';
    }
            

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
            alert("Try again! Sorry, this game is a little buggy, so you have to jump as SOON as you get close to the poison ivy!");
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
            completedGames++;

            clearInterval(jumpingPoints);
            invisible(jumpingGameScreen);
            visible(winScreen);
        }
        }, 10);
    }

    if (screen.classList.contains("collectingGameScreen")) {

        collectingObstacle1.addEventListener("animationiteration", () => {
            let randomLocation = Math.floor(Math.random() * (700 - 10 + 1)) + 10;

            collectingObstacle1.style.left = `${randomLocation}px`;

            if (ingredientOrder>4) {
                ingredientOrder = 0;
                let ingredientImage = ingredientList[ingredientOrder];
                collectingObstacle1.style.backgroundImage = 'url(' + ingredientImage + ')'
            } else {
                ingredientOrder++;
                let ingredientImage = ingredientList[ingredientOrder];
                collectingObstacle1.style.backgroundImage = 'url(' + ingredientImage + ')'
            }
        });

        var collectingInterval = setInterval(function() {
            let collectingObstacleTop = parseInt(window.getComputedStyle(collectingObstacle1).getPropertyValue("top"));
            let collectingObstacleLeft = parseInt(window.getComputedStyle(collectingObstacle1).getPropertyValue("left"));
            let collectingCharacterLeft = parseInt(window.getComputedStyle(collectingCharacter).getPropertyValue("left"));


            if (collectingObstacleTop >= 250 && collectingObstacleTop <= 500
                && collectingObstacleLeft > collectingCharacterLeft - 60
                && collectingObstacleLeft < collectingCharacterLeft + 90) {
                collectingScore++;
                collectingObstacle1.style.animation = 'none';
                collectingObstacle1.offsetHeight;
                collectingObstacle1.style.animation = 'collectingObstacleAni 1.5s infinite linear';
                
                let randomLocation = Math.floor(Math.random() * (700 - 10 + 1)) + 10;

                collectingObstacle1.style.left = `${randomLocation}px`;

                document.getElementById("collectingGameScore").innerHTML = collectingScore;

                if (ingredientOrder>=4) {
                    ingredientOrder = 0;
                    let ingredientImage = ingredientList[ingredientOrder];
                    collectingObstacle1.style.backgroundImage = 'url(' + ingredientImage + ')'
                } else {
                    ingredientOrder++;
                    let ingredientImage = ingredientList[ingredientOrder];
                    collectingObstacle1.style.backgroundImage = 'url(' + ingredientImage + ')'
                }
            }

            if (collectingScore >= 15) {
                completedGames++;
                collectingStartButton.src = "https://kwong09.github.io/puppy-party/assets/cakeUnlock.png";

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

        if (giftOrder === 0) {
            draggingItem(giftItem1);
        }

        if (giftOrder > 4) {
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

        var giftList = ["giftBox1", "giftBox2", "giftBox3", "giftBox4", "giftBox5", "giftBox6"];

        if (isDragging){
            giftItem.style.top = (k.clientY - 130) + "px"
            giftItem.style.left = (k.clientX - 350) + "px"
            
            if (giftItemBoundary.left < giftBasketBoundary.right &&
                giftItemBoundary.right > giftBasketBoundary.left &&
                giftItemBoundary.top < giftBasketBoundary.bottom &&
                giftItemBoundary.bottom > giftBasketBoundary.top) {
                invisible(giftItem);
                giftOrder++;
                giftBasket.style.backgroundImage = "url(https://kwong09.github.io/puppy-party/assets/" + giftList[giftOrder] + ".png)";


                if (giftOrder === 1) {
                    giftItem2.style.cursor = "grab";
                    draggingItem(giftItem2);
                }
                if (giftOrder === 2) {
                    giftItem3.style.cursor = "grab";
                    draggingItem(giftItem3);
                }
                if (giftOrder === 3) {
                    giftItem4.style.cursor = "grab";
                    draggingItem(giftItem4);
                }
                if (giftOrder === 4) {
                    giftItem5.style.cursor = "grab";
                    draggingItem(giftItem5);
                }

                if (giftOrder > 4) {
                    setTimeout(() => {
                        completedGames++;
                        giftStartButton.src = "https://kwong09.github.io/puppy-party/assets/giftUnlock.png";

                        invisible(clickDragGameScreen);
                        visible(winScreen);
                    }, 2000);
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
            let outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + outfitSelected + ".png')";
        } else {
            outfitOrder++;
            let outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + outfitSelected + ".png')";
        }
    }

    if (button === "outfitLeft") {
        if (outfitOrder <= 0) {
            outfitOrder = 3;
            let outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + outfitSelected + ".png')";
        } else {
            outfitOrder--;
            let outfitSelected = outfitList[outfitOrder];
            outfitSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + outfitSelected + ".png')";
        }
    }

    if (button === "hatRight") {
        if (hatOrder >= 3) {
            hatOrder = 0;
            let hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + hatSelected + ".png')";
        } else {
            hatOrder++;
            let hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + hatSelected + ".png')";
        }
    }

    if (button === "hatLeft") {
        if (hatOrder <= 0) {
            hatOrder = 3;
            let hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + hatSelected + ".png')";
        } else {
            hatOrder--;
            let hatSelected = hatList[hatOrder];
            hatSelection.style.backgroundImage = "url('https://kwong09.github.io/puppy-party/assets/" + hatSelected + ".png')";
        }
    }
};