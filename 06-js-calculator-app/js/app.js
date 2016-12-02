(function () {
    'use strict';

    var input = document.getElementById('input');
    var output = document.getElementById('output');
    var numbers = document.getElementsByClassName('number');
    var operators = document.getElementsByClassName('operator');
    var operations = document.getElementsByClassName('operation');
    var result = false;


    // bind event listeners
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', numberClick, false);
    }

    for (var j = 0; j < operators.length; j++) {
        operators[j].addEventListener('click', operatorClick, false);
    }


    for (var k = 0; k < operations.length; k++) {
        operations[k].addEventListener('click', operationClick, false);
    }

    function numberClick(e) {

        if(result == true) {
            clearOutput();
            result = false;
        }

        if (charLength(input.textContent.length)) return;

        var number = e.target;
        var value = number.getAttribute('data-val');
        clearSign();

        if (value != '.' || (value == '.' && checkForDecimal(input.textContent))) {
            updateFields(value);
        }
    }

    function operatorClick(e) {
        if (result == true) {
            clearOutput();
            result = false;
        }
        var operator = e.target;
        var value = operator.getAttribute('data-val');
        if (input.textContent.length == 0 && value == 'minus') {
            operatorOperation('-');
        } else if (input.textContent.length > 0){

            switch (value) {
                case 'plus':
                    operatorOperation('+');
                    break;
                case 'minus':
                    operatorOperation('-');
                    break;
                case 'divide':
                    operatorOperation('/');
                    break;
                case 'times':
                    operatorOperation('*');
                    break;
            }
        }
    }

    function operationClick(e) {
        var operation = e.target;
        switch (operation.getAttribute('data-val')) {
            case 'clear':
                clearCalc();
                break;
            case 'back':
                backButton();
                break;
            case 'equals':
                clearInput();
                output.textContent = math.eval(output.textContent).toPrecision(5);
                result = true;
                break;
        }

    }

    function clearCalc() {
        clearInput();
        clearOutput();
    }

    function updateFields(value) {
        setInputField(value);
        setOutputField(value);
    }
    
    function clearInput() {
        input.textContent = '';
    }

    function clearOutput() {
        output.textContent = '';
    }
    
    function setInputField(value) {
        input.textContent += value;
    }


    function setOutputField(value) {
        output.textContent += value;
    }

    function clearSign() {
        var sign = input.textContent;
        if (sign == '-' || sign == '+' || sign == '*' || sign == '/') {
            clearInput();
        }
    }

    function checkOutputField() {
        var lastChar = output.textContent.slice(-1);
        if (lastChar == '-' || lastChar == '+' || lastChar == '*' || lastChar == '/') {
            stripLastChar(output);
        }

    }

    function operatorOperation(sign) {
        clearInput();
        checkOutputField();
        updateFields(sign);
    }

    function backButton() {
        //clearInput();
        if (output.textContent.length > 0) {
            stripLastChar(output);
        }
        if (input.textContent.length > 0) {
            stripLastChar(input);
        }
    }

    function stripLastChar(field) {
        field.textContent = field.textContent.slice(0, field.textContent.length - 1);
    }

    function checkForDecimal(value) {
        return value.indexOf('.') == -1;
    }

    function charLength(value) {
        return value >= 9;
    }


}());