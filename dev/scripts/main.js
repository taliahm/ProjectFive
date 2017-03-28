
//Name spacing
const giftApp = {};

giftApp.lcboKey = 'MDo0NmY2MDY1MC1mZThmLTExZTYtOTE2OC1lNzNiZDhlNzg0NTg6QnNPeHBzcFdONGR1SXAzdG1vS3Q4WnhNR3BTY1pROGc4MGM3';
//Alternate Key
// 'MDpkODE2NzI1ZS1mZGM4LTExZTYtODdlZi03MzlkMjFiYjEwYzg6TEw1Z0hoTjI2Vk1LNkZhZnVsV0FIM2JhbmFqazlSQ005ZXpO';
giftApp.mapsKey = 'AIzaSyD00uENO6Qambq9HrEUi91ypFcN0j7elWM';
giftApp.lcboUrl = 'http://lcboapi.com/';
giftApp.userBudget;
giftApp.userOccasion;
giftApp.userAlcoholChoice;
giftApp.userLatLng; 
giftApp.stressLevel;
giftApp.arrayForGoogle;
//Array of Occasions
giftApp.occasions = [
	{ 
		occasion: 'tuesday',
		stressLevel: false
	},
	{
		occasion: 'anniversary',
		stressLevel: true
	},
	{
		occasion: 'surprise',
		stressLevel: false
	},
	{
		occasion: 'meetingParents',
		stressLevel: true
	}, 
	{
		occasion: 'potluck',
		stressLevel: false
	}, 
	{
		occasion: 'dinnerBoss',
		stressLevel: true
	}, 
	{
		occasion: 'sorryGift',
		stressLevel: true
	}, 
	{
		occasion: 'netflixSpill',
		stressLevel: false
	}, 
	{
		occasion: 'gameNight',
		stressLevel: false
	}, 
	{
		occasion: 'holidayParty',
		stressLevel: true
	}, 
	{
		occasion: 'present',
		streeLevel: true
	}];

//Product Ajax request
giftApp.getLcboProductReturn = (userInput) => {
	giftApp.getAlcohol = $.ajax({
	    url: 'https://proxy.hackeryou.com',
	    dataType: 'json',
	    method:'GET',
	    data: {
	        reqUrl: 'http://lcboapi.com/products',
	        params: {
	            key: giftApp.lcboKey,
	            per_page: 100,
	            page: 1,
	            q: userInput
	        },
	        xmlToJSON: false
	    }
	});
	$.when(giftApp.getAlcohol).done(function(alcoholData){
		var firstArrayReturn = alcoholData.result;
		giftApp.getLcboProductReturnThree(firstArrayReturn, userInput)
	});
}

giftApp.getLcboProductReturnThree = (firstArrayReturn, userInput) => {
	giftApp.getAlcohol = $.ajax({
	    url: 'https://proxy.hackeryou.com',
	    dataType: 'json',
	    method:'GET',
	    data: {
	        reqUrl: 'http://lcboapi.com/products',
	        params: {
	            key: giftApp.lcboKey,
	            per_page: 100,
	            page: 5,
	            q: userInput
	        },
	        xmlToJSON: false
	    }
	});$.when(giftApp.getAlcohol).done(function(alcoholData){
		var thirdArrayReturn = alcoholData.result;
		giftApp.getLcboProductReturnTwo(firstArrayReturn, thirdArrayReturn, userInput)
	});
}

giftApp.getLcboProductReturnTwo = function(firstArrayReturn, thirdArrayReturn, userInput) {
	giftApp.getAlcoholTwo = $.ajax({
	    url: 'https://proxy.hackeryou.com',
	    dataType: 'json',
	    method:'GET',
	    data: {
	        reqUrl: 'http://lcboapi.com/products',
	        params: {
	            key: giftApp.lcboKey,
	            per_page: 100,
	            page: 3,
	            q: userInput
	        },
	        xmlToJSON: false
	    }
	});$.when(giftApp.getAlcoholTwo).done(function(alcoholDataTwo){
		let secondArrayReturn = alcoholDataTwo.result;
		let allResults = [...firstArrayReturn,...secondArrayReturn,...thirdArrayReturn];
            let combinedAlcoholArray = allResults.filter(function(item){
                  return item.image_url !== null;
            })
		// console.log(combinedAlcoholArray);
		giftApp.filterByPrimeCat(combinedAlcoholArray); //comment out if API is not working
	})

}

//Call to LCBO Api to get Stores by Product ID, there are five of these
giftApp.getLcboStores = function(id) {
	giftApp.lcboStorebyId = $.ajax({
		url: 'https://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: 'http://lcboapi.com/stores',
			params: {
				key: giftApp.lcboKey,
				product_id: id,
				page: 1,
				per_page: 100
			},
			xmlToJSON: false
		}
	});$.when(giftApp.lcboStorebyId).done(function(dataOne){
		const lcboStores = dataOne.result;
		// console.log('first pull', lcboStores);
		giftApp.getLcboStoresTwo(id, lcboStores);
	})
};

giftApp.getLcboStoresTwo = function(id, firstResult) {
	giftApp.lcboStorebyIdTwo = $.ajax({
		url: 'https://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: 'http://lcboapi.com/stores',
			params: {
				key: giftApp.lcboKey,
				product_id: id,
				page: 2,
				per_page: 100
			},
			xmlToJSON: false
		}
	});$.when(giftApp.lcboStorebyIdTwo).done(function(dataTwo){
		const lcboStoresTwo = dataTwo.result;
		const lcboStoresTogether = [...firstResult,...lcboStoresTwo];
            giftApp.getLcboStoresThree(id, lcboStoresTogether);
	})
};

giftApp.getLcboStoresThree = function(id, togetherResult) {
      giftApp.lcboStorebyIdThree = $.ajax({
            url: 'https://proxy.hackeryou.com',
            method: 'GET',
            dataType: 'json',
            data: {
                  reqUrl: 'http://lcboapi.com/stores',
                  params: {
                        key: giftApp.lcboKey,
                        product_id: id,
                        page: 5,
                        per_page: 100
                  },
                  xmlToJSON: false
            }
      });$.when(giftApp.lcboStorebyIdThree).done(function(dataThree){
            const lcboStoresThree = dataThree.result;
            const lcboStoresTogetherAgain = [...togetherResult,...lcboStoresThree];
            giftApp.getLcboStoresFour(id, lcboStoresTogetherAgain);
      })
};

giftApp.getLcboStoresFour = function(id, togetherResultAgain) {
      giftApp.lcboStorebyIdFour = $.ajax({
            url: 'https://proxy.hackeryou.com',
            method: 'GET',
            dataType: 'json',
            data: {
                  reqUrl: 'http://lcboapi.com/stores',
                  params: {
                        key: giftApp.lcboKey,
                        product_id: id,
                        page: 5,
                        per_page: 100
                  },
                  xmlToJSON: false
            }
      });$.when(giftApp.lcboStorebyIdFour).done(function(dataFour){
            const lcboStoresFour = dataFour.result;
            const lcboStoresAlmostDone = [...togetherResultAgain,...lcboStoresFour];
            giftApp.getLcboStoresFive(id, lcboStoresAlmostDone);
            // giftApp.calcLoopNumbers(lcboStoresTogether);
      })
};

giftApp.getLcboStoresFive = function(id, togetherResultAgainFinal) {
      giftApp.lcboStorebyIdFive = $.ajax({
            url: 'https://proxy.hackeryou.com',
            method: 'GET',
            dataType: 'json',
            data: {
                  reqUrl: 'http://lcboapi.com/stores',
                  params: {
                        key: giftApp.lcboKey,
                        product_id: id,
                        page: 4,
                        per_page: 100
                  },
                  xmlToJSON: false
            }
      });$.when(giftApp.lcboStorebyIdFive).done(function(dataFive){
            const lcboStoresFive = dataFive.result;
            const lcboStoresFinal = [...togetherResultAgainFinal,...lcboStoresFive];
            giftApp.convertStores(lcboStoresFinal); //comment out if API not working
      })
};

// if user manually enters location
giftApp.getUsersLocationManual = function() {
        var input = $('#autocomplete')[0];
        var constrain  = {componentRestrictions:{country:'CA'}};
        var autocomplete = new google.maps.places.Autocomplete(input, constrain);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            giftApp.inputLocationName = place.name;
            giftApp.inputLatitude = place.geometry.location.lat();
            giftApp.inputLongitude = place.geometry.location.lng();
        });
        google.maps.event.addDomListener(input, 'keydown', function(e) { 
        if (e.keyCode === 13) { 
            e.preventDefault(); 
         } 
        });
};

//Function to map over returned stores and pull out lat/lng for Google Markers
giftApp.convertStores = (array) => {
	giftApp.arrayForGoogle = array.map(function(item){
	     return [item.name, item.latitude, item.longitude, 1, item.address_line_1, item.address_line_2, item.city, item.postal_code, item.telephone]
      });
	giftApp.initMapLCBO(giftApp.arrayForGoogle); 
}

giftApp.filterByPrimeCat = (array) => {
		let idofEl = `#${giftApp.userAlcoholChoice}`;
		let filterParamSelector = $('#alcoholType').children(idofEl);
		const filterParam = filterParamSelector.attr('data-filterParam');
		const arrayByName = array.filter(function(element){
			return element.primary_category === filterParam;
		})
		giftApp.filterByBudget(arrayByName);
}


// this map script creates and displays the map object, don't mess with it!
giftApp.map;

giftApp.initMap = () => {
	giftApp.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 43.648342, lng: -79.398966},
		scrollwheel: false,
		zoom: 13, 
            styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"saturation":"0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#d6d4d4"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#0f4e84"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"11"},{"saturation":"18"}]}]
		});

// geolocation script below - this allows us to get user location
// if autolocation is allowed
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
      const infoWindowHere = new google.maps.InfoWindow({
            map: giftApp.map
      });
	const pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
		};

		infoWindowHere.setPosition(pos);
		infoWindowHere.setContent('Location found.');

		giftApp.map.setCenter(pos);
		giftApp.holdLocation = pos;
		const userLat = pos.lat;
		const userLong =  pos.lng;
		giftApp.userLatLng = `${userLat}, ${userLong}`;

	}, function() {
		// If users denies to auto locate, run these functions
		giftApp.userLocationManual();
            giftApp.getUsersLocationManual();
	});
	} else {
	// if browser doesn't support geolocation
	     handleLocationError(false, giftApp.map.getCenter());
	}
} // end giftApp.initMap

giftApp.userLocationManual = () => {
	let manualLocationEl = 
			`<form id="locationField">
                        <input id="autocomplete" placeholder="Enter your address" type="text"></input>
                        <input id="submitLocation" value="find" type="submit"></input>
                   </form>`
	let manualLocation = $('<div class="userLocationOverlay">').append(manualLocationEl);
	$('.alcoholResults').append(manualLocation);
      $('#submitLocation').on('click', function(e){
        e.preventDefault();
        $('.userLocationOverlay').hide();
    });
}


giftApp.setManualMarker = function(){
    var manualLocationInputted = {lat: giftApp.inputLatitude, lng: giftApp.inputLongitude}
    var userImage = './assets/mapMarkerUser.png'
    giftApp.map.setCenter(manualLocationInputted);
    var marker = new google.maps.Marker({
            position: {lat: giftApp.inputLatitude, lng: giftApp.inputLongitude},
            map: giftApp.map, 
            title: 'your Location',
            zIndex: 8,
            icon: userImage
        })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}// end geolocation script

//Adds "layer" over top of existing map to display LCBO stores
giftApp.initMapLCBO = (param) => {
	giftApp.setMarkers(giftApp.map);
}

giftApp.setMarkers = function(map) {
    giftApp.setManualMarker();
      let image = './assets/mapMarker.png';
	giftApp.arrayForGoogle.forEach(function(item){
		var marker = new google.maps.Marker({
			position: {lat: item[1], lng: item[2]},
			map: giftApp.map, 
			title: item[0],
			zIndex: item[3],
                  icon: image
		})

		var contentString = `<div id="infoWindow">
                                    <h6>LCBO Store at ${item[0]}</h6>
                                    <p>Address: ${item[4]}</p>
                                    <p>${item[6]} ${item[7]}</p>
                                    <p>Phone: ${item[8]}</p>
                                 </div>`;

            marker.addListener('click', function(){
                  giftApp.infoWindow ? giftApp.infoWindow.close() : null;
                  giftApp.infoWindow = new google.maps.InfoWindow({
                        content: contentString,
                  })
                  giftApp.infoWindow.open(map, marker);
            })
      })
}

giftApp.infoText = function() {
   $(".infoText").hide(); 
   $("button.infoTextButton").click(function(){
       $(this).toggleClass("active").next().slideToggle("fast");
   });
}

//EVENTS
giftApp.getUserChoice = () => {
	$('#giftMe').on('click', function(e){
		e.preventDefault();
            $('.mapContainer').fadeIn();
            giftApp.initMap();
            $('.userInput').hide(); //needs to be hide as animation comes in quickly
            $('.animation').addClass('createAnimation');
		giftApp.userBudget = $('#budget').val();
		giftApp.userOccasion = $('#occasion').val();
            giftApp.userOccasionContent = $('#occasion').find(':selected').text();
		giftApp.userAlcoholChoice = $('#alcoholType').val();
            giftApp.userAlcoholChoiceLC = giftApp.userAlcoholChoice.toLowerCase();
		giftApp.getLcboProductReturn(giftApp.userAlcoholChoice);  //comment out if API not working
		// giftApp.filterByPrimeCat(alcoholResults); //comment IN if API not working
		giftApp.getStressOfOccasion(giftApp.userOccasion);
	})
} //end of getUserChoice()

giftApp.confirmUserChoice = () => {
	$('#confirm').on('click', function(e){
		e.preventDefault();
		const idOfChoice = $('input[name=chooseAlcohol]:checked').data('id')
		giftApp.getLcboStores(idOfChoice); //comment out if API not working
            giftApp.smoothScroll('mapContainer');
            $('.zoomOut').fadeIn();
	})
}


giftApp.userChooseAgain = () => {
      $('#newSelection').on('click', function(){
            location.reload();
            //page reload, ignore everything else
            // e.preventDefault(); 
            // $('.animation').removeClass('createAnimation');
            // // $('.resultsShow').empty();
            // // $('.topDisplay').empty();
            // $('alcoholResults').empty();
            // $('.userInput').fadeIn();
            // giftApp.smoothScroll('header__placemat');
            // $('.alcoholResults').fadeOut();
            // $('.mapContainer').fadeOut();
            //  $('.zoomOut').fadeOut();
             // giftApp.deleteMarkers(); //empty array of markers
            // $('.userLocationOverlay').addClass('hideForGood');
      })
}

giftApp.closeZoomWindow = () => {
      $('#closeZoom').on('click', function(e){
            e.preventDefault();
            $('.zoomOut').fadeOut();
      })
}
//end of click events

//Filter returned Data from first set of Ajax calls
giftApp.filterByBudget = (finalArray) => {
	if(giftApp.userBudget === 'low'){
		const finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents < 2000;
		})
		giftApp.sortedArray(finalBudgetArray);
		// console.log('lowest of budget', finalBudgetArray);
		
	}
	else if(giftApp.userBudget === 'medium') {
		const finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents > 2001 && element.price_in_cents < 4000;
		})
		giftApp.sortedArray(finalBudgetArray);
		// console.log('medium of budgets', finalBudgetArray);
	} 
	else if(giftApp.userBudget === 'high') {
		const finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents > 4001;
		})
		giftApp.sortedArray(finalBudgetArray);
		// console.log('highest of budgets', finalBudgetArray);
	}
}

giftApp.sortedArray = (passedData) => {
	var sortedByAbv = _.sortBy(passedData, 'alcohol_content')
	const arrayHalfLength = Math.floor(sortedByAbv.length / 2);
	if (giftApp.stressLevel === false ) {
		let halfArray = sortedByAbv.slice(0, arrayHalfLength);
		giftApp.getFinalArray(halfArray);
	} 
	else {
		let halfArray = sortedByAbv.slice(arrayHalfLength, sortedByAbv.length);
		giftApp.getFinalArray(halfArray);
	}
} 

giftApp.getFinalArray = (array) => {
	let randomArray = _.shuffle(array);
	let finalArray = randomArray.slice(0, 6);
	giftApp.displayAlcohol(finalArray);
}

//Display results on page
giftApp.displayAlcohol = (array) => {
	$('.alcoholResults').show();
      giftApp.smoothScroll('alcoholResults');
	$('.resultsShow').empty();
      //show user's choice
      if(giftApp.userBudget === 'low') {
            var displayBudget = 'small';
      } else if(giftApp.userBudget === 'medium') {
            var displayBudget = 'medium';
      } else if(giftApp.userBudget === 'high') {
            var displayBudget = 'large';
      }
      let userChoiceElem = `<div class="choice">
                              <p>Looking for ${giftApp.userAlcoholChoiceLC} for ${giftApp.userOccasionContent} on a ${displayBudget} budget? These are our top picks.</p>
                            </div>
                            <div class="responsiveMessage">
                            <p>Please tap to select the gift of your choice, and scroll down to see where to buy.</p>
                            </div>`;
      let elemTogether = $('<div class="topDisplay">').append(userChoiceElem);
      $('.alcoholResults').prepend(elemTogether);
      //show selections from LCBO
	let elemArray = array.forEach((item) =>{
            if(item.style === null){
                  var styleDescription = 'Such a good drink';
            }
            else { var styleDescription = item.style}
		let elemString = `
		<input type="radio" checked=true name="chooseAlcohol" class="chooseAlcohol" data-id="${item.id}" id="${item.id}">
		<label class="resultsLabel" for="${item.id}">
			<div class="imageContain">
				<img src="${item.image_url}" alt="${item.name}">
			</div>
			<div class="resultsText">
				<h2>${item.name}</h2>
				<p>${item.origin}</p>
				<p>${styleDescription}</p>
				<p>${item.producer_name}</p>
		</label>`
		let allElems = $('<div class="resultItem">').append(elemString);
		$('.resultsShow').append(allElems);
	})
}

giftApp.getStressOfOccasion = (param) => {
	let filteredOccasion = giftApp.occasions.filter((item) => item.occasion === param);
	let truthie = filteredOccasion.map((item) => item.stressLevel);
	giftApp.stressLevel = truthie[0]
}

giftApp.smoothScroll = (targetElem) => {
      targetElem = $('.' + targetElem);
       $('html,body').animate({
        scrollTop: targetElem.offset().top},'slow');
}


giftApp.events = () => {
    giftApp.infoText();
	giftApp.getUserChoice();
      giftApp.confirmUserChoice();
      giftApp.userChooseAgain();
      giftApp.closeZoomWindow();
} //end of events()

giftApp.init = () => {
   	giftApp.events();
} //end of init();

$(function() {
   giftApp.init();
});


//API Data Stored in case of API Freeze
// const results = [
//   {
//     "id": 217,
//     "is_dead": false,
//     "name": "Queens Quay & Yonge",
//     "tags": "queens quay yonge 2 cooper street queen's toronto central toronto-central torontocentral m5e0b8",
//     "address_line_1": "2 Cooper Street",
//     "address_line_2": "Queen's Quay",
//     "city": "Toronto",
//     "postal_code": "M5E0B8",
//     "telephone": "(416) 864-6777",
//     "fax": "(416) 864-6863",
//     "latitude": 43.643,
//     "longitude": -79.3723,
//     "products_count": 4620,
//     "inventory_count": 165749,
//     "inventory_price_in_cents": 415709011,
//     "inventory_volume_in_milliliters": 120057193,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 540,
//     "monday_close": 1320,
//     "tuesday_open": 540,
//     "tuesday_close": 1320,
//     "wednesday_open": 540,
//     "wednesday_close": 1320,
//     "thursday_open": 540,
//     "thursday_close": 1320,
//     "friday_open": 540,
//     "friday_close": 1320,
//     "saturday_open": 540,
//     "saturday_close": 1320,
//     "updated_at": "2017-03-09T14:15:15.293Z",
//     "quantity": 52,
//     "updated_on": "2017-03-07",
//     "store_no": 217
//   },
//   {
//     "id": 1,
//     "is_dead": false,
//     "name": "Hwy 401 & Weston",
//     "tags": "hwy 401 weston 2625d road toronto north toronto-north torontonorth york m9n3w2",
//     "address_line_1": "2625D Weston Road",
//     "address_line_2": null,
//     "city": "North York",
//     "postal_code": "M9N3W2",
//     "telephone": "(416) 243-3320",
//     "fax": "(416) 243-0148",
//     "latitude": 43.7127,
//     "longitude": -79.531,
//     "products_count": 4199,
//     "inventory_count": 131252,
//     "inventory_price_in_cents": 232322918,
//     "inventory_volume_in_milliliters": 106570076,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": false,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 540,
//     "monday_close": 1380,
//     "tuesday_open": 540,
//     "tuesday_close": 1380,
//     "wednesday_open": 540,
//     "wednesday_close": 1380,
//     "thursday_open": 540,
//     "thursday_close": 1380,
//     "friday_open": 540,
//     "friday_close": 1380,
//     "saturday_open": 540,
//     "saturday_close": 1380,
//     "updated_at": "2017-03-09T14:15:16.615Z",
//     "quantity": 186,
//     "updated_on": "2017-03-07",
//     "store_no": 1
//   },
//   {
//     "id": 10,
//     "is_dead": false,
//     "name": "Yonge & Summerhill",
//     "tags": "yonge summerhill 10 scrivener square subway toronto central toronto-central torontocentral m4w3y9",
//     "address_line_1": "10 Scrivener Square",
//     "address_line_2": "Summerhill Subway",
//     "city": "Toronto",
//     "postal_code": "M4W3Y9",
//     "telephone": "(416) 922-0403",
//     "fax": "(416) 922-3104",
//     "latitude": 43.6809,
//     "longitude": -79.3905,
//     "products_count": 4746,
//     "inventory_count": 145908,
//     "inventory_price_in_cents": 408237632,
//     "inventory_volume_in_milliliters": 105735050,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": false,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 570,
//     "monday_close": 1320,
//     "tuesday_open": 570,
//     "tuesday_close": 1320,
//     "wednesday_open": 570,
//     "wednesday_close": 1320,
//     "thursday_open": 570,
//     "thursday_close": 1320,
//     "friday_open": 570,
//     "friday_close": 1320,
//     "saturday_open": 540,
//     "saturday_close": 1320,
//     "updated_at": "2017-03-09T14:15:14.594Z",
//     "quantity": 41,
//     "updated_on": "2017-03-07",
//     "store_no": 10
//   },
//   {
//     "id": 38,
//     "is_dead": false,
//     "name": "Rideau & King Edward",
//     "tags": "rideau king edward 275 street corner of and st ottawa k1n5y3",
//     "address_line_1": "275 Rideau Street",
//     "address_line_2": "Corner of King Edward and Rideau St",
//     "city": "Ottawa",
//     "postal_code": "K1N5Y3",
//     "telephone": "(613) 789-5226",
//     "fax": "(613) 241-7453",
//     "latitude": 45.4288,
//     "longitude": -75.6863,
//     "products_count": 4406,
//     "inventory_count": 124075,
//     "inventory_price_in_cents": 272025024,
//     "inventory_volume_in_milliliters": 93297447,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1320,
//     "tuesday_open": 600,
//     "tuesday_close": 1320,
//     "wednesday_open": 600,
//     "wednesday_close": 1320,
//     "thursday_open": 600,
//     "thursday_close": 1320,
//     "friday_open": 600,
//     "friday_close": 1320,
//     "saturday_open": 600,
//     "saturday_close": 1320,
//     "updated_at": "2017-03-09T14:15:52.297Z",
//     "quantity": 168,
//     "updated_on": "2017-03-07",
//     "store_no": 38
//   },
//   {
//     "id": 624,
//     "is_dead": false,
//     "name": "Innes & Tenth Line",
//     "tags": "innes tenth line 4220 rd unit #1 building f ottawa orleans ottawa-orleans ottawaorleans k4a5e6",
//     "address_line_1": "4220 Innes Rd",
//     "address_line_2": "Unit #1 Building F",
//     "city": "Orleans",
//     "postal_code": "K4A5E6",
//     "telephone": "(613) 837-5527",
//     "fax": "(613) 837-7026",
//     "latitude": 45.456,
//     "longitude": -75.4965,
//     "products_count": 3753,
//     "inventory_count": 110061,
//     "inventory_price_in_cents": 170554818,
//     "inventory_volume_in_milliliters": 84872754,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1260,
//     "tuesday_open": 600,
//     "tuesday_close": 1260,
//     "wednesday_open": 600,
//     "wednesday_close": 1260,
//     "thursday_open": 600,
//     "thursday_close": 1260,
//     "friday_open": 600,
//     "friday_close": 1260,
//     "saturday_open": 600,
//     "saturday_close": 1260,
//     "updated_at": "2017-03-09T14:15:53.268Z",
//     "quantity": 703,
//     "updated_on": "2017-03-07",
//     "store_no": 624
//   },
//   {
//     "id": 632,
//     "is_dead": false,
//     "name": "Hwy 27 & Innovation Drive",
//     "tags": "hwy 27 innovation drive 8260 # woodbridge l4h0r9",
//     "address_line_1": "8260 Hwy. # 27",
//     "address_line_2": null,
//     "city": "Woodbridge",
//     "postal_code": "L4H0R9",
//     "telephone": "(905) 264-7366",
//     "fax": "(905) 264-7742",
//     "latitude": 43.7845,
//     "longitude": -79.6253,
//     "products_count": 3758,
//     "inventory_count": 97179,
//     "inventory_price_in_cents": 174773818,
//     "inventory_volume_in_milliliters": 81928850,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": false,
//     "has_product_consultant": true,
//     "has_tasting_bar": false,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": false,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1260,
//     "tuesday_open": 600,
//     "tuesday_close": 1260,
//     "wednesday_open": 600,
//     "wednesday_close": 1260,
//     "thursday_open": 600,
//     "thursday_close": 1260,
//     "friday_open": 600,
//     "friday_close": 1260,
//     "saturday_open": 600,
//     "saturday_close": 1260,
//     "updated_at": "2017-03-09T14:15:19.608Z",
//     "quantity": 199,
//     "updated_on": "2017-03-07",
//     "store_no": 632
//   },
//   {
//     "id": 164,
//     "is_dead": false,
//     "name": "Eglinton & Laird",
//     "tags": "eglinton laird 65 wicksteed avenue toronto central toronto-central torontocentral m4g4k1",
//     "address_line_1": "65 Wicksteed Avenue",
//     "address_line_2": null,
//     "city": "Toronto",
//     "postal_code": "M4G4K1",
//     "telephone": "(416) 425-6282",
//     "fax": "(416) 425-6151",
//     "latitude": 43.7097,
//     "longitude": -79.36,
//     "products_count": 4298,
//     "inventory_count": 103665,
//     "inventory_price_in_cents": 223229971,
//     "inventory_volume_in_milliliters": 79958910,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": false,
//     "has_beer_cold_room": true,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 540,
//     "monday_close": 1260,
//     "tuesday_open": 540,
//     "tuesday_close": 1260,
//     "wednesday_open": 540,
//     "wednesday_close": 1260,
//     "thursday_open": 540,
//     "thursday_close": 1260,
//     "friday_open": 540,
//     "friday_close": 1260,
//     "saturday_open": 540,
//     "saturday_close": 1260,
//     "updated_at": "2017-03-09T14:15:16.455Z",
//     "quantity": 183,
//     "updated_on": "2017-03-07",
//     "store_no": 164
//   },
//   {
//     "id": 355,
//     "is_dead": false,
//     "name": "Bayview & Sheppard",
//     "tags": "bayview sheppard 2901 avenue -  unit #125 village mall toronto north toronto-north torontonorth york m2k1e6",
//     "address_line_1": "2901 Bayview Avenue - Unit #125",
//     "address_line_2": "Bayview Village Mall",
//     "city": "North York",
//     "postal_code": "M2K1E6",
//     "telephone": "(416) 222-7658",
//     "fax": "(416) 222-0610",
//     "latitude": 43.7698,
//     "longitude": -79.3845,
//     "products_count": 4139,
//     "inventory_count": 112339,
//     "inventory_price_in_cents": 239771839,
//     "inventory_volume_in_milliliters": 79443930,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1260,
//     "tuesday_open": 600,
//     "tuesday_close": 1260,
//     "wednesday_open": 600,
//     "wednesday_close": 1260,
//     "thursday_open": 600,
//     "thursday_close": 1260,
//     "friday_open": 600,
//     "friday_close": 1260,
//     "saturday_open": 600,
//     "saturday_close": 1260,
//     "updated_at": "2017-03-09T14:15:18.101Z",
//     "quantity": 151,
//     "updated_on": "2017-03-07",
//     "store_no": 355
//   },
//   {
//     "id": 243,
//     "is_dead": false,
//     "name": "Bank & Walkley",
//     "tags": "bank walkley 1980 street ottawa k1v0e8",
//     "address_line_1": "1980 Bank Street",
//     "address_line_2": null,
//     "city": "Ottawa",
//     "postal_code": "K1V0E8",
//     "telephone": "(613) 523-7763",
//     "fax": "(613) 523-5407",
//     "latitude": 45.3666,
//     "longitude": -75.6614,
//     "products_count": 3857,
//     "inventory_count": 105254,
//     "inventory_price_in_cents": 174052720,
//     "inventory_volume_in_milliliters": 78625177,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": true,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1260,
//     "tuesday_open": 600,
//     "tuesday_close": 1260,
//     "wednesday_open": 600,
//     "wednesday_close": 1260,
//     "thursday_open": 600,
//     "thursday_close": 1260,
//     "friday_open": 600,
//     "friday_close": 1260,
//     "saturday_open": 600,
//     "saturday_close": 1260,
//     "updated_at": "2017-03-09T14:15:51.668Z",
//     "quantity": 179,
//     "updated_on": "2017-03-07",
//     "store_no": 243
//   },
//   {
//     "id": 187,
//     "is_dead": false,
//     "name": "Bayfield & Hanmer",
//     "tags": "bayfield hanmer 534 street barrie l4m5a2",
//     "address_line_1": "534 Bayfield Street",
//     "address_line_2": null,
//     "city": "Barrie",
//     "postal_code": "L4M5A2",
//     "telephone": "(705) 722-1046",
//     "fax": "(705) 722-0854",
//     "latitude": 44.4145,
//     "longitude": -79.7132,
//     "products_count": 4357,
//     "inventory_count": 100084,
//     "inventory_price_in_cents": 173364885,
//     "inventory_volume_in_milliliters": 77646316,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": false,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1320,
//     "tuesday_open": 600,
//     "tuesday_close": 1320,
//     "wednesday_open": 600,
//     "wednesday_close": 1320,
//     "thursday_open": 600,
//     "thursday_close": 1320,
//     "friday_open": 600,
//     "friday_close": 1320,
//     "saturday_open": 600,
//     "saturday_close": 1320,
//     "updated_at": "2017-03-09T14:15:30.219Z",
//     "quantity": 130,
//     "updated_on": "2017-03-07",
//     "store_no": 187
//   },
//   {
//     "id": 346,
//     "is_dead": false,
//     "name": "Hwy 7 & Weston",
//     "tags": "hwy 7 weston 7850 road building c5 woodbridge l4l9n8",
//     "address_line_1": "7850 Weston Road",
//     "address_line_2": "Building C5",
//     "city": "Woodbridge",
//     "postal_code": "L4L9N8",
//     "telephone": "(905) 851-2500",
//     "fax": "(905) 851-8168",
//     "latitude": 43.791,
//     "longitude": -79.5485,
//     "products_count": 3709,
//     "inventory_count": 99293,
//     "inventory_price_in_cents": 200322868,
//     "inventory_volume_in_milliliters": 77554070,
//     "has_wheelchair_accessability": true,
//     "has_bilingual_services": false,
//     "has_product_consultant": true,
//     "has_tasting_bar": true,
//     "has_beer_cold_room": false,
//     "has_special_occasion_permits": true,
//     "has_vintages_corner": true,
//     "has_parking": true,
//     "has_transit_access": true,
//     "sunday_open": 660,
//     "sunday_close": 1080,
//     "monday_open": 600,
//     "monday_close": 1260,
//     "tuesday_open": 600,
//     "tuesday_close": 1260,
//     "wednesday_open": 600,
//     "wednesday_close": 1260,
//     "thursday_open": 600,
//     "thursday_close": 1260,
//     "friday_open": 600,
//     "friday_close": 1260,
//     "saturday_open": 600,
//     "saturday_close": 1260,
//     "updated_at": "2017-03-09T14:15:18.934Z",
//     "quantity": 122,
//     "updated_on": "2017-03-07",
//     "store_no": 346
//   }
//   ]

// const alcoholResults = [
//     {
//       "id": 225904,
//       "is_dead": false,
//       "name": "Palm Bay Key Lime Cherry 6 Pk-C",
//       "tags": "palm bay key lime cherry 6 pk c pk-c pkc ready to drinkcoolers ready-to-drinkcoolers readytodrinkcoolers coolers canada region not specified great west distillers can",
//       "is_discontinued": false,
//       "price_in_cents": 1225,
//       "regular_price_in_cents": 1225,
//       "limited_time_offer_savings_in_cents": 0,
//       "limited_time_offer_ends_on": null,
//       "bonus_reward_miles": 0,
//       "bonus_reward_miles_ends_on": null,
//       "stock_type": "LCBO",
//       "primary_category": "Ready-to-Drink/Coolers",
//       "secondary_category": "Coolers",
//       "origin": "Canada, Region Not Specified",
//       "package": "6x355 mL can",
//       "package_unit_type": "can",
//       "package_unit_volume_in_milliliters": 355,
//       "total_package_units": 6,
//       "volume_in_milliliters": 2130,
//       "alcohol_content": 500,
//       "price_per_liter_of_alcohol_in_cents": 1150,
//       "price_per_liter_in_cents": 575,
//       "inventory_count": 14402,
//       "inventory_volume_in_milliliters": 30676260,
//       "inventory_price_in_cents": 17642450,
//       "sugar_content": null,
//       "producer_name": "Great West Distillers",
//       "released_on": null,
//       "has_value_added_promotion": false,
//       "has_limited_time_offer": false,
//       "has_bonus_reward_miles": false,
//       "is_seasonal": false,
//       "is_vqa": false,
//       "is_ocb": false,
//       "is_kosher": false,
//       "value_added_promotion_description": null,
//       "description": null,
//       "serving_suggestion": null,
//       "tasting_note": null,
//       "updated_at": "2017-03-09T14:30:31.920Z",
//       "image_thumb_url": "https://dx5vpyka4lqst.cloudfront.net/products/225904/images/thumb.png",
//       "image_url": "https://dx5vpyka4lqst.cloudfront.net/products/225904/images/full.jpeg",
//       "varietal": "Medium Sweet",
//       "style": "Crisp & Fruity",
//       "tertiary_category": null,
//       "sugar_in_grams_per_liter": null,
//       "clearance_sale_savings_in_cents": 0,
//       "has_clearance_sale": false,
//       "product_no": 225904
//     },
//     {
//       "id": 321794,
//       "is_dead": false,
//       "name": "Smirnoff Ice",
//       "tags": "smirnoff ice ready to drinkcoolers ready-to-drinkcoolers readytodrinkcoolers coolers canada region not specified udv inc bottle",
//       "is_discontinued": false,
//       "price_in_cents": 5395,
//       "regular_price_in_cents": 5395,
//       "limited_time_offer_savings_in_cents": 0,
//       "limited_time_offer_ends_on": null,
//       "bonus_reward_miles": 0,
//       "bonus_reward_miles_ends_on": null,
//       "stock_type": "LCBO",
//       "primary_category": "Ready-to-Drink/Coolers",
//       "secondary_category": "Coolers",
//       "origin": "Canada, Region Not Specified",
//       "package": "24x330 mL bottle",
//       "package_unit_type": "bottle",
//       "package_unit_volume_in_milliliters": 330,
//       "total_package_units": 24,
//       "volume_in_milliliters": 7920,
//       "alcohol_content": 500,
//       "price_per_liter_of_alcohol_in_cents": 1362,
//       "price_per_liter_in_cents": 681,
//       "inventory_count": 3759,
//       "inventory_volume_in_milliliters": 29771280,
//       "inventory_price_in_cents": 20279805,
//       "sugar_content": null,
//       "producer_name": "U.D.V. Canada Inc",
//       "released_on": null,
//       "has_value_added_promotion": false,
//       "has_limited_time_offer": false,
//       "has_bonus_reward_miles": false,
//       "is_seasonal": false,
//       "is_vqa": false,
//       "is_ocb": false,
//       "is_kosher": false,
//       "value_added_promotion_description": null,
//       "description": null,
//       "serving_suggestion": null,
//       "tasting_note": null,
//       "updated_at": "2017-03-09T14:33:34.931Z",
//       "image_thumb_url": "https://dx5vpyka4lqst.cloudfront.net/products/321794/images/thumb.png",
//       "image_url": "https://dx5vpyka4lqst.cloudfront.net/products/321794/images/full.jpeg",
//       "varietal": "Sweet",
//       "style": "Crisp & Citrus",
//       "tertiary_category": null,
//       "sugar_in_grams_per_liter": null,
//       "clearance_sale_savings_in_cents": 0,
//       "has_clearance_sale": false,
//       "product_no": 321794
//     },
//     {
//       "id": 447540,
//       "is_dead": false,
//       "name": "Georgian Bay Gin Smash",
//       "tags": "georgian bay gin smash ready to drinkcoolers ready-to-drinkcoolers readytodrinkcoolers coolers canada ontario company can",
//       "is_discontinued": false,
//       "price_in_cents": 295,
//       "regular_price_in_cents": 295,
//       "limited_time_offer_savings_in_cents": 0,
//       "limited_time_offer_ends_on": null,
//       "bonus_reward_miles": 0,
//       "bonus_reward_miles_ends_on": null,
//       "stock_type": "LCBO",
//       "primary_category": "Ready-to-Drink/Coolers",
//       "secondary_category": "Coolers",
//       "origin": "Canada, Ontario",
//       "package": "473 mL can",
//       "package_unit_type": "can",
//       "package_unit_volume_in_milliliters": 473,
//       "total_package_units": 1,
//       "volume_in_milliliters": 473,
//       "alcohol_content": 500,
//       "price_per_liter_of_alcohol_in_cents": 1247,
//       "price_per_liter_in_cents": 623,
//       "inventory_count": 60994,
//       "inventory_volume_in_milliliters": 28850162,
//       "inventory_price_in_cents": 17993230,
//       "sugar_content": null,
//       "producer_name": "Georgian Bay Gin Company",
//       "released_on": null,
//       "has_value_added_promotion": false,
//       "has_limited_time_offer": false,
//       "has_bonus_reward_miles": false,
//       "is_seasonal": false,
//       "is_vqa": false,
//       "is_ocb": false,
//       "is_kosher": false,
//       "value_added_promotion_description": null,
//       "description": null,
//       "serving_suggestion": null,
//       "tasting_note": null,
//       "updated_at": "2017-03-09T14:24:16.620Z",
//       "image_thumb_url": "https://dx5vpyka4lqst.cloudfront.net/products/447540/images/thumb.png",
//       "image_url": "https://dx5vpyka4lqst.cloudfront.net/products/447540/images/full.jpeg",
//       "varietal": "Lightly Sweet",
//       "style": "Crisp & Citrus",
//       "tertiary_category": null,
//       "sugar_in_grams_per_liter": null,
//       "clearance_sale_savings_in_cents": 0,
//       "has_clearance_sale": false,
//       "product_no": 447540
//     },
//     {
//       "id": 448779,
//       "is_dead": false,
//       "name": "Crazy Uncle Hard Root Beer",
//       "tags": "crazy uncle hard root beer ready to drinkcoolers ready-to-drinkcoolers readytodrinkcoolers coolers canada ontario 361 degrees inc can",
//       "is_discontinued": false,
//       "price_in_cents": 295,
//       "regular_price_in_cents": 295,
//       "limited_time_offer_savings_in_cents": 0,
//       "limited_time_offer_ends_on": null,
//       "bonus_reward_miles": 0,
//       "bonus_reward_miles_ends_on": null,
//       "stock_type": "LCBO",
//       "primary_category": "Ready-to-Drink/Coolers",
//       "secondary_category": "Coolers",
//       "origin": "Canada, Ontario",
//       "package": "473 mL can",
//       "package_unit_type": "can",
//       "package_unit_volume_in_milliliters": 473,
//       "total_package_units": 1,
//       "volume_in_milliliters": 473,
//       "alcohol_content": 500,
//       "price_per_liter_of_alcohol_in_cents": 1247,
//       "price_per_liter_in_cents": 623,
//       "inventory_count": 59766,
//       "inventory_volume_in_milliliters": 28269318,
//       "inventory_price_in_cents": 17630970,
//       "sugar_content": null,
//       "producer_name": "361 Degrees Inc.",
//       "released_on": null,
//       "has_value_added_promotion": false,
//       "has_limited_time_offer": false,
//       "has_bonus_reward_miles": false,
//       "is_seasonal": false,
//       "is_vqa": false,
//       "is_ocb": false,
//       "is_kosher": false,
//       "value_added_promotion_description": null,
//       "description": null,
//       "serving_suggestion": null,
//       "tasting_note": null,
//       "updated_at": "2017-03-09T14:21:19.728Z",
//       "image_thumb_url": "https://dx5vpyka4lqst.cloudfront.net/products/448779/images/thumb.png",
//       "image_url": "https://dx5vpyka4lqst.cloudfront.net/products/448779/images/full.jpeg",
//       "varietal": "Medium Sweet",
//       "style": "Smooth & Classic",
//       "tertiary_category": null,
//       "sugar_in_grams_per_liter": null,
//       "clearance_sale_savings_in_cents": 0,
//       "has_clearance_sale": false,
//       "product_no": 448779
//     },
//     {
//       "id": 211235,
//       "is_dead": false,
//       "name": "Palm Bay Strawberry-Pineapple",
//       "tags": "palm bay strawberry pineapple strawberry-pineapple strawberrypineapple ready to drinkcoolers ready-to-drinkcoolers readytodrinkcoolers coolers canada region not specified great west distillers can",
//       "is_discontinued": false,
//       "price_in_cents": 1225,
//       "regular_price_in_cents": 1225,
//       "limited_time_offer_savings_in_cents": 0,
//       "limited_time_offer_ends_on": null,
//       "bonus_reward_miles": 0,
//       "bonus_reward_miles_ends_on": null,
//       "stock_type": "LCBO",
//       "primary_category": "Ready-to-Drink/Coolers",
//       "secondary_category": "Coolers",
//       "origin": "Canada, Region Not Specified",
//       "package": "6x355 mL can",
//       "package_unit_type": "can",
//       "package_unit_volume_in_milliliters": 355,
//       "total_package_units": 6,
//       "volume_in_milliliters": 2130,
//       "alcohol_content": 500,
//       "price_per_liter_of_alcohol_in_cents": 1150,
//       "price_per_liter_in_cents": 575,
//       "inventory_count": 13148,
//       "inventory_volume_in_milliliters": 28005240,
//       "inventory_price_in_cents": 16106300,
//       "sugar_content": null,
//       "producer_name": "Great West Distillers",
//       "released_on": null,
//       "has_value_added_promotion": false,
//       "has_limited_time_offer": false,
//       "has_bonus_reward_miles": false,
//       "is_seasonal": false,
//       "is_vqa": false,
//       "is_ocb": false,
//       "is_kosher": false,
//       "value_added_promotion_description": null,
//       "description": null,
//       "serving_suggestion": null,
//       "tasting_note": null,
//       "updated_at": "2017-03-09T14:30:32.352Z",
//       "image_thumb_url": "https://dx5vpyka4lqst.cloudfront.net/products/211235/images/thumb.png",
//       "image_url": "https://dx5vpyka4lqst.cloudfront.net/products/211235/images/full.jpeg",
//       "varietal": "Medium Sweet",
//       "style": "Crisp & Fruity",
//       "tertiary_category": null,
//       "sugar_in_grams_per_liter": null,
//       "clearance_sale_savings_in_cents": 0,
//       "has_clearance_sale": false,
//       "product_no": 211235
//     },
//     {
//       "id": 211227,
//       "is_dead": false,
//       "name": "Palm Bay Ruby Grapefruit Sunrise Spritz",
//       "tags": "palm bay ruby grapefruit sunrise spritz ready to drinkcoolers ready-to-drinkcoolers readytodrinkcoolers coolers canada region not specified great west distillers can",
//       "is_discontinued": false,
//       "price_in_cents": 1225,
//       "regular_price_in_cents": 1225,
//       "limited_time_offer_savings_in_cents": 0,
//       "limited_time_offer_ends_on": null,
//       "bonus_reward_miles": 0,
//       "bonus_reward_miles_ends_on": null,
//       "stock_type": "LCBO",
//       "primary_category": "Ready-to-Drink/Coolers",
//       "secondary_category": "Coolers",
//       "origin": "Canada, Region Not Specified",
//       "package": "6x355 mL can",
//       "package_unit_type": "can",
//       "package_unit_volume_in_milliliters": 355,
//       "total_package_units": 6,
//       "volume_in_milliliters": 2130,
//       "alcohol_content": 500,
//       "price_per_liter_of_alcohol_in_cents": 1150,
//       "price_per_liter_in_cents": 575,
//       "inventory_count": 12668,
//       "inventory_volume_in_milliliters": 26982840,
//       "inventory_price_in_cents": 15518300,
//       "sugar_content": null,
//       "producer_name": "Great West Distillers",
//       "released_on": null,
//       "has_value_added_promotion": false,
//       "has_limited_time_offer": false,
//       "has_bonus_reward_miles": false,
//       "is_seasonal": false,
//       "is_vqa": false,
//       "is_ocb": false,
//       "is_kosher": false,
//       "value_added_promotion_description": null,
//       "description": null,
//       "serving_suggestion": null,
//       "tasting_note": null,
//       "updated_at": "2017-03-09T14:30:32.240Z",
//       "image_thumb_url": "https://dx5vpyka4lqst.cloudfront.net/products/211227/images/thumb.png",
//       "image_url": "https://dx5vpyka4lqst.cloudfront.net/products/211227/images/full.jpeg",
//       "varietal": "Medium Sweet",
//       "style": "Crisp & Citrus",
//       "tertiary_category": null,
//       "sugar_in_grams_per_liter": null,
//       "clearance_sale_savings_in_cents": 0,
//       "has_clearance_sale": false,
//       "product_no": 211227
//     }]
