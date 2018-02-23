
// import styles

import '../assets/styles/sass/main.scss';

// import js modules

import isMobileDevice from './components/detect_mobile.js';
import onTouch from './components/swipe.js';
import mobileNav from './components/c-mobile_nav.js';
import initMap from './components/yand_map.js';
import slider from './components/slider.js';
import products from './components/c-product_desc.js';
import AccordTeam from './components/team_vert_acco.js';
import accordMenu from './components/menu_gor_acco.js';
import reviewModal from './components/review_modal.js';
import formOrder from './components/form_order.js';


// OPS
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
    isMobile = (isMobileDevice())?1:0;
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

      document.body.removeEventListener('keydown', slider.keyDown, false);
      var prodLink = products.returnActLink();
      if(prodLink) products.close(prodLink);
    }
     switch(screen) {
          case 2: slider.handler(); 
                  products.handler();
            break;
          case 3: AccordTeam.handler();
             break;
          case 4: accordMenu.handler();
             break;
          case 5: reviewModal.handler();
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

        mobileNav.closeMenu(e);
      }

      showSect(screen);
  }


  function mouseWheel(e) {

    e.preventDefault();

    if(flag) return;

      flag=true;

    	var y=e.deltaY || e.detail || e.wheelDelta;
      prevScreen = screen;
      
   		if(y<0)  screen--;

		  else if (y>0)	 screen ++;
        
      showSect(screen);
          
      setTimeout(function() {flag=false;}, 1000);
  }


  function keyDown(e) {

    var tag = e.target.tagName.toLowerCase();

        switch(e.which) {
          case 38: 
            if (tag != 'input' && tag != 'textarea') {
              prevScreen = screen;
              screen--; 
              showSect(screen);
            }
            break;
          case 40:
            if (tag != 'input' && tag != 'textarea') {
              prevScreen = screen;
              screen++; 
              showSect(screen);
            }
            break;
          default: return;
        }
      
      return false;
    }

    function mobilePageSwipe() { 

      onTouch(document.body, function (dir) {
        
        if(flag) return;
          flag=true;
        
        if (dir === 'down') {
          prevScreen = screen;
          screen--;
        }

        else if (dir === 'up') { 
          prevScreen = screen;
          screen++;
        }

        console.log(screen, 'screen');
        showSect(screen);
        setTimeout(function() {flag=false;}, 100);
       //flag=false;
      });
    }

    
	function handler() {

    formOrder.handler();
   // ymaps.ready(initMap);

    if(mediaMth.matches) {

      mediaMth.addListener(mobileNav.handler);
      mobileNav.handler(mediaMth);

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
ymaps.ready(initMap);

	

console.log("It` work %%%!");



