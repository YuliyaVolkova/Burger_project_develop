
'use strict';

var mobileNav = (function() {

	var mobNav =document.body.querySelector('.c-mobile-nav'),
	   mobTarg = mobNav.querySelector('.c-mobile-nav__target'),
	   mobMenu = mobNav.querySelector('.c-mobile-nav__menu'),
	   mobLogo = mobNav.querySelector('.c-logo--mob-nav'),
	   mobClose = mobNav.querySelector('.c-close--mob-nav');


	function openMenu(e) {

		e.preventDefault();

		var targ = this;
		targ.parentElement.classList.add('is-active');

		var siblings = n => [].slice.call(n.parentElement.children).filter(c=>c!=n);

		[].forEach.call(siblings(targ), function(el) {
       if(el.classList.contains('visually-hidden'))  el.classList.remove('visually-hidden');
     });

  	}

  	function closeMenu(e) {

  	e.preventDefault();

		var close = this;
		close.parentElement.classList.remove('is-active');
		this.classList.add('visually-hidden');
		mobMenu.classList.add('visually-hidden');
		mobLogo.classList.add('visually-hidden');
 	 }

 
	function handler() {

    var unboundForEach = Array.prototype.forEach,
        forEach = Function.prototype.call.bind(unboundForEach);

     mobTarg.addEventListener('click', openMenu, false);
     mobClose.addEventListener('click', closeMenu, false);
	}

   return {handler }

})();

export default mobileNav;
