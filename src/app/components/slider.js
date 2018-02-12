
'use strict';
 
var slider = (function() {

  var section = document.body.querySelector('.l-page.l-slider'),
    list = section.querySelector('.c-slider__list'),
    items = list.querySelectorAll('.c-slider__sl-card'),
    control = section.querySelector('.c-slider__control'),
    itemsAr = Array.prototype.slice.call(items),
    indexMax = items.length - 1,
    orderMax = items.length,
    index;
   
  function checkIndSlide(index) {

		if((!index)||index>indexMax) index = 0; 

		else if((index)&&(index <= 0)) index = indexMax;

		return index
	}

  function onTouch(el, callback) {

    var touchsurface = el,
     dir,
     touchobj,
     swipeType,
     startX,
     startY,
     distX,
     distY,
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

  function removeRefClass() {

    var refEl = list.querySelector('.is-ref');

    index = itemsAr.indexOf(refEl);

    refEl.classList.remove('is-ref');

  }

  function changeOrder() {

    index = checkIndSlide(index);
    items[index].classList.add('is-ref');
    items[index].style.order = '1';

    index++;
    index = checkIndSlide(index);

    for(var i=2; i<=orderMax; i++) {

      items[index].style.order = i;
       index++;
       index = checkIndSlide(index);
    }

    list.classList.remove('is-set');
    setTimeout(function() {list.classList.add('is-set');}, 50);  
  }


  function button(e) { 

    e.preventDefault();

    removeRefClass();
   if(e.target.classList.contains('c-slider__back-link')) {

     index--;
     list.classList.add('is-reversing');
	 }

    else if(e.target.classList.contains('c-slider__next-link')) {

     index++;	
     list.classList.remove('is-reversing');
	 }
    changeOrder();
	}


  function keyDown(e) {

        switch(e.which) {
          case 37: {
              removeRefClass();
              index--; 
              list.classList.add('is-reversing');
              changeOrder();
            }
            break;
          case 39: {
              removeRefClass();
              index++; 
              list.classList.remove('is-reversing');
              changeOrder();
            }
            break;
          default: return;
        }
      
      return false;
    }
    
  function mobileSliderSwipe(swipeSwitch) { 

    if(swipeSwitch !== 'disabled') {

      onTouch(list, function (dir) {
        
        if (dir === 'left') {
          removeRefClass();
          index++;  
          list.classList.remove('is-reversing');
          changeOrder();
        }

        else if (dir === 'right')  {
          removeRefClass();
          index--;
          list.classList.add('is-reversing');
          changeOrder();
       }
     });
    }
  }

  function handler(typeMobDevice, swipeSwitch) {


    control.addEventListener('click', button, false);
   document.body.addEventListener('keydown', keyDown, false);

   if(typeMobDevice) mobileSliderSwipe(swipeSwitch);      
}
    
  return { handler, keyDown}

})();

export default slider