

'use strict';

var reviewModal = (function() {

	var sect = document.body.querySelector('.l-page#six'),
		targs = sect.querySelectorAll('.c-button--feeds'),
		modalTempl = document.body.querySelector('#reviewModalTempl'),
		overlay,
		close, 
	   unboundForEach = Array.prototype.forEach,
       forEach = Function.prototype.call.bind(unboundForEach);
 
	
  function isEsc(e) {

        switch(e.which) {
          case 27: closeWindow(e);
            break;
          
          default: return;
        }
      
      return false;
    }   


	function openWindow(e) {

		e.preventDefault();

		overlay = document.createElement('div');
		overlay.classList.add('overlay');
		overlay.innerHTML = modalTempl.innerHTML;
		
		document.body.appendChild(overlay);
		close = overlay.querySelector('.c-close--review');
		close.addEventListener('click', closeWindow, false);
		document.body.addEventListener('keydown', isEsc, false);
  	}
  	

  	function closeWindow(e) {

  		e.preventDefault();

  		setTimeout(function () {

  			close.removeEventListener('click', closeWindow, false);
  			document.body.removeEventListener('keydown', isEsc, false);
  			overlay.remove();
  			
  		}, 50);
 	 }

 
	function handler() {

    	forEach(targs, function (el) {

    		el.addEventListener('click', openWindow, false);
    		
    	});	
	}

   return {handler}

})();

export default reviewModal;
