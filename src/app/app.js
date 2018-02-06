
import '../assets/styles/sass/main.scss';

import scrollPage from './components/scroll.js';
import mobileNav from './components/c-mobile_nav.js';
import slider from './components/slider.js';
import prodDesc from './components/c-product_desc.js';


window.onload = function () {
	
	scrollPage.handler();
	slider.handler();
	prodDesc.handler();
	mobileNav.handler();

}

console.log("It` work %%%!");



