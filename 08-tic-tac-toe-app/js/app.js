(function () {
    'use strict';

    var ai, player, first, next, turn, count = 0, aiToGo = false, winner;
    var topModal = document.getElementById('top-modal');
    var bottomModal = document.getElementById('bottom-modal');
    var playAgainBtn = document.getElementById('play');
    var messageElmOne = document.getElementById('message-one');
    var messageElmTwo = document.getElementById('message-two');
    var markers = document.getElementsByClassName('mark');
    for (var i = 0; i < markers.length; i++) {
        markers[i].addEventListener('click', playGame, false);
    }

    var circles = document.getElementsByClassName('circle');
    for (var j = 0; j < circles.length; j++) {
        circles[j].addEventListener('click', addMarker, false);
    }

    playAgainBtn.addEventListener('click', goAgain, false);

    // start game
    init();

    function init() {
        showTopModal();
    }

    function switchTurn() {
        console.log(count);
        console.log(count);

        if (checkForWin()) {
            if (player == winner) {
                showBottomModal('YOU WON', 'Congratulations');
            } else {
                showBottomModal('YOU LOSE', 'Better luck next time')
            }
            count = 0;
        } else if(count == 9) {
            showBottomModal('IT\'S A DRAW', 'Better luck next time');
            count = 0;
        } else {
            if (aiToGo) aiMove();
        }
    }

    function addMarker(e) {
        if (!aiToGo) {
            count++;
            var circleClasses = e.target.classList;
            if (!circleClasses.contains('fa-joomla') && !circleClasses.contains('fa-meetup')) {
                if (player == 'x') {
                    circleClasses.add('fa-joomla');
                } else {
                    circleClasses.add('fa-meetup');
                }
                aiToGo = true;
                switchTurn();
            }
        }
    }

    function checkForWin() {
        return (checkRow(circles[0], circles[1], circles[2]) ||
            checkRow(circles[3], circles[4], circles[5]) ||
            checkRow(circles[6], circles[7], circles[8]) ||
            checkRow(circles[0], circles[3], circles[6]) ||
            checkRow(circles[1], circles[4], circles[7]) ||
            checkRow(circles[2], circles[5], circles[8]) ||
            checkRow(circles[0], circles[4], circles[8]) ||
            checkRow(circles[2], circles[4], circles[6]))
    }

    function checkRow(a, b, c) {
        var aClasses = a.firstChild.classList, bClasses = b.firstChild.classList, cClasses = c.firstChild.classList;
        if (aClasses.contains('fa-meetup') && bClasses.contains('fa-meetup') && cClasses.contains('fa-meetup')) {
            winner = 'o';
            return true;
        } else if ( aClasses.contains('fa-joomla') && bClasses.contains('fa-joomla') && cClasses.contains('fa-joomla')) {
            winner = 'x';
            return true;
        }
        return false;
    }

    function checkTwoElements(a, b) {
        var aClasses = a.firstChild.classList;
        var bClasses = b.firstChild.classList;
        return (aClasses.contains('fa-meetup') && bClasses.contains('fa-meetup') ||
            aClasses.contains('fa-joomla') && bClasses.contains('fa-joomla'))
    }

    function checkSingleElement(a) {
        var aClasses = a.firstChild.classList;
        return (!aClasses.contains('fa-meetup') && !aClasses.contains('fa-joomla'))
    }

    function setClass(a, ai) {
        var classList = a.firstChild.classList;
        var val = (ai == 'x') ? 'fa-joomla' : 'fa-meetup';
        classList.add(val);
        count++;
        console.log(count);
        aiToGo = false;
    }

    function aiMove() {
        if (checkSingleElement(circles[0]) &&
            (checkTwoElements(circles[1], circles[2]) || checkTwoElements(circles[4], circles[8]) || checkTwoElements(circles[3], circles[6]))) {
            setClass(circles[0], ai);
        }
        else if (checkSingleElement(circles[1]) &&
            (checkTwoElements(circles[0], circles[2]) || checkTwoElements(circles[1], circles[4]))) {
            setClass(circles[1], ai);
        }
        else if (checkSingleElement(circles[2]) &&
            (checkTwoElements(circles[0], circles[1]) || checkTwoElements(circles[5], circles[8]) || checkTwoElements(circles[4], circles[7]))) {
            setClass(circles[2], ai);
        }
        else if (checkSingleElement(circles[3]) &&
            (checkTwoElements(circles[0], circles[6]) || checkTwoElements(circles[4], circles[5]))) {
            setClass(circles[3], ai);
        }
        else if (checkSingleElement(circles[4]) &&
            (checkTwoElements(circles[0], circles[8]) || checkTwoElements(circles[2], circles[6]) || checkTwoElements(circles[3], circles[5]) || checkTwoElements(circles[1], circles[7]))) {
            setClass(circles[4], ai);
        }
        else if (checkSingleElement(circles[5]) &&
            (checkTwoElements(circles[2], circles[8]) || checkTwoElements(circles[3], circles[4]))) {
            setClass(circles[5], ai);
        }
        else if (checkSingleElement(circles[6]) &&
            (checkTwoElements(circles[0], circles[3]) || checkTwoElements(circles[2], circles[4]) || checkTwoElements(circles[7], circles[8]))) {
            setClass(circles[6], ai);
        }
        else if (checkSingleElement(circles[7]) &&
            (checkTwoElements(circles[1], circles[4]) || checkTwoElements(circles[6], circles[8]))) {
            setClass(circles[7], ai);
        }
        else if (checkSingleElement(circles[8]) &&
            (checkTwoElements(circles[0], circles[4]) || checkTwoElements(circles[2], circles[5]) || checkTwoElements(circles[6], circles[7]))) {
            setClass(circles[8], ai);
        }
        else if (checkSingleElement(circles[4])) {
            setClass(circles[4], ai);
        }
        else if (checkSingleElement(circles[0])) {
            setClass(circles[0], ai);
        }
        else if (checkSingleElement(circles[2])) {
            setClass(circles[2], ai);
        }
        else if (checkSingleElement(circles[6])) {
            setClass(circles[6], ai);
        }
        else if (checkSingleElement(circles[8])) {
            setClass(circles[8], ai);
        }
        else if (checkSingleElement(circles[1])) {
            setClass(circles[1], ai);
        }
        else if (checkSingleElement(circles[3])) {
            setClass(circles[3], ai);
        }
        else if (checkSingleElement(circles[5])) {
            setClass(circles[5], ai);
        }
        else if (checkSingleElement(circles[7])) {
            setClass(circles[7], ai);
        }
        switchTurn(); // check for win/draw
    }

    function clearBoard(elm) {
        var classList = elm.firstChild.classList;
        if (classList.contains('fa-meetup')) {
            classList.remove('fa-meetup');
        }
        if (classList.contains('fa-joomla')) {
            classList.remove('fa-joomla');
        }
        messageElmOne.textContent = '';
        messageElmTwo.textContent = '';
    }

    function showTopModal() {
        var topClasses = topModal.classList;
        if (!topClasses.contains('show-modal')) {
            topClasses.add('show-modal');
        }
    }

    function showBottomModal(messageOne, messageTwo) {
        var bottomClasses = bottomModal.classList;
        if (!bottomClasses.contains('show-modal')) {
            bottomClasses.add('show-modal');
            if (arguments.length > 1) {
                messageElmTwo.textContent = messageTwo;
            }
            messageElmOne.textContent = messageOne;
        }
    }

    function goAgain() {
        var bottomClasses = bottomModal.classList;
        if (bottomClasses.contains('show-modal')) {
            bottomClasses.remove('show-modal');
            for (var i = 0; i < circles.length; i++) {
                clearBoard(circles[i]);
            }
            if (aiToGo) {
                aiMove();
            }
        }
    }

    function playGame(e) {
        var icon = e.target;
        // turn = player = icon.getAttribute('data-val');
        player = icon.getAttribute('data-val');
        ai = player == 'x' ? 'o' : 'x';
        var topClasses = topModal.classList;
        if (topClasses.contains('show-modal')) {
            topClasses.remove('show-modal');
        }
        turn = firstTurn();
        if (ai == turn) {
            aiToGo = true;
            aiMove();
        }
        console.log('player: ' + player + ', ai: ' + ai + ', first turn: ' + turn);
    }

    function firstTurn() {
        var val = (Math.floor(Math.random()*2) == 0);
        return (val) ? 'x' : 'o';
    }



}());