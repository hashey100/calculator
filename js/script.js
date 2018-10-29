class Calculator {
    init() {
        this.input = '0';
        this.answer = '0';
        this.clearFlag = false;
        this.clickNum();
        this.getAnswer();
        this.clearAnswer();
        this.saveBtn();
    }
    clickNum() {
        //Events added to all of the digits on the calculator, when clicked it will call two functions
        const calculatorBtns = document.querySelectorAll('.calculator__values > span');
        calculatorBtns.forEach((val) => {
            val.addEventListener('click', (e) => {
                if (e.target.getAttribute('value') != null) {
                    this.calculatorChecks(e.target.innerText);
                    this.printNum(e.target.innerText, e.target.getAttribute('value'));
                }
            });
        });
    }
    printNum(num, attr) {
        //Prints the number on the screen, but checks that the user does not enter an operator multiple times like 2-- 
        const operators = ['x', '-', '+', '÷', '='];
        const answerInput = document.querySelector('.calculator__answer').innerHTML.slice(-1);
        if (operators.some(e => (num).includes(e)) && operators.some(e => (answerInput).includes(e))) {
            console.log('duplicate operator');
        } else if (num !== '') {
            document.querySelector('.calculator__answer').innerHTML += num;
            this.input += attr;
        }
    }
    getAnswer() {
        //When the equal button has been clicked it works out what's been entered into the input field
        const equalBtn = document.querySelector('.calculator__equals');
        equalBtn.addEventListener('click', (e) => {
            let newval = this.input.replace('=', '');
            this.answer = eval(newval);
            document.querySelector('.calculator__answer').innerHTML = this.answer;
            this.clearFlag = true;
        });
    }
    clearAnswer() {
        //Clears the calculator and resets all the variables
        const clearBtn = document.querySelector('.calculator__ac');
        clearBtn.addEventListener('click', (e) => {
            document.querySelector('.calculator__answer').innerHTML = '0';
            this.clearFlag = false;
            this.input = '0';
            this.answer = '0';
        });
    }
    calculatorChecks(num) {
        let answerInput = document.querySelector('.calculator__answer');
        //Check if the displayed value is 0, if so clear it
        if (answerInput.innerHTML === '0' && num >= 1 && num <= 9) {
            answerInput.innerHTML = '';
            this.input = '';
            this.answer = '';
        }
        //Check if getAnswer was clicked by user
        if (this.clearFlag === true) {
            this.input = this.answer;
            this.clearFlag = false;
        }
    }
    saveBtn() {
        //When the user clicks the save key, the function uses fetch() to send data to the PHP file
        const saveBtn = document.querySelector('.calculator__save');
        saveBtn.addEventListener('click', (e) => {
            if (this.clearFlag === true) {
                var url = 'php/fetch.php';
                fetch(url, {
                    method: "POST",
                    body: "answer=" + this.answer,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then((response) => {
                    console.log('data saved into csv')
                });
            }
        });
    }
}

const calc = new Calculator();
calc.init();