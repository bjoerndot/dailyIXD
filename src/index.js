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




// Event Listeners
document.addEventListener('mousemove', eyeMovement)