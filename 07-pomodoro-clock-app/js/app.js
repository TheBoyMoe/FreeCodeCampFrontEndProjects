(function () {
    'use strict';

    var countDownDisplay = document.getElementById('countdown-timer'),
        startBtn = document.getElementById('start'),
        background = document.getElementById('timer'),
        message = document.getElementById('break'),
        sessionDisplay = document.getElementById('session-display'),
        sessionLength = sessionDisplay.textContent,
        breakDisplay = document.getElementById('break-display'),
        breakLength = breakDisplay.textContent,
        sessionRunning = false, breakRunning = false,
        sessionCountDown, progress, breakCountDown,
        mins, secs, progressUpdate, timer, duration,
        foghorn = new Audio('sounds/foghorn.wav'),
        shipbell = new Audio('sounds/shipbell.wav');

    startBtn.addEventListener('click', sessionTimer, false);

    // bind event listeners to +/- buttons
    var operators = document.getElementsByClassName('spinner');
    for (var i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', changeBreakSessionValue, false);
    }

    function changeBreakSessionValue(e) {
        var btn = e.target;
        var dataVal = btn.getAttribute('data-val');
        switch (dataVal) {
            case 'plus-session':
                if (sessionLength >= 1 && sessionLength < 99) {
                    sessionDisplay.textContent = ++sessionLength < 10 ? '0' + sessionLength : sessionLength;
                    updateSessionDisplay();
                }
                break;
            case 'minus-session':
                if (sessionLength > 1 && sessionLength <= 99) {
                    sessionDisplay.textContent = --sessionLength < 10 ? '0' + sessionLength : sessionLength;
                    updateSessionDisplay();
                }
                break;
            case 'plus-break':
                if (breakLength >= 1 && breakLength < 45)
                    breakDisplay.textContent = ++breakLength < 10 ? '0' + breakLength : breakLength;
                break;
            case 'minus-break':
                if (breakLength > 1 && breakLength <= 45)
                    breakDisplay.textContent = --breakLength < 10 ? '0' + breakLength : breakLength;
                break;
        }
    }


    /*
        progress bar based on
        https://www.developphp.com/video/JavaScript/
            Circular-Progress-Loader-Canvas-JavaScript-Programming-Tutorial

        countdown timer based on http://jsfiddle.net/wr1ua0db/17/

     */
    var progressbar = document.getElementById('progress-bar').getContext('2d'),
        defaultbar = document.getElementById('default-bar').getContext('2d'),
        amountLoaded = 0,
        startPoint = 4.72,
        canvasWidth = progressbar.canvas.width,
        canvasHeight = progressbar.canvas.height,
        diff;

        // draw default progress bar
        defaultbar.lineWidth = 10;
        defaultbar.strokeStyle = '#6f6f6f';
        defaultbar.beginPath();
        defaultbar.arc(100, 100, 95, 0, 2 * Math.PI, false);
        defaultbar.stroke();



    function sessionTimer() {
        duration = sessionLength * 60;
        determineProgressUpdate();
        if (!sessionRunning && !breakRunning) {
            sessionRunning = true;
            timer = duration;
            startBtn.textContent = 'STOP';
            //startArc();
            sessionCountDown = setInterval(sessionProgress, 1000);
            progress  = setInterval(progressSimulation, progressUpdate);
        } else if (sessionRunning || breakRunning){
            // stop and reset counter when clicking on stop and counter running
            reset();
        }
    }


    function breakTimer() {
        breakRunning = true;
        background.style.backgroundColor = '#8B1226';
        message.style.display = 'block';
        duration = breakLength * 60;
        determineProgressUpdate();
        timer = duration;
        //startArc();
        breakCountDown = setInterval(breakProgress, 1000);
        progress = setInterval(progressSimulation, progressUpdate);
    }


    function sessionProgress() {
        setSessionDisplay();
        if (--timer < 0) {
            foghorn.play();
            resetSessionProgress();
            resetProgressSimulation();
            breakTimer();
        }
    }

    function breakProgress() {
        setSessionDisplay();
        if (--timer < 0) {
            shipbell.play();
            resetBreakProgress();
            resetProgressSimulation();
            sessionTimer();
        }
    }


    function progressSimulation() {
        if (duration >= 1200) {
            diff = ((amountLoaded/1000) * Math.PI * 2 * 10).toFixed(2);
        }
        else if (duration >= 300) { // 5min
            diff = ((amountLoaded/500) * Math.PI * 2 * 10).toFixed(2);
        } else {
            diff = ((amountLoaded/50) * Math.PI * 2 * 10).toFixed(2);
        }
        progressbar.lineWidth = 10;
        progressbar.strokeStyle = '#FE4037';
        progressbar.beginPath();
        progressbar.arc(100, 100, 95, startPoint, diff/10 + startPoint, false);
        progressbar.stroke();
        amountLoaded++;
    }

    function determineProgressUpdate() {
        if (duration > 1200) { // 20 min
            progressUpdate = (duration * 1000)/1000;
        }
        else if (duration >= 300) { // 5min
            progressUpdate = (duration * 1000)/500;
        } else {
            progressUpdate = (duration * 1000)/50;
        }
    }


    function startArc() {
        progressbar.lineWidth = 10;
        progressbar.strokeStyle = '#FE4037';
        progressbar.beginPath();
        progressbar.arc(100, 100, 95, startPoint, startPoint + 0.02, false);
        progressbar.stroke();
    }

    function resetProgressSimulation() {
        amountLoaded = 0;
        progressbar.clearRect(0, 0, canvasWidth, canvasHeight);
        clearInterval(progress);
    }

    function resetBreakProgress() {
        breakRunning = false;
        clearInterval(breakCountDown);
        background.style.backgroundColor = '#282C31';
        message.style.display = 'none';
    }

    function resetSessionProgress() {
        sessionRunning = false;
        clearInterval(sessionCountDown);
    }

    function setSessionDisplay() {
        mins = parseInt(timer / 60, 10);
        secs =  parseInt(timer % 60, 10);
        mins = mins < 10 ? '0' + mins : mins;
        secs = secs < 10 ? '0' + secs : secs;
        countDownDisplay.textContent = mins + ':' + secs;
    }

    function updateSessionDisplay() {
        if (!sessionRunning && !breakRunning) {
            var session = sessionLength < 10 ? '0' + sessionLength : sessionLength;
            countDownDisplay.textContent = session + ':00';
        }
    }

    function reset() {
        resetSessionProgress();
        resetBreakProgress();

        timer = 0; duration = 0; progressUpdate = 0;

        // reset count down display
        var session = sessionLength;
        session = session < 10 ? '0' + session : session;
        countDownDisplay.textContent = session + ':00';
        startBtn.textContent = 'START';

        // reset progress bar
        resetProgressSimulation();
    }


}());