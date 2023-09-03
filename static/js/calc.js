let total = 0
var last_versions = []
const calc_screen = document.querySelector("#CALC_INPUT")
calc_screen.value = total
let current_element = ""
let result = false
let selected=false


function saveCalcState(){
    last_versions.push(document.querySelector("#CALC_INPUT").value)
    if (last_versions.length > 10){
        last_versions.shift()
    }
}

function changeCalcState(){
    selected = !selected
}

function CalculatorAdd(value){
    saveCalcState()

    if(/[-+/\*%]/.test(value)){
        result = false
    }
    if (result){
        CalculatorReset()
        result = false
    }

    if (calc_screen.value == "" && /[-+/\*%]/.test(value)){
        return
    }
    else if (!(/[-+/\*%.]/.test(value))){
        calc_screen.value += value 
    }
    else if ((/[-+/\*%]/.test(calc_screen.value.slice(-1))) && /[%]/.test(value)){
        return
    }
    else if (!(/[-+/\*]/.test(calc_screen.value.slice(-1))) && /[-+/\*%]/.test(value)){
        calc_screen.value += value
    }    
    else if (/[.]/.test(value) && !(/[.]/.test(calc_screen.value.split(/[-+/\*%]/).pop()))){
        calc_screen.value += value 
    }
}

function CalculatorReset(){
    saveCalcState()
    calc_screen.value = ""
}

function CalculatorSuppr(){
    saveCalcState()
    calc_screen.value = calc_screen.value.slice(0, -1)
}

function CalculatorCancel(){
    last = last_versions.pop()
    if(last != undefined){
        calc_screen.value = last
    }
    else{
        calc_screen.value = ""
    }
}

function CalculatorResult(){
    saveCalcState()

    s = calc_screen.value
    s= s.split(/(?=[%])|(?<=[%])/g)
    for (let i=0; i< s.length; i++){
        if (s[i] == "%"){
            s[i] = ""
            s[i-1] = s[i-1].split(/(?=[$-/:-?{-~!"^_`\[\]])/gi)
            temp = s[i-1].pop()
            s[i-1] = s[i-1].join("")
            if (/[-\+]/g.test(temp)){
                symbol = temp[0]
                temp = parseFloat(temp.replace(/[-\+]/g, ""))
                s[i] = `*(${1}${symbol}${(temp/100)})`
            }
        else if (/[*/]/g.test(temp)){
            symbol = temp[0]
            temp = parseFloat(temp.replace(/[*+]/g, ""))
            s[i] = `${symbol}${(temp/100)}`
        }
        }
    }
    s = s.join("")
    s = math.round(math.eval(s), 2)
    calc_screen.value = s
    result = true
}

document.addEventListener('keydown', function(event){
    if(!selected){return}
    pressed_key = event.key
    if (pressed_key == "Enter"){
        CalculatorResult()
        return
    }
    else if ((pressed_key == "Backspace" || pressed_key == "delete") && event.shiftKey){
        CalculatorReset()
        return
    }
    else if (pressed_key == "Backspace" || pressed_key == "delete"){
        CalculatorSuppr()
        return
    }    
    else if (pressed_key.toLowerCase()=="z" && event.ctrlKey){
        CalculatorCancel()
        return
    }
    const decoder = {
        "&": 1,
        "é":2,
        '"':3,
        "'":4,
        "(":5,
        "-":6,
        "è":7,
        "_":8,
        "ç":9,
        "à":0
    }
    if (!/[0-9]+/.test(event.key) && !/[-+/\*.%]/.test(event.key)){
        pressed_key = decoder[event.key]
    }
    if (!/^[0-9]+$/.test(pressed_key) && !/[-+/\*.%]/.test(pressed_key) || /[]/.test(pressed_key)){
        return
    }
    CalculatorAdd(pressed_key)
})

