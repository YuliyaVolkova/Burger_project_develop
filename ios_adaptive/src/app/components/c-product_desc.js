

'use strict';

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

export default products;
