
import mapMarkImg from '../../../assets/images/content/map/map-marker.svg';
import Data from './map_source.json';

'use strict';

function initMap() {
  
   var MultiGeocoder = require('multi-geocoder'),

    mapRgn = 'Saint-Peterburg',

    pointsAddr = [],

    balloonTxt = 'Бургеры у нас - быстро, вкусно, сытно, ждем по адресу:',
    
    iconImgHref = mapMarkImg,
    iconImgSize = [46, 57],
    iconImgOffset = [-23, -57],
   	mapCoor = [],
    pointsCoor = [],
    geocoder = new MultiGeocoder({ provider: 'yandex-cache', coordorder: 'latlong'});
  
    for (let key in Data) {

      pointsAddr[key] = {};
      pointsAddr[key].name = Data[key].name;
      pointsAddr[key].address = mapRgn + ', ' + Data[key].address;
    }

    geocoder.geocode([mapRgn])
    .then(function (res) {

    	mapCoor = res.result.features[0].geometry.coordinates;
        var myPlacemarks = [],
        countPls = 0,
        myClusterer = new ymaps.Clusterer({clusterDisableClickZoom: true}),
        myMap = new ymaps.Map('map', {
            center: mapCoor,
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

        myMap.behaviors.disable('scrollZoom');

        for (var i = 0; i < pointsAddr.length; i++) {
         
          geocoder.geocode([pointsAddr[i].address])
         .then(function(res) {

            pointsCoor[countPls] = res.result.features[0].geometry.coordinates;

            var resAddr= res.result.features[0].properties.name;
           
           for (var i = 0; i < pointsAddr.length; i++) {
              if(pointsAddr[i].address.indexOf(resAddr)!==-1) var indAddr = i;
            }

           myPlacemarks[countPls] = new ymaps.Placemark(pointsCoor[countPls], 

              { 
                clusterCaption: pointsAddr[indAddr].name,
                balloonContentHeader: pointsAddr[indAddr].name,
                balloonContentBody: balloonTxt,
                balloonContentFooter: pointsAddr[indAddr].address,
                hintContent: pointsAddr[indAddr].name
              },
             {  
                iconLayout: "default#image",
                iconImageHref: iconImgHref,
                iconImageSize: iconImgSize,
                iconImageOffset: iconImgOffset
             },
            );
           myClusterer.add(myPlacemarks[countPls]);
           countPls++;
            myMap.geoObjects.add(myClusterer);
          });
        }
    });
  }
    	
export default initMap;

