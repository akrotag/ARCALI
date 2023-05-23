var last_versions = []
const calc_screen = document.querySelector("#CALC_INPUT")
let current_element = ""
let result = false

function saveCalcState(){
    last_versions.push(document.querySelector("#CALC_INPUT").value)
    if (last_versions.length > 10){
        last_versions = last_versions.slice(1, last_versions.length)
    }
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
    s = math.round(math.eval(s))
    calc_screen.value = s
    current_element.children[2].innerText = `${s}Da`
    current_element.setAttribute("onclick", `showCalc(this, ${s})`)
    result = true
}

function showCalc(element, price){
    current_element = element
    container = document.querySelector("#CONTAINER")
    if(container.classList.contains("container-2")){
        container.classList.remove("container-2")
        container.classList.add("container-3")
        document.querySelector('#CALCULATOR').classList.remove("hidden")
    }
    calc_screen.value = price
}


// let s = "5*2+6-40%+44" // -> 57.6
// let temp = ""
// s= s.split(/(?=[%])|(?<=[%])/g)
// for (let i=0; i< s.length; i++){
//     if (s[i] == "%"){
//         s[i] = ""
//         s[i-1] = s[i-1].split(/(?=[$-/:-?{-~!"^_`\[\]])/gi)
//         temp = s[i-1].pop()
//         s[i-1] = s[i-1].join("")
//         if (/[-\+]/g.test(temp)){
//             symbol = temp[0]
//             temp = parseFloat(temp.replace(/[-\+]/g, ""))
//             s[i] = `*(${1}${symbol}${(temp/100)})`
//         }
//     else if (/[*/]/g.test(temp)){
//         symbol = temp[0]
//         temp = parseFloat(temp.replace(/[*+]/g, ""))
//         s[i] = `${symbol}${(temp/100)}`
//     }
//     }
// }
// s = s.join("")
// math.eval(s)