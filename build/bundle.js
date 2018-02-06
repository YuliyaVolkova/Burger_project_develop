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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_scroll_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_c_mobile_nav_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_slider_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_c_product_desc_js__ = __webpack_require__(6);









window.onload = function () {
	
	__WEBPACK_IMPORTED_MODULE_1__components_scroll_js__["a" /* default */].handler();
	__WEBPACK_IMPORTED_MODULE_3__components_slider_js__["a" /* default */].handler();
	__WEBPACK_IMPORTED_MODULE_4__components_c_product_desc_js__["a" /* default */].handler();
	__WEBPACK_IMPORTED_MODULE_2__components_c_mobile_nav_js__["a" /* default */].handler();

}

console.log("It` work %%%!");





/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



var scrollPage = (function() {

	var screen = 0,
		flag = false,
    container = document.body.querySelector('.l-wrapper'),
    pages = container.querySelectorAll('.l-page'),
    nextBut = container.querySelector('#next'),
    orderButs = container.querySelectorAll('.c-button__link[data-section="gotoOrder"]'),
    mainNav = container.querySelectorAll('.c-main-nav__link'),
    mobNav = document.body.querySelectorAll('.c-mobile-nav__link'),
    mob = document.body.querySelector('.c-mobile-nav'),
    mobMenu = mob.querySelector('.c-mobile-nav__menu'),
    mobLogo = mob.querySelector('.c-logo--mob-nav'),
    mobClose = mob.querySelector('.c-close--mob-nav'),
    dotLinks = document.body.querySelectorAll('.c-nav-dots__link'),
    dotItems = document.body.querySelectorAll('.c-nav-dots__item'),
    nodesDotLk = Array.prototype.slice.call(dotLinks),
    nodesPages = Array.prototype.slice.call(pages);
   
   /// check device is mobile

  function isMobileDevice() {

    const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
               'BlackBerry|Windows Phone|'  +
               'Opera Mini|IEMobile|Mobile' , 
              'i');   //The /expression/i makes the search case insensitive
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || testExp.test(navigator.userAgent)
  }

  function checkIndex(ind) {

    var maxIndSect = pages.length -1;
    if(ind < 0) ind = 0;
    else if(ind > maxIndSect) ind = maxIndSect;
    return ind
  }

  function navMenuAct(item) {

     item.classList.add('is-active');
   //   var siblings = n => [...n.parentElement.children].filter(c=>c!=n);
      var siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n);
      [].forEach.call(siblings(item), function(el) {
        if(el.classList.contains('is-active'))  el.classList.remove('is-active');
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

      if (dir = 'down') screen++;
      else if (dir = 'up')  screen--;
      showSect(screen);
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
        //handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
        e.preventDefault();
        handletouch(dir);
    }, false);
}

  function closeMenu() {

    mob.classList.remove('is-active');
    mobMenu.classList.add('visually-hidden');
    mobLogo.classList.add('visually-hidden');
    mobClose.classList.add('visually-hidden');

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

    screen = checkIndex(ind);
    navMenuAct(dotItems[screen]);
    move(screen); 
  }

  function clickDotMenu(e) {

   e.preventDefault();

     screen = nodesDotLk.indexOf(this);
     showSect(screen);   
  }

  function clickMainNav(e) {

    e.preventDefault();

    console.log(e.target);

    var href = e.target.href,
      hashInd = href.indexOf('#'),
      pageId = href.slice(hashInd),
      page = container.querySelector(pageId),
      screen = nodesPages.indexOf(page);

      if(e.target.classList.contains('c-mobile-nav__link')) {

        closeMenu();
      }

      showSect(screen);
  }


  function mouse(e) {

    e.preventDefault();

    if(!flag) {

      flag=true;

    	var y=e.deltaY || e.detail || e.wheelDelta;
      
   		if(y<0)  screen--;

		  else if (y>0)	 screen ++;
        
         showSect(screen);
          
      setTimeout(function() {flag=false;}, 800);
    }
  }

  function keyDown(e) {

    var tag = e.target.tagName.toLowerCase();
    
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

    
	function handler() {

    container.addEventListener("wheel", mouse, false);
        /** DOMMouseScroll is for mozilla. */
    container.addEventListener('DOMMouseScroll', mouse, false);
    
    document.addEventListener('keydown', keyDown, false);

   // if(isMobileDevice()) onTouch(container);

    nextBut.addEventListener('click', clickMainNav, false);
  
    var unboundForEach = Array.prototype.forEach,
        forEach = Function.prototype.call.bind(unboundForEach);

    forEach(dotLinks, function (el) {

           el.addEventListener('click', clickDotMenu, false);
      });

    forEach(mainNav, function (el) {

           el.addEventListener('click', clickMainNav, false);
      });

    forEach(orderButs, function (el) {

           el.addEventListener('click', clickMainNav, false);
      });

    forEach(mobNav, function (el) {

           el.addEventListener('click', clickMainNav, false);
      });
	}

   return {handler}

})();

/* harmony default export */ __webpack_exports__["a"] = (scrollPage);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



var mobileNav = (function() {

	var mobNav =document.body.querySelector('.c-mobile-nav'),
	   mobTarg = mobNav.querySelector('.c-mobile-nav__target'),
	   mobMenu = mobNav.querySelector('.c-mobile-nav__menu'),
	   mobLogo = mobNav.querySelector('.c-logo--mob-nav'),
	   mobClose = mobNav.querySelector('.c-close--mob-nav');


	function openMenu(e) {

		e.preventDefault();

		var targ = this;
		targ.parentElement.classList.add('is-active');

		var siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n);

		[].forEach.call(siblings(targ), function(el) {
       if(el.classList.contains('visually-hidden'))  el.classList.remove('visually-hidden');
     });

  	}

  	function closeMenu(e) {

  	e.preventDefault();

		var close = this;
		close.parentElement.classList.remove('is-active');
		this.classList.add('visually-hidden');
		mobMenu.classList.add('visually-hidden');
		mobLogo.classList.add('visually-hidden');
 	 }

 
	function handler() {

    var unboundForEach = Array.prototype.forEach,
        forEach = Function.prototype.call.bind(unboundForEach);

     mobTarg.addEventListener('click', openMenu, false);
     mobClose.addEventListener('click', closeMenu, false);
	}

   return {handler }

})();

/* harmony default export */ __webpack_exports__["a"] = (mobileNav);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


 
var slider = (function() {

  var section = document.body.querySelector('.l-page.l-slider#three'),
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

    removeRefClass();

        switch(e.which) {
          case 37: {
            
              index--; 
              list.classList.add('is-reversing');
              changeOrder();
            }
            break;
          case 39: {

              index++; 
              list.classList.remove('is-reversing');
              changeOrder();
            }
            break;
          default: return;
        }
      
      return false;
    }

  function handler() {

    control.addEventListener('click', button, false);
    section.addEventListener('keydown', keyDown, false);
       
}
    
  return { handler }

})();

/* harmony default export */ __webpack_exports__["a"] = (slider);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";




var prodDesc = (function() {

	var slider =document.body.querySelector('.c-slider__list'),
	   prodLinks = slider.querySelectorAll('.c-products__link'),
       closeTablet = slider.querySelectorAll('.c-close-prod');


  function openDesc(e) {

  	var desc = this.querySelector('.c-products__desc');

  	if (desc.classList.contains('visually-hidden')) {

  		desc.classList.remove('visually-hidden');
  	}
  }

  function closeDesc(e) {

  	var link = this;
  	if(window.innerWidth > 768) {
  	
  	setTimeout(function () {

  		link.querySelector('.c-products__desc').classList.add('visually-hidden');
  	}, 700);
 	}
  }

  function closeDescTabl(e) {
  	
  	this.parentElement.classList.add('visually-hidden');

  }
 
function handler() {

    var unboundForEach = Array.prototype.forEach,
        forEach = Function.prototype.call.bind(unboundForEach);

   forEach(prodLinks, function (el) {

           el.addEventListener('mouseover', openDesc, false);
           el.addEventListener('mouseleave', closeDesc, false);
      });

    forEach(closeTablet, function (el) {

           el.addEventListener('click', closeDescTabl, false);
      });

    
	}

   return {handler}

})();

/* harmony default export */ __webpack_exports__["a"] = (prodDesc);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map