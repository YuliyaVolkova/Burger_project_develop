

'use strict';

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

export default prodDesc;
