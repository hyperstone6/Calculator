class Calculator{
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.previous = ''
        this.current = ''
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNum(num) {
        if(num === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + num.toString()
    }

    operate(operation) {
        
        if(this.current === '') return
        if(this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    invert() {
        this.current = this.current * -1
    }

    compute() {
        let computation
        let prev = parseFloat(this.previous)
        let curr = parseFloat(this.current)
        if(isNaN(prev) || isNaN(curr)) return

        switch (this.operation) {
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return;
        }

        this.current = computation
        this.previous = ''
        this.operation = undefined
        
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.current
        if(this.operation != null) {
            this.previousOperandText.innerText = `${this.previous} ${this.operation}`
        } else {
            this.previousOperandText.innerText = this.previous
        }
        
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')

const previousOperandText = document.querySelector('[data-previous]')
const currentOperandText = document.querySelector('[data-current]')
const invertButton = document.querySelector('[data-plus-minus]')

let calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operate(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

invertButton.addEventListener('click', button => {
    calculator.invert()
    calculator.updateDisplay()
})