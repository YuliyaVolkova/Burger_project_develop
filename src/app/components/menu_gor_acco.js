
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
    flTClose = 1,
    flClose = 0;

  /* // common case animation second variant
  function accoAnimate(e) {

    if(flagAnimate) return;

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

        itemAct.classList.toggle('is-active'); 
        flagAnimate =0;}, 700);

    return
  }*/
  
  function accoAnimate(e) {
    
    if(flagAnimate) return;

      flagAnimate =1;

      var itemAct = this.parentElement,
      indexNew = itemsAr.indexOf(itemAct),
      contentAct = contents[indexNew];

      if(indexNew===index||(indexNew!==index)&&flTClose===1) {
    
        //* set new index
        index = indexNew;

        flTClose = (!flTClose)?1:0;

        if(flTClose) {

          itemAct.classList.remove('is-active');
          flTClose = 1; 
        }

        else {

          itemAct.classList.add('is-active');
          flTClose = 0;
          }  
      }

      else if(isFinite(index) && indexNew!==index&&flTClose===0) {

          items[index].classList.remove('is-active');
          index = indexNew;
          flTClose =1;
          itemAct.classList.add('is-active');
          flTClose = 0;
      }
      setTimeout(()=>{flagAnimate =0;}, 1000);

    return
  }

  function closeElMobile(par) {

    var contentAct = (par.target)?par.currentTarget.parentElement:contents[par],
        itemAct = (isFinite(par))?items[par]:contentAct.parentElement,
        close = itemAct.querySelector('.c-close-menu');

    itemAct.classList.remove('is-active');
    contentAct.style.width = `0px`;
    list.style.transform = `translateX(0px)`;
    list.style.WebkitTransform = `translateX(0px)`;
    list.style.msTransform = `translateX(0px)`;
    close.removeEventListener('click', closeElMobile, false);
    flClose = 0;
  }


  function accoMobileAnimate(e) {

    if(flagAnimate) return;

      flagAnimate =1;

      var itemAct = this.parentElement,
    
      index = itemsAr.indexOf(itemAct),
     
      contentAct = contents[index],
      close = itemAct.querySelector('.c-close-menu');

        flClose = (flClose)?1:0;

        //* case to close
        if(flClose) closeElMobile(index);

        //* case to open
        else {

          itemAct.classList.add('is-active');

          var trX = itemAct.indTransform * parseInt(wdtTrigger);

          contentAct.style.width = `${wdtContent}px`;
          // Code for Chrome, Safari, Opera
          list.style.WebkitTransform = `translateX(${trX}px)`; 
          // Code for IE9
          list.style.msTransform = `translateX(${trX}px)`;
          // Standard syntax 
          list.style.transform = `translateX(${trX}px)`;
          close.addEventListener('click', closeElMobile, false);
          flClose = 1;
        }  
      setTimeout(()=>{flagAnimate =0;}, 1000);

    return
  }


  function accoTabletAnimate(e) {
    
    if(flagAnimate) return;

      flagAnimate =1;

      var itemAct = this.parentElement,
      indexNew = itemsAr.indexOf(itemAct),
      contentAct = contents[indexNew];

      if(indexNew===index||(indexNew!==index)&&flTClose===1) {
       
        //* set new index
        index = indexNew;

          flTClose = (!flTClose)?1:0;

        if(flTClose) {

          itemAct.classList.remove('is-active');
          contentAct.style.width = `0px`;
          flTClose = 1; 
        }
      else {

          itemAct.classList.add('is-active');
          contentAct.style.width = `${wdtContent}px`; 
          flTClose = 0;
        }  
      }
      //* case of click not first and click on different items
      //* need to close prev item

      else if(isFinite(index) && indexNew!==index&&flTClose===0) {

          items[index].classList.remove('is-active');
          contents[index].style.width = `0px`;
          index = indexNew;
          flTClose =1;
          itemAct.classList.add('is-active');
          contentAct.style.width = `${wdtContent}px`; 
          flTClose = 0;
      }

    setTimeout(()=>{flagAnimate =0;}, 1000);
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