
'use strict';
 
var accordMenu = (function() {

  var page = document.body.querySelector('.l-page.l-menu'),
    list = page.querySelector('.c-menu__accord'),
    items = list.querySelectorAll('.c-menu__menu-card'),
    accoTrigger = list.querySelectorAll('.menu-card__title'),
    contents = list.querySelectorAll('.menu-card__content'),
    itemsAr = Array.prototype.slice.call(items),
    mobileMth = window.matchMedia("(max-width: 480px)"),
    tabletMth = window.matchMedia("(max-width: 768px)"),
    unboundForEach = Array.prototype.forEach,
    forEach = Function.prototype.call.bind(unboundForEach),
    stlPage,
    wdtPage,
    stlTrigger,
    index,
    wdtTrigger,
    wdtContent,
    flagAnimate,
    flClose;

  //* common case animation
  function accoAnimate(e) {

    if(!flagAnimate) {

      //* set start animation flag
      flagAnimate =1;

      //* get active item
      var itemAct = this.parentElement,
      
      //* get index active item
      indexNew = itemsAr.indexOf(itemAct);

      //* case of click not first and click on different items
      //* need close prev item
      if(isFinite(index) && indexNew!==index) {

         items[index].classList.remove('is-active');
      }

      //* set new index
      index = indexNew;
   
      //* set timer on 0.7s and open if click on different items
      //*  or toggle if same item click  
      setTimeout(function () { 

        itemAct.classList.toggle('is-active'); }, 700);

      //* set end animation flag
      flagAnimate =0;
    }

    return
  }
  

  function closeElMobile(par) {

    var contentAct = (par.target)?par.currentTarget.parentElement:contents[par] ,
        itemAct = (isFinite(par))?items[par]:contentAct.parentElement,
        close = itemAct.querySelector('.c-close-menu');

    itemAct.classList.remove('is-active');
    contentAct.style.width = `0px`;
    contentAct.style.transition = `width 0.4s`;
    list.style.transform = `translateX(0px)`;
    list.style.transition = `transform 0.4s`;
    close.removeEventListener('click', closeElMobile, false);
    flClose =0;
  }


  function accoMobileAnimate(e) {

    if(!flagAnimate) {

      flagAnimate =1;

      var itemAct = this.parentElement,
    
      index = itemsAr.indexOf(itemAct),
     
      contentAct = contents[index],
      close = itemAct.querySelector('.c-close-menu');
   
      setTimeout(function () { 

        flClose = (flClose)?1:0;

        //* case to close
        if(flClose) closeElMobile(index);

        //* case to open
        else {

          itemAct.classList.add('is-active');

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


  function accoTabletAnimate(e) {
    
    if(!flagAnimate) {

      flagAnimate =1;

      var itemAct = this.parentElement,
      indexNew = itemsAr.indexOf(itemAct),
      contentAct = contents[indexNew];

      //* case of click not first and click on different items
      //* need to close prev item
      if(isFinite(index) && indexNew!==index) {

        items[index].classList.remove('is-active');
         contents[index].style.width = `0px`;
         contents[index].style.transition = `width 0.4s`;
         flClose =0;
      }

      //* set new index
      index = indexNew;

      //* set timer on 0.7s and open if click on different items
      //*  or toggle if same item click  
      setTimeout(function () { 
        
        itemAct.classList.toggle('is-active');

        flClose = (flClose)?1:0;

        if(flClose) {

          contentAct.style.width = `0px`;
          contentAct.style.transition = `width 0.4s`;
          flClose = 0; 
        }

        else {

          contentAct.style.width = `${wdtContent}px`; 
          contentAct.style.transition = `width 0.9s`;
          flClose = 1;
        }  
      }, 700);

      flagAnimate =0;
    }

    return
  }


  //* detect screen mobile or tablet, 
  //* calculate width content and run event handler
  function portableHandler() {

    stlPage = window.getComputedStyle(page, null);
    wdtPage = stlPage.width;
    stlTrigger = window.getComputedStyle(accoTrigger[0], null);
    wdtTrigger = stlTrigger.width;

    //* if mediaQuery return detect mobile
    if(mobileMth.matches) {

      //* calculate width content open
      wdtContent = parseInt(wdtPage) - parseInt(wdtTrigger);

      //* calculate indexs for translateX list
      var lastInd = items.length-1;
      for (var i = 0; i<=lastInd; i++) {

        items[lastInd-i].indTransform = i; 
        
      }
     
      //* start mobile events handler
    forEach(accoTrigger, function (el) {

         el.addEventListener('click', accoMobileAnimate, false); }); 
    }

    //* else if mediaQuery return detect tablet
    else {
      
      //* calculate width content open
      wdtContent = parseInt(wdtPage) - parseInt(wdtTrigger)*itemsAr.length;
    
    //start tablet events handler
    forEach(accoTrigger, function (el) {

         el.addEventListener('click', accoTabletAnimate, false); }); 
    }
  }

  //detect portable screen or not and run handler
  function handler() {
     
      if(tabletMth.matches) portableHandler();

      else forEach(accoTrigger, function (el) {

           el.addEventListener('click', accoAnimate, false); }); 
  }
    
  return { handler }

})();

export default accordMenu;