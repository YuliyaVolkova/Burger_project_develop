/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_styles_sass_main_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_styles_sass_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_styles_sass_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_detect_mobile_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_swipe_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_c_mobile_nav_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_slider_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_c_product_desc_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_team_vert_acco_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_menu_gor_acco_js__ = __webpack_require__(9);












var scrollPage = (function() {

	var screen = 0,
    prevScreen = 0,
		flag = false,
    container = document.body.querySelector('.l-wrapper'),
    pages = container.querySelectorAll('.l-page'),
    nextBut = container.querySelector('#next'),
    orderButs = container.querySelectorAll('.c-button__link[data-section="gotoOrder"]'),
    mainNav = container.querySelectorAll('.c-main-nav__link'),
    mobNav = document.body.querySelectorAll('.c-mobile-nav__link'),
    dotLinks = document.body.querySelectorAll('.c-nav-dots__link'),
    dotItems = document.body.querySelectorAll('.c-nav-dots__item'),
    mediaMth = window.matchMedia("(max-width: 768px)"),
    nodesDotLk = Array.prototype.slice.call(dotLinks),
    nodesPages = Array.prototype.slice.call(pages),
    unboundForEach = Array.prototype.forEach,
    forEach = Function.prototype.call.bind(unboundForEach),
    siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n),
    isMobile = (Object(__WEBPACK_IMPORTED_MODULE_1__components_detect_mobile_js__["a" /* default */])())?1:0;
    //   var siblings = n => [...n.parentElement.children].filter(c=>c!=n);

   

  function checkIndex(ind) {

    var maxIndSect = pages.length -1;
    if(ind < 0) ind = 0;
    else if(ind > maxIndSect) ind = maxIndSect;
    return ind
  }


  function dotsAct(item) {

     item.classList.add('is-active');
      [].forEach.call(siblings(item), function(el) {
        if(el.classList.contains('is-active'))  el.classList.remove('is-active');
      });
  }


/// move to section use css transform
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

    screen = checkIndex(ind);
    dotsAct(dotItems[screen]);
    move(screen); 

    if (prevScreen===2) { 

      document.body.removeEventListener('keydown', __WEBPACK_IMPORTED_MODULE_4__components_slider_js__["a" /* default */].keyDown, false);
      __WEBPACK_IMPORTED_MODULE_4__components_slider_js__["a" /* default */].handler(isMobile, 'disabled');
      var prodLink = __WEBPACK_IMPORTED_MODULE_5__components_c_product_desc_js__["a" /* default */].returnActLink();
      if(prodLink) __WEBPACK_IMPORTED_MODULE_5__components_c_product_desc_js__["a" /* default */].close(prodLink);
    }
     switch(screen) {
          case 2: { 
                  __WEBPACK_IMPORTED_MODULE_4__components_slider_js__["a" /* default */].handler(isMobile); 
                  __WEBPACK_IMPORTED_MODULE_5__components_c_product_desc_js__["a" /* default */].handler();
                }
            break;

          case 3: __WEBPACK_IMPORTED_MODULE_6__components_team_vert_acco_js__["a" /* default */].handler();
             break;
          case 4: __WEBPACK_IMPORTED_MODULE_7__components_menu_gor_acco_js__["a" /* default */].handler();
             break;

          default: return;
        }
      
    return false;
  }


  function clickDotMenu(e) {

   e.preventDefault();

      prevScreen = screen;
      screen = nodesDotLk.indexOf(this);
     showSect(screen);   
  }


  function clickMenu(e) {

    e.preventDefault();

    var href = e.target.href,
      hashInd = href.indexOf('#'),
      pageId = href.slice(hashInd),
      page = container.querySelector(pageId);
      prevScreen = screen;

      screen = nodesPages.indexOf(page);

      if(e.target.classList.contains('c-mobile-nav__link')) {

        __WEBPACK_IMPORTED_MODULE_3__components_c_mobile_nav_js__["a" /* default */].closeMenu(e);
      }

      showSect(screen);
  }


  function mouseWheel(e) {

    e.preventDefault();

    if(!flag) {

      flag=true;

    	var y=e.deltaY || e.detail || e.wheelDelta;
      prevScreen = screen;
      
   		if(y<0)  screen--;

		  else if (y>0)	 screen ++;
        
         showSect(screen);
          
      setTimeout(function() {flag=false;}, 800);
    }
  }


  function keyDown(e) {

    var tag = e.target.tagName.toLowerCase();
        prevScreen = screen;
        switch(e.which) {
          case 38: 
            if (tag != 'input' && tag != 'textarea') {
              screen--; 
              showSect(screen);
            }
            break;
          case 40:
            if (tag != 'input' && tag != 'textarea') {
              screen++; 
              showSect(screen);
            }
            break;
          default: return;
        }
      
      return false;
    }

    function mobilePageSwipe() { 

      Object(__WEBPACK_IMPORTED_MODULE_2__components_swipe_js__["a" /* default */])(container, function (dir) {
        
        if (dir === 'down') screen--;
        else if (dir === 'up')  screen++;
        showSect(screen);
     });
    }

    
	function handler() {

    if(mediaMth.matches) {

      mediaMth.addListener(__WEBPACK_IMPORTED_MODULE_3__components_c_mobile_nav_js__["a" /* default */].handler);
      __WEBPACK_IMPORTED_MODULE_3__components_c_mobile_nav_js__["a" /* default */].handler(mediaMth);

    }
    	container.addEventListener("wheel", mouseWheel, false);
        /** DOMMouseScroll is for mozilla. */
    	container.addEventListener('DOMMouseScroll', mouseWheel, false);
    
    	document.addEventListener('keydown', keyDown, false);
     
    	if(isMobile) mobilePageSwipe();

   		nextBut.addEventListener('click', clickMenu, false);
  
    	forEach(dotLinks, function (el) {

           el.addEventListener('click', clickDotMenu, false);
      	});

    	forEach(mainNav, function (el) {

           el.addEventListener('click', clickMenu, false);
      	});

    	forEach(orderButs, function (el) {

           el.addEventListener('click', clickMenu, false);
      	});

    	forEach(mobNav, function (el) {

           el.addEventListener('click', clickMenu, false);
      	});
	}

   return {handler}

})();

window.onload = scrollPage.handler;
	

console.log("It` work %%%!");





/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



 
var isMobileDevice = ()=> {

    const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
               'BlackBerry|Windows Phone|'  +
               'Opera Mini|IEMobile|Mobile' , 
              'i');   //The /expression/i makes the search case insensitive
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || testExp.test(navigator.userAgent)
  }

/* harmony default export */ __webpack_exports__["a"] = (isMobileDevice);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


 
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

/* harmony default export */ __webpack_exports__["a"] = (onTouch);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



var mobileNav = (function() {

	var mobNav =document.body.querySelector('.c-mobile-nav'),
	   mobTarg = mobNav.querySelector('.c-mobile-nav__target'),
	   mobMenu = mobNav.querySelector('.c-mobile-nav__menu'),
	   mobLogo = mobNav.querySelector('.c-logo--mob-nav'),
	   mobClose = mobNav.querySelector('.c-close--mob-nav'),
	   unboundForEach = Array.prototype.forEach,
       forEach = Function.prototype.call.bind(unboundForEach),

    siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n);


	function isEsc(e) {

        switch(e.which) {
          case 27: closeMenu(e);
            break;
          
          default: return;
        }
      
      return false;
    }   


	function openMenu(e) {

		e.preventDefault();

		var targ = this;
		targ.parentElement.classList.add('is-active');

		[].forEach.call(siblings(targ), function(el) {
       if(el.classList.contains('visually-hidden'))  el.classList.remove('visually-hidden');
     });
		document.body.addEventListener('keydown', isEsc, false);

  	}
  	

  	function closeMenu(e) {

  		e.preventDefault();

		mobNav.classList.remove('is-active');
		mobClose.classList.add('visually-hidden');
		mobMenu.classList.add('visually-hidden');
		mobLogo.classList.add('visually-hidden');
 	 }

 
	function handler(mq) {

		if (mq.matches) {

    	 mobTarg.addEventListener('click', openMenu, false);
     	mobClose.addEventListener('click', closeMenu, false);
		} 

		else {
			mobTarg.removeEventListener('click', openMenu, false);
     		mobClose.removeEventListener('click', closeMenu, false);
		}
	}

   return {handler, closeMenu}

})();

/* harmony default export */ __webpack_exports__["a"] = (mobileNav);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


 
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

/* harmony default export */ __webpack_exports__["a"] = (slider);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";




var products = (function() {

	var slider =document.body.querySelector('.c-slider__list'),
	   prodLinks = slider.querySelectorAll('.c-products__link'),
     prodLinksAr = Array.prototype.slice.call(prodLinks),
     mediaMth = window.matchMedia("(max-width: 768px)"),
     unboundForEach = Array.prototype.forEach,
     forEach = Function.prototype.call.bind(unboundForEach),
     index;


  function isEsc(e) {

        switch(e.which) {
          case 27: closeEl(this);
            break;
          
          default: return;
        }
      
      return false;
    }   


  function open(e) {

  	var desc = this.querySelector('.c-products__desc');

  	if (desc.classList.contains('visually-hidden')) {

  		desc.classList.remove('visually-hidden');
      index = prodLinksAr.indexOf(this);
      document.body.addEventListener('keydown', isEsc.bind(this), false);
    }
  }


  function closeMouse(e) {

  	var link = this;

  	   setTimeout(function () {

          link.querySelector('.c-products__desc').classList.add('visually-hidden');
  	   }, 300);
  }


  function closeEl(par) {

    var par = par.target||par;

    if (par.classList.contains('c-products__link')) {

      par.querySelector('.c-products__desc').classList.add('visually-hidden');
    }

    else this.parentElement.classList.add('visually-hidden');
  }

  function whichClose(el) {

    var close = el.querySelector('.c-close-prod');

    switch(mediaMth.matches) {

          case false: { 
                        close.removeEventListener('click', closeEl, false);
                        el.addEventListener('mouseleave', closeMouse, false);
                      }
              break;
          case true: { 
                        el.removeEventListener('mouseleave', closeMouse, false);
                        close.addEventListener('click', closeEl, false);
                      }
             break;
          default: return;
    }
      
   return false 
  }

  function handler() {

    forEach(prodLinks, function (el) {

    el.addEventListener('mouseover', open, false);
    whichClose(el);
    mediaMth.addListener(handler);
  });
  }

var returnActLink = () => prodLinks[index];

   return {handler, returnActLink, close: closeEl}

})();

/* harmony default export */ __webpack_exports__["a"] = (products);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


 
var accordTeam = (function() {

  var list = document.body.querySelector('.c-team__accord'),
    items = list.querySelectorAll('.c-team__team-card'),
    accoTrigger = list.querySelectorAll('.team-card__title'),
   itemsAr = Array.prototype.slice.call(items),
   unboundForEach = Array.prototype.forEach,
   forEach = Function.prototype.call.bind(unboundForEach),
   index;


  function accoAnimate(e) {

    var itemAct = e.target.parentElement,
      indexNew = itemsAr.indexOf(itemAct);
   
    if(isFinite(index) && indexNew!==index) {

      items[index].classList.remove('is-active');
    }

    index = indexNew;
    setTimeout(function () { itemAct.classList.toggle('is-active');}, 
      700);
  }
  

  function handler() {

       forEach(accoTrigger, function (el) {

           el.addEventListener('click', accoAnimate, false);
      });      
}
    
  return { handler }

})();

/* harmony default export */ __webpack_exports__["a"] = (accordTeam);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


 
var accordMenu = (function() {

  var page = document.body.querySelector('.l-page.l-menu'),
    list = page.querySelector('.c-menu__accord'),
    items = list.querySelectorAll('.c-menu__menu-card'),
    accoTrigger = list.querySelectorAll('.menu-card__title'),
    contents = list.querySelectorAll('.menu-card__content'),
    itemsAr = Array.prototype.slice.call(items),
    mediaMth = window.matchMedia("(max-width: 480px)"),
    unboundForEach = Array.prototype.forEach,
    forEach = Function.prototype.call.bind(unboundForEach),
    siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n),
    stlPage,
    wdtPage,
    stlTrigger,
    index,
    wdtTrigger,
    wdtContent,
    flagAnimate,
    flClose;

  
  function accoAnimate(e) {

    if(!flagAnimate) {

      flagAnimate =1;

      var itemAct = this.parentElement,
      
      indexNew = itemsAr.indexOf(itemAct);

      if(isFinite(index) && indexNew!==index) {

         items[index].classList.remove('is-active');
      }

      index = indexNew;
   
      setTimeout(function () { 

        itemAct.classList.toggle('is-active'); }, 700);

      flagAnimate =0;
    }

    return
  }
  

  function closeElMobile(e) {

    var contentAct = this.parentElement,
        itemAct = contentAct.parentElement,
        index = itemsAr.indexOf(itemAct);

    itemAct.classList.remove('is-active');
    contentAct.style.width = `0px`;
    contentAct.style.transition = `width 0.4s`;
    list.style.transform = `translateX(0px)`;
    list.style.transition = `transform 0.4s`;
    this.removeEventListener('click', closeElMobile, false);
    flClose =0;
  }


  function accoMobileAnimate(e) {

    if(!flagAnimate) {

      flagAnimate =1;

      var itemAct = this.parentElement,
      indexNew = itemsAr.indexOf(itemAct),
      contentAct = contents[indexNew],
      close = itemAct.querySelector('.c-close-menu');

      if(isFinite(index) && indexNew!==index) {

         items[index].classList.remove('is-active');
         contents[index].style.width = `0px`;
         contents[index].style.transition = `width 0.4s`;
         list.style.transform = `translateX(0px)`;
         list.style.transition = `transform 0.5s`;
         close.removeEventListener('click', closeElMobile, false);
         flClose =0;
      }

      index = indexNew;
   
      setTimeout(function () { itemAct.classList.toggle('is-active');

        flClose = (flClose)?1:0;

        if(flClose) {

          contentAct.style.width = `0px`;
          contentAct.style.transition = `width 0.4s`;
          list.style.transform = `translateX(0px)`;
          list.style.transition = `transform 0.5s`; 
          close.removeEventListener('click', closeElMobile, false);
          flClose = 0; 
        }

        else {

          var trX = itemAct.indTransform * parseInt(wdtTrigger);

          contentAct.style.width = `${wdtContent}px`; 
          contentAct.style.transition = `width 0.9s`;
          list.style.transform = `translateX(${trX}px)`;
          list.style.transition = `transform 0.9s`;
          close.addEventListener('click', closeElMobile, false);
          flClose = 1;
        }  
      }, 700);

      flagAnimate =0;
    }

    return
  }


  function mobileHandler() {

    stlPage = window.getComputedStyle(page, null);
    wdtPage = stlPage.width;
    stlTrigger = window.getComputedStyle(accoTrigger[0], null);
    wdtTrigger = stlTrigger.width;
   // wdtContent = parseInt(wdtPage) - parseInt(wdtTrigger)*itemsAr.length;
    wdtContent = parseInt(wdtPage) - parseInt(wdtTrigger);

    // calculate indexs for translateX list
    var lastInd = items.length-1;
    for (var i = 0; i<=lastInd; i++) {

      items[lastInd-i].indTransform = i;
    }

    //start events
    forEach(accoTrigger, function (el) {

         el.addEventListener('click', accoMobileAnimate, false); }); 
  }


  function handler() {

      if(mediaMth.matches) mobileHandler();

      else forEach(accoTrigger, function (el) {

           el.addEventListener('click', accoAnimate, false); }); 
  }
    
  return { handler }

})();

/* harmony default export */ __webpack_exports__["a"] = (accordMenu);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map