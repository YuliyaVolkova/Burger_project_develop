
'use strict';

var scrollPage = (function() {

	var screen = 0,
		flag = false,
    container = document.body.querySelector('.l-wrapper'),
    pages = container.querySelectorAll('.l-page'),
    nextBut = container.querySelector('#next'),
    orderBut = container.querySelector('#orderBut'),
    mainNav = container.querySelectorAll('.c-main-nav__link'),
    dotLinks = document.body.querySelectorAll('.c-nav-dots__link'),
    dotItems = document.body.querySelectorAll('.c-nav-dots__item');
   
   /// check device is mobile

  function isMobileDevice() {

    const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
               'BlackBerry|Windows Phone|'  +
               'Opera Mini|IEMobile|Mobile' , 
              'i');   //The /expression/i makes the search case insensitive
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || testExp.test(navigator.userAgent)
  }


  function navMenuAct(item) {

     item.classList.add('is-active');
   //   var siblings = n => [...n.parentElement.children].filter(c=>c!=n);
      var siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n);
      [].forEach.call(siblings(item), function(el) {
        el.classList.remove('is-active');
      });
  }

  /// for mobile device swipe handler

  function onTouch(el, callback) {
  
    var touchsurface = el,
    dir,
    swipeType,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 500, // maximum time allowed to travel that distance 500
    elapsedTime,
    startTime,
    handletouch = callback || function(dir) { 

            if (dir = 'down' && screen < pages.length - 1) {
      screen++;
      showSect(screen);

    }
    else if (dir = 'up' && screen > 0) {

      screen--;
      showSect(screen);

    }
    console.log(dir, screen);
  };
 
    touchsurface.addEventListener('touchstart', function(e) {
        var touchobj = e.changedTouches[0];
        dir = 'none';
        swipeType = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
     //   handletouch(e, 'none', 'start', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
        e.preventDefault();
 
    }, false);
 
    touchsurface.addEventListener('touchmove', function(e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        if (Math.abs(distX) > Math.abs(distY)) { // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
            dir = (distX < 0)? 'left' : 'right';
            
       //     handletouch(e, dir, 'move', swipeType, distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
        }
        else { // else consider this a vertical movement
            dir = (distY < 0)? 'up' : 'down';
            
         //   handletouch(e, dir, 'move', swipeType, distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
        }
        e.preventDefault(); // prevent scrolling when inside DIV
    }, false);
 
    touchsurface.addEventListener('touchend', function(e) {
        var touchobj = e.changedTouches[0];
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipeType = dir; // set swipeType to either "left" or "right"
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipeType = dir; // set swipeType to either "top" or "down"
            }
        }
        // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
        handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
        e.preventDefault();
        handletouch(dir);
    }, false);
}

/// move section use css transform
   function move(scr) {

        var pos = -scr*100 + "%";
        
      // Code for Chrome, Safari, Opera
          container.style.WebkitTransform = 'translateY(' + pos + ')'; 
      // Code for IE9
          container.style.msTransform = 'translateY(' + pos + ')';
      // Standard syntax
          container.style.transform = 'translateY(' + pos + ')';
  }


  function showSect(ind) {

    navMenuAct(dotItems[ind]);
    move(ind); 
  }

  function clickDotMenu(e) {

   e.preventDefault();

    var nodesLk = Array.prototype.slice.call(dotLinks);
     screen = nodesLk.indexOf(this);
     showSect(screen);   
  }

  function clickMainNav(e) {

    e.preventDefault();

    var href = e.target.href,
      hashInd = href.indexOf('#'),
      pageId = href.slice(hashInd),
      page = container.querySelector(pageId),
      pagesAr = Array.prototype.slice.call(pages);
      screen = pagesAr.indexOf(page);
      showSect(screen);
  }

  function mouse(e) {

    e.preventDefault();

    if(!flag) {

      flag=true;

    	var y=e.deltaY || e.detail || e.wheelDelta;
      
   		if(y<0&&screen>0)  screen--;

		  else if (y>0 && screen<pages.length-1)	 screen ++;
        
         showSect(screen);
          
      setTimeout(function() {flag=false;}, 800);
    }
  }

  function keyDown(e) {

    var tag = e.target.tagName.toLowerCase();
    
        switch(e.which) {
          case 38:
            if (tag != 'input' && tag != 'textarea' && screen>0) {
              screen--; 
              showSect(screen);
            }
            break;
          case 40:
            if (tag != 'input' && tag != 'textarea' && screen<pages.length-1) {
              screen++; 
              showSect(screen);
            }
            break;
          default: return;
        }
      
      return false;
    }

    
	function handler() {

    container.addEventListener("wheel", mouse, false);
        /** DOMMouseScroll is for mozilla. */
    container.addEventListener('DOMMouseScroll', mouse, false);
    
    document.addEventListener('keydown', keyDown, false);

    if(isMobileDevice()) onTouch(container);

    nextBut.addEventListener('click', clickMainNav);
    orderBut.addEventListener('click', clickMainNav);

    
    var unboundForEach = Array.prototype.forEach,
        forEach = Function.prototype.call.bind(unboundForEach);

    forEach(dotLinks, function (el) {

           el.addEventListener('click', clickDotMenu);
      });

    forEach(mainNav, function (el) {

           el.addEventListener('click', clickMainNav);
      });
	}

   return {handler}

})();

export default scrollPage;
