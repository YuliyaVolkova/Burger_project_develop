
'use strict';
 
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

export default accordMenu;