let operand1 = ""
let operator = ""
let operand2 = ""
let afterOperator = true
let shouldReset = false

function showInput(){
    let display = document.querySelector(".display");
    let input = document.querySelectorAll(".num, .operator, .dot")
    input.forEach((item) => {
        item.addEventListener("click", () => {
            if (shouldReset) {
                display.textContent = "";
                operand1 = "";
                operator = "";
                operand2 = "";
                afterOperator = true;
                shouldReset = false; 
            }

           if (item.classList.contains("num")){
                if (afterOperator){
                    operand1 += item.textContent
                    display.textContent = operand1
                }else {
                    operand2 += item.textContent
                    display.textContent = operand2
                }
           } else if (item.classList.contains("dot")) {
                if ((afterOperator && operand1.includes(".")) || (!afterOperator && operand2.includes("."))) {
                    return;
                }
                
                if (afterOperator) {
                    operand1 += ".";
                } else {
                    operand2 += ".";
                }
                display.textContent += ".";
            }else{
                item.style.cssText = "background-color: black; color: white"
                setTimeout(() => {
                    item.style.cssText = "";
                }, 200);           
                if (item.classList.contains("operator") && operator !== "" && operand2 !== ""){
                        operate()   
                    }
                    operator = item.textContent
                    afterOperator = false
            }
        })
    })
}

showInput()

function operate(){
    let display = document.querySelector(".display")
    if (operand1 === "" || operand2 === "" || operator === ""){
        return display.textContent = "Cannot perform operation";
    }
    operand1 = Number(operand1)
    operand2 = Number(operand2)
        switch(operator){
            case "+":
                operand1 = operand1 + operand2
                break;
            case "-":
                operand1 = operand1 - operand2
                break;
            case "*":
            case "\u00D7":
                operand1 = operand1 * operand2
                break;
            case "/":
            case "\u00F7":
                if (operand2 === 0){
                    display.textContent = "MATHEMATICAL ERROR"
                    operand1 = ""
                    operator = ""
                    operand2 = ""
                    afterOperator = true
                    return;
                }
                operand1 = operand1 / operand2
                break;
        }
        if (!Number.isInteger(operand1)){
            operand1 = operand1.toFixed(2)
        }else{
            operand1 = operand1.toString()
        }
        display.textContent = operand1
        operand2 = ""
        afterOperator = true
}

let equalTo = document.querySelector(".equalTo")
equalTo.addEventListener("click", () => {
    operate()
    shouldReset = true
})

let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    let display = document.querySelector(".display")
    display.textContent = ""
    operand1 = ""
    operator = ""
    operand2 = ""
    afterOperator = true
})

let del = document.querySelector(".delete");
del.addEventListener("click", () => {
    let display = document.querySelector(".display")
    if (operator === ""){
        operand1 = operand1.toString().slice(0, -1)
        display.textContent = operand1
    }else if (operand2 === "" && operator !== ""){
        operator = ""
        display.textContent = operand1
        afterOperator = true
    }else{
        operand2 = operand2.toString().slice(0, -1)
        display.textContent = operand2
    }
    shouldReset = false
})

let keyboardOperands = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let keyboardOperators = ["+", "-", "*", "/"];

function keyboardInput() {
    let display = document.querySelector(".display");
    document.addEventListener("keydown", (event) => {
        if ((keyboardOperands.includes(event.key) || keyboardOperators.includes(event.key)) && shouldReset) {
            display.textContent = "";
            operand1 = "";
            operator = "";
            operand2 = "";
            afterOperator = true;
            shouldReset = false; 
        }  
        if (keyboardOperands.includes(event.key)) {
            if (operator === "") {
                operand1 += event.key;
                display.textContent = operand1;
            } else {
                operand2 += event.key;
                display.textContent = operand2;
            }
        } else if (keyboardOperators.includes(event.key) && operand1 !== "") {
            if ( keyboardOperators.includes(event.key) && operator !== "" && operand2 !== ""){
                operate()
                shouldReset = true
            }
            operator = event.key;
            afterOperator = false;
        } else if (event.key === "=" && operand2 !== "" && operand1 !== "") {
            operate();
            shouldReset = true
        } 
    });
}

keyboardInput();
