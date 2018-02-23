
'use strict';
 
var onTouch = (el, callback) => {

    var touchsurface = el,
     dir = '',
     touchobj = {},
     swipeType = '',
     startX,
     startY,
     distX,
     distY,
     threshold = 20, //required min distance traveled to be considered swipe
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

        e.preventDefault(); // prevent scrolling when inside DIV

        if(!startX||!startY) return
       
        touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
           
    }, false);
 
    touchsurface.addEventListener('touchend', function(e) {

        elapsedTime = new Date().getTime() - startTime; // get time elapsed

        if (Math.abs(distX) > Math.abs(distY)) {// if distance traveled horizontally is greater than vertically, consider this a horizontal movement
            
            if(Math.abs(distX) > threshold && elapsedTime <= allowedTime)
                
                dir = (distX < 0)? 'left' : 'right';
        }
        else {// else consider this a vertical movement
            
            if(Math.abs(distY) > threshold && elapsedTime <= allowedTime)

                 dir = (distY < 0)? 'up' : 'down';
         }

            swipeType = dir;

        if(swipeType!=='none') handletouch(swipeType);
       
        //reset values
        touchobj = null;
        distX = 0;
        distY = 0;

    }, false); 
}

export default onTouch;