
'use strict';
 
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
      400);
  }
  

  function handler() {

       forEach(accoTrigger, function (el) {

           el.addEventListener('click', accoAnimate, false);
      });      
}
    
  return { handler }

})();

export default accordTeam;