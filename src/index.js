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
    const book_icon = require('./img/book-icon.svg')
    const eye_icon = require('./img/eye-icon.svg')
    const readMode_class = document.getElementsByClassName("readMode")[0];
    const readMode_button = document.getElementById("readMode_button").children[0]
    console.log(readMode_class.classList)
    const readMode = readMode_class.classList.contains("readMode--is-active") ? true : false;
    console.log(readMode, readMode_class)
    if(readMode){
        readMode_class.classList.remove("readMode--is-active")
        readMode_button.src = book_icon
    }else{
        readMode_class.classList.add("readMode--is-active")
        readMode_button.src = eye_icon
    }
}

// calling button for readmode
const readModeButton = document.getElementById("readMode_button")

// Event Listeners
document.addEventListener('mousemove', eyeMovement)
readModeButton.addEventListener('click', toggleReadMode)