    const form = document.forms.namedItem("card-form")

const div_card_bank = document.getElementById("card-result__card-bank")
const div_card_type = document.getElementById("card-result__card-type")
const div_card_number = document.getElementById("card-result__card-number")
const div_card_holder = document.getElementById("card-result__card-holder")
const div_card_date = document.getElementById("card-result__card-date")

const banks_imgs = {
    'Sber': 'sber.png',
    'VTB': 'VTB.png',
    'Alfabank': 'alpha.png',
    'Tinkoff': 'tinkoff.png'
}
    
const card_imgs = {
    'VISA': 'visa.png',
    'MasterCard': 'mastercard.png',
    'Mir': 'mir.png',
    'Union Pay': 'up.png'
}


function PushToTable(arr){
    let table = document.getElementById("table")
    let row = table.insertRow()
    for(let i = 0; i < arr.length; i++){
        let cell = row.insertCell()
        cell.innerText = arr[i]
    }
}
const hasOnlyDigits = (v) => /^\d+$/.test(v)
const hasOnlyLettersAndSpaces = (v) => {return /^[A-Za-z\s]*$/.test(v)}
function CheckList(selectedItem){
    if (selectedItem === ""){
        return false
    }
    return true
}
function checkCardNumber(card_number){
    if(card_number.length < 13 || card_number.length > 19){
        return false
    }
    return true
}
function checkCardHolder(card_holder){
    if(/^\s*$/.test(card_holder)){
        return false
    }
    return true
}
function checkDate(month, year){
    let now = new Date()
    if(Number(month) > 0 && Number(month) <= 12){
        if (Number(year) > now.getFullYear() % 100) {
            return true
        } else if (Number(month) >= now.getMonth() + 1 && Number(year) == now.getFullYear() % 100) {
            return true
        } else {
            return false
        }
    }
}
function clearField(field){
    form.elements.namedItem(field).value = ""
}

function clearAll(){
    document.querySelectorAll('input, select').forEach(el=>el.value = '')
    changeBgImg(div_card_bank, '')
    changeBgImg(div_card_type, '')
    div_card_number.innerText = '                  '
    div_card_holder.innerText = '                  '
    div_card_date.firstElementChild.innerText = '  '
    div_card_date.lastElementChild.innerText = '  '
}

function numberWithSpaces(num) {
    return num.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ")
}
function changeBgImg(elem, img){
    elem.style.backgroundImage = `url('images/${img}')`
}



form.addEventListener("input", (e) =>{

    let bank_name = form.elements.namedItem("bank_name")
    let card_type = form.elements.namedItem("card_type")
    let card_number = form.elements.namedItem("card_number")
    let card_holder = form.elements.namedItem("card_holder")
    let month = form.elements.namedItem("month")
    let year = form.elements.namedItem("year")

    changeBgImg(div_card_bank, banks_imgs[bank_name.value])
    changeBgImg(div_card_type, card_imgs[card_type.value])

    if (hasOnlyDigits(card_number.value)){
        div_card_number.innerText = numberWithSpaces(card_number.value)
    } else {
        card_number.value = card_number.value.slice(0, -1)
    }

    if (hasOnlyLettersAndSpaces(card_holder.value)){
        card_holder.value = card_holder.value.toUpperCase()
        div_card_holder.innerText = card_holder.value
    } else {
        card_holder.value = card_holder.value.slice(0, -1)
        div_card_holder.innerText = card_holder.value
    }

    if (hasOnlyDigits(month.value)){
        div_card_date.firstElementChild.innerText = month.value.padStart(2, '0')
    } else {
        month.value = month.value.slice(0, -1)
    }

    if (hasOnlyDigits(year.value)){
        div_card_date.lastElementChild.innerText = year.value.padStart(2, '0')
    } else {
        year.value = year.value.slice(0, -1)
    }
})

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const completedFields = {}

    for (let i = 0; i < form.elements.length; i++) {
        let el = form.elements[i];
        if (el.name) {
            completedFields[el.name] = false;
        }
    }

    let bank_name = form.elements.namedItem("bank_name").value
    let card_type = form.elements.namedItem("card_type").value
    let card_number = form.elements.namedItem("card_number").value
    let card_holder = form.elements.namedItem("card_holder").value
    let month = form.elements.namedItem("month").value
    let year = form.elements.namedItem("year").value

    if (!CheckList(bank_name)) {
        alert("Не выбран Банк")
        completedFields["bank_name"] = false
        clearField("bank_name")
    } else {
        completedFields["bank_name"] = true
    }

    if (!CheckList(card_type)) {
        alert("Выберите платежную систему")
        completedFields["card_type"] = false
        clearField("card_type")
    } else completedFields["card_type"] = true

    if (!checkCardNumber(card_number)){
        alert("Номер карты должен содердать от 13 до 19 цифр")
        completedFields["card_number"] = false
        clearField("card_number")
    } else completedFields["card_number"] = true

    if (!checkCardHolder(card_holder)){
        alert("Используйте латинские буквы")
        completedFields["card_holder"] = false
        clearField("card_holder")
    } else completedFields["card_holder"] = true

    if(!checkDate(month, year)) {
        alert("Дата действия карты заполняется в формте MM YY и должна быть больше текущей даты")
        completedFields["month"] = false
        completedFields["year"] = false
        clearField("month")
        clearField("year")
    } else {
        completedFields["month"] = true
        completedFields["year"] = true
    }

    if (Object.keys(completedFields).every(elem => completedFields[elem] == true)) {
        let cardData = []
        cardData.push(bank_name, card_type, card_number, card_holder, month + '/' + year)
        PushToTable(cardData)
        clearAll()
    }
    else {
        alert("Заполните всю форму корректно!")
    }

})
