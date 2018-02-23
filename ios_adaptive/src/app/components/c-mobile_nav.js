
'use strict';

var mobileNav = (function() {

	var mobNav =document.body.querySelector('.c-mobile-nav'),
	   mobTarg = mobNav.querySelector('.c-mobile-nav__target'),
	   mobMenu = mobNav.querySelector('.c-mobile-nav__menu'),
	   mobLogo = mobNav.querySelector('.c-logo--mob-nav'),
	   mobClose = mobNav.querySelector('.c-close--mob-nav'),
	   unboundForEach = Array.prototype.forEach,
       forEach = Function.prototype.call.bind(unboundForEach),

    siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n);


	function isEsc(e) {

        switch(e.which) {
          case 27: closeMenu(e);
            break;
          
          default: return;
        }
      
      return false;
    }   


	function openMenu(e) {

		e.preventDefault();

		var targ = this;
		targ.parentElement.classList.add('is-active');

		[].forEach.call(siblings(targ), function(el) {
       if(el.classList.contains('visually-hidden'))  el.classList.remove('visually-hidden');
     });
		document.body.addEventListener('keydown', isEsc, false);

  	}
  	

  	function closeMenu(e) {

  		e.preventDefault();

		mobNav.classList.remove('is-active');
		mobClose.classList.add('visually-hidden');
		mobMenu.classList.add('visually-hidden');
		mobLogo.classList.add('visually-hidden');
 	 }

 
	function handler(mq) {

		if (mq.matches) {

    	 mobTarg.addEventListener('click', openMenu, false);
     	mobClose.addEventListener('click', closeMenu, false);
		} 

		else {
			mobTarg.removeEventListener('click', openMenu, false);
     		mobClose.removeEventListener('click', closeMenu, false);
		}
	}

   return {handler, closeMenu}

})();

export default mobileNav;
