import {selectData} from "./js/data"

function eyeMovement(e){
    // helper-functions
    // angle calculated by arctan, which returns a value in radian
    const calcAngle = (p1, p2) => radianToDegree(Math.atan((p1.y - p2.y)/(p1.x - p2.x)))
    // helper to convert radian to degree (which is needed to define the rotation in the elements style)
    const radianToDegree = radian => radian*180/Math.PI

    const mouse = {x: e.clientX, y: e.clientY};
    const eyes = document.getElementsByClassName("cat__eye");
    //iterating over both eyes
    for(let i = 0; i<eyes.length; i++){
        const eye = eyes[i].getBoundingClientRect();
        let deg = calcAngle(mouse, eye)
        // if the mouse is left of the eye, the angle becomse negative, therefore 180 is added in this case
        if(mouse.x < eye.x){
            deg = deg + 180
        }
        // applying style to element
        eyes[i].style.transform = `rotate(${deg}deg)`
    }
}

function toggleReadMode(e){
    // all images are required to be read by parcel-bundler
    const book_icon = require('./img/book-icon.svg')
    const eye_icon = require('./img/eye-icon.svg')
    // fetching of all nodes
    const readMode_class = document.getElementsByClassName("readMode")[0];
    const readMode_button = document.getElementById("readMode_button").children[0]
    // check if read-mode is already enabled and add or remove the corresponding class/icons
    if(readMode_class.classList.contains("readMode--is-active")){
        readMode_class.classList.remove("readMode--is-active")
        readMode_button.src = book_icon
    }else{
        readMode_class.classList.add("readMode--is-active")
        readMode_button.src = eye_icon
    }
}

function handleCheckbox(e){
    const confirmButton = document.getElementsByClassName("terms__confirm")[0]
    const confirmButtonText = document.getElementsByClassName("terms__confirm__text")[0]
    const confirmToggle = "terms__confirm--is-visible"
    if(this.checked){
        confirmButton.classList.add(confirmToggle)
    }else{
        confirmButton.classList.remove(confirmToggle)
    }
}
/*** Searchable-fullwidth Dropdown ***/
let selectIsOpen = false; // store the state of the dropdown

// cleanup and sort of raw-data
function sortSelect(){
    selectData.sort();
    return [...new Set(selectData)]
}

// pushing an array of items into an HTML-String
function arrayToHTMLString(arr, className){
    let htmlString = ""
    arr.forEach(item => htmlString += `<div class="${className}" tabindex="0">${item}</div>`)
    return htmlString
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function hideSelectScreen(){
    const selectScreen = document.getElementsByClassName("selectScreen")[0]
    selectRemoveEventListeners();
    selectScreen.remove()
    selectIsOpen = false;
}

function showSelectScreen(data){
    let selectScreen = `<div class='selectScreen'>${arrayToHTMLString(data, "selectItem")}</div>`
    const htmlElement = htmlToElement(selectScreen)
    const insert = document.getElementsByClassName("ddfullscreen__container")[0]
    insert.appendChild(htmlElement)
    selectAddEventListeners();
    selectIsOpen = true;
}

function setSelected(e){
    // get select-button to change text and selectScreen to remove it from DOM
    const select = document.getElementsByClassName("ddfullscreen__select")[0]
    hideSelectScreen();
    select.value = e.target.innerText
}

// same as setSelected but button can be used with key just as mouse
function setSelectedKey(e){
    console.log(e)
    if(e.keyCode === 13){
        setSelected(e)
    }
}

// adding keypress and click eventlisteners
function selectAddEventListeners() { 
    const selectItems = document.getElementsByClassName("selectItem")
    for(let i = 0; i < selectItems.length; i++){
        selectItems[i].addEventListener("click", setSelected)
        selectItems[i].addEventListener("keypress", setSelectedKey)
    }
}

// removing the eventListeners of elements, that disappear
function selectRemoveEventListeners(){
    const selectItems = document.getElementsByClassName("selectItem")
    for(let i = 0; i < selectItems.length; i++){
        selectItems[i].removeEventListener("click", setSelected)
        selectItems[i].removeEventListener("keypress", setSelectedKey)

    }
}

function handleSelectClick(e){
    if(!selectIsOpen){
        filterSelect(document.getElementsByClassName("ddfullscreen__select")[0].value)
    }else{
        hideSelectScreen();
    }
}

function filterSelect(val){
    let newDataSet = sortSelect().filter(item => {
        return item.toLowerCase().includes(val.toLowerCase())
    })
    if(selectIsOpen){
        hideSelectScreen();
    }
    showSelectScreen(newDataSet);
}

function handleSelectKeyPress(e){
    filterSelect(e.target.value)
}

function clearDropdown(e){
    const select = document.getElementsByClassName("ddfullscreen__select")[0]
    select.value = ""
    select.focus()
    if(selectIsOpen){
        hideSelectScreen();
    }
    showSelectScreen(sortSelect());
}

function increaseLoadCount(label, count = 0){
    count++;

}

function showSucess(label){
    label.style.opacity = 0
    label.parentElement.classList.remove("upload__button--is-active", "upload__button--up", "upload__button--down")
    label.parentElement.classList.add("upload__button--is-success")
}

function buttonLoadAnimation(e){
    const button = e.target
    button.classList.add("upload__button--is-active")
    const label = e.target.children[0]
    let count = 0
    label.innerText=`${count}%`
    let loading = setInterval(function(){

        count++;
        label.innerText=`${count}%`
        if(count === 100) {
            clearInterval(loading);
            showSucess(label)
        }
    }, 100)

}

// pull relevant buttons into script
const readModeButton = document.getElementById("readMode_button")
const termsCheckbox = document.getElementsByClassName("terms__checkbox")[0]
// buttons for dropdown
const dropdownSelect = document.getElementsByClassName("ddfullscreen__select")[0]
const dropdownSelectButton = document.getElementsByClassName("ddfullscreen__arrow")[0]
const dropdownDelete = document.getElementsByClassName("ddfullscreen__delete")[0]
// buttons for up- and download
const updownbuttons = document.getElementsByClassName("upload__button")

// Event Listeners
document.addEventListener('mousemove', eyeMovement)
readModeButton.addEventListener('click', toggleReadMode)
termsCheckbox.addEventListener("change", handleCheckbox)
// EventListeners for dropdown
dropdownSelect.addEventListener("click", handleSelectClick)
dropdownSelect.addEventListener("keyup", handleSelectKeyPress)
dropdownSelectButton.addEventListener("click", handleSelectClick)
dropdownDelete.addEventListener("click", clearDropdown)
for(let i = 0; i<updownbuttons.length; i++){
    updownbuttons[i].addEventListener("click", buttonLoadAnimation)
}