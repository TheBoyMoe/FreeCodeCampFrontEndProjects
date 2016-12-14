(function () {
    'use strict';

    var gameSequence = [], round = 0, count = 0, strictMode = false,
        playing = false, currentPanel = -1;
    const maxRounds = 5;
    var panels = document.getElementsByClassName('panel'),
        start = document.getElementById('start'),
        reset = document.getElementById('reset'),
        strict = document.getElementById('strict'),
        display = document.getElementById('display'),
        sound0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
        error = new Audio('https://dl.dropboxusercontent.com/u/18365465/englishhorn.mp3');


    // add eventListeners
    start.addEventListener('click', startGame, false);
    reset.addEventListener('click', resetGame, false);
    strict.addEventListener('click', mode, false);

    for (var i = 0; i < panels.length; i++) {
        panels[i].addEventListener('click', panelClick, false);
    }

    function panelClick(e) {
        var elm = e.target;
        currentPanel = elm.getAttribute('data-val');
        highLightPanel(currentPanel);
        lowLightPanel(currentPanel);
        compareSequences();
    }

    function compareSequences() {
        if (playing) {
            if (!strictMode) {
                if (currentPanel != gameSequence[round]) {
                    panelClickWrong();
                    playItAgain();
                } else {
                    panelClickCorrect();
                }
                if (round >= gameSequence.length) {
                    sequenceMatch(); // play another round
                }
            } else {
                if (currentPanel != gameSequence[round]) {
                    panelClickWrong();
                    window.setTimeout(function () {
                        startGame();
                    }, 500);
                } else {
                    panelClickCorrect();
                }
                if (round >= gameSequence.length) {
                    sequenceMatch(); // play another round
                }
            }
        } else {
            playSounds(currentPanel);
        }
    }

    function panelClickCorrect() {
        playSounds(currentPanel);
        round++;
    }

    function panelClickWrong() {
        playSound(error);
        display.textContent = '! !';
    }

    function sequenceMatch() {
        window.setTimeout(function () {
            count++;
            updateDisplay();
            if (count == maxRounds) {
                weHaveAWinner();
            } else {
                round = 0;
                addToGameSequence(panelSelection);
                playSequence(gameSequence);
            }
        }, 500);
    }

    function playItAgain() {
        window.setTimeout(function () {
            round = 0;
            updateDisplay();
            playSequence(gameSequence);
        }, 500);
    }

    function startGame() {
        resetGame();
        playing = true;
        addToGameSequence(panelSelection);
        playSequence(gameSequence);
    }

    function resetGame() {
        console.log('reset game');
        playing = false;
        gameSequence = [];
        round = 0;
        count = 0;
        currentPanel = -1;
        updateDisplay();
    }

    function weHaveAWinner() {
        window.setTimeout(function () {
            alert('You won. You reached ' + count + ' rounds, well done!');
            console.log('we have a winner');
            resetGame();
        }, 300);
    }

    function updateDisplay() {
        display.textContent = (count < 10) ? '0' + count : '' + count;
    }

    // random num gen - pick panels
    function panelSelection() {
        return '' + Math.floor(Math.random()*4);
    }

    // save game sequence to array
    function addToGameSequence(selection) {
        gameSequence.push(selection());
    }

    // highlight selected panel in sequence
    function highLightPanel(val) {
        switch (val) {
            case '0' :
                panels[0].style.backgroundColor = '#009b00';
                break;
            case '1' :
                panels[1].style.backgroundColor = '#ff0000';
                break;
            case '2' :
                panels[2].style.backgroundColor = '#ffff00';
                break;
            case '3' :
                panels[3].style.backgroundColor = '#0000ff';
                break;
        }
    }

    // reset the panel's background color after the setTimeout
    function lowLightPanel(val) {
        window.setTimeout(function () {
            switch (val) {
                case '0' :
                    panels[0].style.backgroundColor = '';
                    break;
                case '1' :
                    panels[1].style.backgroundColor = '';
                    break;
                case '2' :
                    panels[2].style.backgroundColor = '';
                    break;
                case '3' :
                    panels[3].style.backgroundColor = '';
                    break;
            }
        }, 200);

    }

    function playSounds(val) {
        switch (val) {
            case '0':
                playSound(sound0);
                break;
            case '1':
                playSound(sound1);
                break;
            case '2':
                playSound(sound2);
                break;
            case '3':
                playSound(sound3);
                break;
        }
    }

    function playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    function playSequence(sequence) {
        // iterate through sequence, highlight panel & play sound
        console.log('req\'d sequence: ' + sequence);
        var i = 0;
        var animation = setInterval(function () {
            playSounds(sequence[i]);
            highLightPanel(sequence[i]);
            lowLightPanel(sequence[i]);
            i++;
            if (i >= sequence.length) {
                clearInterval(animation);
            }
        }, 500);
    }


    function mode() {
        if (!strictMode) {
            strictMode = true;
            strict.style.backgroundColor = '#ff6666';
        } else {
            strictMode = false;
            strict.style.backgroundColor = '#ffffff';
        }
        console.log('strict mode ' + (strictMode ? 'enabled' : 'disabled'));
        return strictMode;
    }


}());