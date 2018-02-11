

'use strict';
 
var isMobileDevice = ()=> {

    const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
               'BlackBerry|Windows Phone|'  +
               'Opera Mini|IEMobile|Mobile' , 
              'i');   //The /expression/i makes the search case insensitive
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || testExp.test(navigator.userAgent)
  }

export default isMobileDevice;