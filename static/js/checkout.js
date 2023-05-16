var last_versions = []

function saveCalcState(){
    last_versions.push(document.querySelector("#CALC_INPUT").value)
    if (last_versions.length > 10){
        last_versions = last_versions.slice(1, last_versions.length)
    }
}


function operation(x, s, y){
    if (/[+-\/\*]/.test(s) && !/[%]/.test(x+y)){
        return eval(`${x}${s}${y}`)
    }
    else if (/[%]/.test(y) && /[+-]/.test(s)){
        return eval(`${x}*(1${s}(${(eval(y)/100)}))`)        
    }
}



function CalculatorAdd(value){
    let calc_screen = document.querySelector("#CALC_INPUT")

    saveCalcState()

    if (calc_screen.value == "" && /[-+/\*%]/.test(value)){
        return
    }
    if (!(/[-+/\*%.]/.test(value))){
        calc_screen.value += value 
    }
    else if (!(/[-+/\*%]/.test(calc_screen.value.slice(-1))) && /[-+/\*%]/.test(value)){
        calc_screen.value += value        
    }else if (/[.]/.test(value) && !(/[.]/.test(calc_screen.value.split(/[-+/\*%]/).pop()))){
        calc_screen.value += value 
    }
}

function CalculatorReset(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    saveCalcState()
    calc_screen.value = ""
}

function CalculatorSuppr(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    saveCalcState()
    calc_screen.value = calc_screen.value.slice(0, -1)
}

function CalculatorCancel(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    last = last_versions.pop()
    if(last != undefined){
        calc_screen.value = last
    }
    else{
        calc_screen.value = ""
    }
}

function CalculatorResult(){
    let calc_screen = document.querySelector("#CALC_INPUT")
    // regex: ([-+\/*%])
}




let s = "5+6-40%+44"

s= s.split(/(?=[%])|(?<=[%])/g)
for (let i; i< s.length; i++){
    if (s[i] == "%"){
        temp = s[i-1]
    }
}