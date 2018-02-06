
'use strict';
 
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

export default slider;