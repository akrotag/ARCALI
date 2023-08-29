const item_list = list = document.getElementById("items-list")
let currency = "Da"
let items = {}

function ResetItemList(){
    item_list.innerHTML = `<div class="item"><span class="items-title">Items list</span></div>`
}


function AddItem(item){
    let name = item.attributes["name"].value
    let price = parseFloat(item.attributes["price"].value)
    if (items[name] == undefined){items[name] = [price, 0, 0]}

    if (items[name][2] == 0)
    {
        el_div = document.createElement('div')
        el_div.setAttribute("id", name)
        el_div.setAttribute("class", "item")
        el_div.innerHTML =
            `<div class="item-details">
                    <span class="item-name">${name}</span>
                    <input class="item-quantity" type="number" value="1" min="1" onchange="UpdateItem('${name}', this.value)">
                    <span class="item-price"><span class='item-price-span'>0</span>${currency}</span>
                </div>
                <button class="remove-button" onclick="RemoveItem('${name}')">Remove</button>
            `
        item_list.appendChild(el_div)
        UpdateItem(name, 1)
    }
    else{
        UpdateItem(name, items[name][2]+1)    
    }
    UpdateTotalVal()
}

function UpdateItem(item_name, amount){
    items[item_name][2] = amount
    items[item_name][1] = items[item_name][0] * items[item_name][2]
    item_element = document.getElementById(item_name)
    item_element.children[0].children[1].value = `${items[item_name][2]}`
    item_element.children[0].children[2].children[0].innerText = `${items[item_name][1]}`
    UpdateTotalVal()
}


function UpdateTotalVal(){
    total_element = document.getElementById("total-value")
    let sum = 0

    for (let item in items){
        sum += items[item][1]
    }

    total_element.innerText = `${sum}${currency}`
}

function RemoveItem(item_name){
    item_element = document.getElementById(item_name)
    item_element.remove()
    delete items[item_name]
    UpdateTotalVal()
}