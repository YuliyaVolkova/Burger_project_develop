
var formOrder = (function() {

  'use strict';

	var form = document.body.querySelector('#order'),
     popUpTmpl = document.body.querySelector('#orderModalTempl'),
     ovWaiTmpl = document.body.querySelector('#orderWaitTempl'),
     overlay,
     popUpText,
     close,
     mes = '';

  function isEsc(e) {

        switch(e.which) {
          case 27: closePopUp(e);
            break;
          
          default: return;
        }
      
      return false;
    }

  function openOverlayWait() {
    
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = ovWaiTmpl.innerHTML;
    document.body.appendChild(overlay);
  }

  function openPopUp(mes, reset) {

    overlay.innerHTML = popUpTmpl.innerHTML;
    popUpText = overlay.querySelector('.c-modal-order__content');
    close = overlay.querySelector('.c-close--order');
    popUpText.textContent = mes;
    close.addEventListener('click', closePopUp, false);
    document.body.addEventListener('keydown', isEsc, false);
    if(reset==='reset') form.reset();
  }

  function closePopUp(e) {

    e.preventDefault();
    console.log(e, close);
    setTimeout(function () {

        close.removeEventListener('click', closePopUp, false);
        document.body.removeEventListener('keydown', isEsc, false);
        overlay.remove();
        
      }, 50);
   }

  function sendData(form) {

    var XHR = new XMLHttpRequest(),
      method = form['method'],
      action = form['action'],
      
    // Bind the FormData object and the form element
     FD = new FormData(form);
    
    // Define what happens on successful data submission
    XHR.addEventListener("load", function(event) {
        if (this.readyState == 4 && this.status == 200) {
          var resp = JSON.parse(this.response);
            mes = resp.mes||'ошибка сети';
            if(resp.mes&&resp.status==='OK')  openPopUp(mes, 'reset');
            else openPopUp(mes);
        }     
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {

      openPopUp('oшибка сети, не удалось связаться с сервером');
    });

    // Set up our request
    XHR.open(method, action);

    // The data sent is what the user provided in the form
    XHR.send(FD);
    openOverlayWait();
  }

  function handler() {
    
    var validData = new Validator(form, function (err, res) {

      form.addEventListener('submit', function (e) {
        e.preventDefault();                        }, false);

       if(res&&err===null) sendData(form);
    });
  }   

   return {handler}

})();

export default formOrder;
