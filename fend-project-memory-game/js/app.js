/*
 * Create a list that holds all of your cards
 */
function cardList() {    
    const cards = document.querySelectorAll('ul.deck li');
    nodeArray = Array.from(cards);
    return nodeArray;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Variable initialisers
let starRating = document.querySelector(".stars");
let gameBoard = document.getElementById("game-board");
let allCards = gameBoard.getElementsByClassName("card");
let openCardList = [ 'open', 'show', 'animated', 'flip' ];
let matchedCardList = [ 'match', 'animated', 'flash'];
let moveCounter = 0;
let startTime, endTime;
let moves =  document.querySelector('.moves');
let pickedCard = [];
let timer = new easytimer.Timer();
let timeElapsed = document.getElementById("timeElapsed");
let previousCard = null;    

// Initialise the game
function initGame() {
    const ShuffledCardDeck = shuffle(cardList());
    cd = document.querySelector('ul.deck');
    // loop through each card and create its HTML
    for (const element of ShuffledCardDeck) {
        cd.appendChild(element);
    };

    // invoking the timer to get time elapsed while playing
    timer.start();
    timer.addEventListener('secondsUpdated', () =>{ timeElapsed.innerHTML = `${timer.getTimeValues().toString()}`;});
         
}

// Start game  on page load
// initGame();

// Hide matched cards
function reinitaliseCards( ElementList ) {
    for (const card of ElementList) {
        hideCard(card);
        card.classList.remove(... matchedCardList); 
        pickedCard = [];
    };
}

// Restart the game
function restart() {
  if (confirm("Are you sure that you want to restart the game?")) {
    timer.reset();
    moveCounter = 0;    
    moves.textContent = moveCounter;
    reinitaliseCards( allCards );
    initGame();
  } 
}

// Start new game after winning
function restartAfterWin() {
    timer.reset();
    starRating.innerHTML =`<li><i class="fa fa-star text-success">
                             </i><li><i class="fa fa-star text-success"></i>
                             </li> <li><i class="fa fa-star text-success"></i></li>`;      
    moveCounter = 0;    
    moves.textContent = moveCounter;
    reinitaliseCards( allCards );
}

// Display clicked cards
function displayCard () {
    updateMovesCounter();     
    this.classList.add(... openCardList);
    addToOpenListOfCards(this);
}

// if the cards do match, lock the cards in the open position 
function showMatchedCards( card1, card2) {
    card1.classList.remove(... openCardList);   
    card2.classList.remove(... openCardList);   
    card1.classList.add(... matchedCardList);   
    card2.classList.add(... matchedCardList);
}
// if the cards do not match, remove the cards from the list and hide the card's symbol
function hideCard (item) {
    item.classList.remove(... openCardList);
}

// add the card to a *list* of "open" cards
function addToOpenListOfCards(item) {
    // skip adding matched cards to the open card list
    if ( !item.classList.contains( ... matchedCardList) ) {
        // if the list already has another card, check to see if the two cards match
        if ( pickedCard.length != 0) {
            if ( previousCard.isEqualNode(item) ) {
                showMatchedCards ( item, previousCard);   
                pickedCard.push(item);
                // To display winning message and correct for added card of last match to picked card array
                if( pickedCard.length == 16) {
                    return setTimeout(matchedAll, 1000);
                }     
            } else {
                pickedCard.pop();
                hideCard(previousCard);            
            }
        }
        pickedCard.push(item);    
        previousCard = item;
    }
}

// increment the move counter and display it on the page
function updateMovesCounter() {
    moveCounter++;    
    moves.textContent = moveCounter;
    if ( moveCounter == 25 ) {
        starRating.innerHTML =`<li><i class="fa fa-star text-warning"></i></li> <li><i class="fa fa-star text-warning"></i></li>`;
    } 
    if ( moveCounter == 33 ){
        starRating.innerHTML =`<li><i class="fa fa-star text-danger"></i></li>`;
    } 
}

// Add click event listener to the cards 
for (const clickedCard of allCards) {
    clickedCard.addEventListener(  'click', displayCard );
};

// if all cards have matched, display a message with the final score
function matchedAll () {
    function generalRank (){
        if ( moveCounter < 25 ) {
            return "You are a 3 star general!";
        } else if ( moveCounter > 24 && moveCounter < 33 ){
            return "You are a 2 star general!";            
        } else {
            return "You are a 1 star general!";
        }
    }
    $('#exampleModalCenter').modal('show');
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = ` Congratulations!!!! <br>
                                        Time Elapsed: <br>
                                        ${timer.getTotalTimeValues().minutes} Minutes : ${timer.getTotalTimeValues().seconds} Seconds <br>
                                        Total moves = ${moveCounter} <br>
                                        ${generalRank()}`;
    timer.stop();
    setTimeout( restartAfterWin, 1000);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
