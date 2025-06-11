// 计算器状态变量
let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

// 更新显示
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue;
}

// 初始化显示
updateDisplay();

// 添加数字到显示
function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        displayValue = value;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? value : displayValue + value;
    }
    
    updateDisplay();
}

// 清除显示
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}

// 处理操作符
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand !== null && operator !== null) {
        calculate();
    }
    
    firstOperand = inputValue;
    operator = nextOperator;
    waitingForSecondOperand = true;
}

// 执行计算
function calculate() {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null || isNaN(inputValue)) {
        return;
    }
    
    let result = 0;
    switch (operator) {
        case '+':
            result = firstOperand + inputValue;
            break;
        case '-':
            result = firstOperand - inputValue;
            break;
        case '*':
            result = firstOperand * inputValue;
            break;
        case '/':
            if (inputValue === 0) {
                displayValue = '错误';
                updateDisplay();
                return;
            }
            result = firstOperand / inputValue;
            break;
        default:
            return;
    }
    
    displayValue = String(parseFloat(result.toFixed(10)));
    firstOperand = null;
    operator = null;
    updateDisplay();
}

// 切换正负号
function toggleSign() {
    displayValue = parseFloat(displayValue) * -1;
    updateDisplay();
}

// 计算百分比
function calculatePercentage() {
    displayValue = parseFloat(displayValue) / 100;
    updateDisplay();
}

// 键盘支持
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
    
    if (key === '.') {
        event.preventDefault();
        appendToDisplay('.');
    }
    
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        handleOperator(key);
    }
    
    if (key === '=' || key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    
    if (key === 'Backspace') {
        event.preventDefault();
        if (displayValue.length > 1) {
            displayValue = displayValue.slice(0, -1);
        } else {
            displayValue = '0';
        }
        updateDisplay();
    }
    
    if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});
