
'use strict';

 var loadFullImages = ()=> {
    let imageEls = [].slice.call(document.querySelectorAll('.c-burger'));
    imageEls.forEach((imageEl) => {
        loadFullImage(imageEl);
    });


 function loadFullImage(item) {

        const img = new Image();
        img.src = item.getAttribute('data-replace');
        console.log(img.src);
        img.className = 'c-burger__img reveal';
        if (img.complete) {
            phaseInImg(item, img);
        } else {
            img.addEventListener('load', function fullImageLoaded() {
                phaseInImg(item, img);
                img.removeEventListener('load', fullImageLoaded);
            })
        }
    }
 
    /* adds full image element to page, removes placeholder element */
    function phaseInImg(item, img) {
        item.classList.remove('replace');
        let previewImage = item.querySelector('.burger-preview');
                item.removeChild(previewImage);
        item.appendChild(img)
            .addEventListener('animationend', function phaseOutPreview(e) {
                e.target.classList.remove('reveal');
                e.target.removeEventListener('animationend', phaseOutPreview);
            })
    }
}

export default loadFullImages;
