function CalculatorAdd(value){
    let calc_screen = document.querySelector("#CALC_INPUT")
    calc_screen.value += value
    // regex: ([-+\/*%])
}

function CalculatorReset(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    calc_screen.value = ""
}

function CalculatorSuppr(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    calc_screen.value = calc_screen.value.slice(0, -1)
}

function CalculatorCancel(){
    let calc_screen = document.querySelector("#CALC_INPUT")
}

function CalculatorResult(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    // regex: ([-+\/*%])
}
