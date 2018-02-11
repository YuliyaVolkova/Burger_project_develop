
'use strict';
 
var onTouch = (el, callback) => {

    var touchsurface = el,
     dir,
     touchobj,
     swipeType,
     startX,
     startY,
     distX,
     distY,
   //  threshold = 50, //required min distance traveled to be considered swipe
   //  restraint = 50, // maximum distance allowed at the same time in perpendicular direction
     allowedTime = 500, // maximum time allowed to travel that distance 500
     elapsedTime,
     startTime,
     handletouch = callback;

    touchsurface.addEventListener('touchstart', function(e) {

        touchobj = e.changedTouches[0];
        dir = 'none';
        swipeType = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
 
    }, false);
 
    touchsurface.addEventListener('touchmove', function(e) {

        touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        
        if (Math.abs(distX) > Math.abs(distY)) // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
            dir = (distX < 0)? 'left' : 'right';
            

        else  // else consider this a vertical movement
            dir = (distY < 0)? 'up' : 'down';
            
        e.preventDefault(); // prevent scrolling when inside DIV
       
        distX = 0;
        distY = 0;
    }, false);
 
    touchsurface.addEventListener('touchend', function(e) {
        touchobj = null;
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            
            swipeType = dir;
            console.dir(swipeType);
        }

        handletouch(swipeType);
    }, false); 
}

export default onTouch;