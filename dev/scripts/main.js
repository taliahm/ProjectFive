// THE PSEUDO CODE YO

// User selects alcohol type
// User selects budget parameter
// User selects occasion parameter
// User confirms above selections

	// Make Ajax call to LCBO API with users alcohol type
	// Take the results array, filter based on budget parameter, return new array
	// With new array, sort by alcohol content using underscore JS
	 //if occasion stress=true, take top half of array(meaning the highest alcohol content)
	 //Top half of array is shuffled
	 //6 results are displayed (hidden radio buttons, results are wrapped in label)
	 //if occasion stress=false, take bottom half of array (meaning the lowest alcohol content)
	 //Bottom half of array is shuffled
	 //6 results are displayed (hidden radio buttons, results are wrapped in label)

// Users selects 1 of 6 possible products
// User confirms selection using button
	//on button click, user is prompted to share their location and product ID is stored
	//if user rejects, then user is prompted to enter location manually
	//THIS IS UNCONFIRMED: Ajax call is made to Geolocation to return the lat long of the user location(maybe lat long is already returned when user inputs location)
	//Using LCBO API "Stores with product" of user choice, return LCBO stores with the product
	//Compare Lat long of returned LCBO stores to User's lat long (using jsunderscores? _.map _.reduce)
// Display 3 closest locations with inventory that matches users selection


//We will create object of occasions and add stress level as a property with either true or false

//Name spacing
const giftApp = {};

giftApp.lcboKey = 'MDo0NmY2MDY1MC1mZThmLTExZTYtOTE2OC1lNzNiZDhlNzg0NTg6QnNPeHBzcFdONGR1SXAzdG1vS3Q4WnhNR3BTY1pROGc4MGM3';
// 'MDpkODE2NzI1ZS1mZGM4LTExZTYtODdlZi03MzlkMjFiYjEwYzg6TEw1Z0hoTjI2Vk1LNkZhZnVsV0FIM2JhbmFqazlSQ005ZXpO';
giftApp.mapsKey = 'AIzaSyD00uENO6Qambq9HrEUi91ypFcN0j7elWM';
giftApp.lcboUrl = 'http://lcboapi.com/';
giftApp.userBudget;
giftApp.userOccasion;
giftApp.userAlcoholChoice;
giftApp.stressLevel;
giftApp.occasions = [
	{ 
		occasion: 'tuesday',
		stressLevel: false
	},{
		occasion: 'anniversary',
		stressLevel: true
	},{
		occasion: 'surprise',
		stressLevel: false
	},{
		occasion: 'meetingParents',
		stressLevel: true
	}, {
		occasion: 'potluck',
		stressLevel: false
	}, {
		occasion: 'dinnerBoss',
		stressLevel: true
	}, {
		occasion: 'sorryGift',
		stressLevel: true
	}, {
		occasion: 'netflixSpill',
		stressLevel: false
	}, {
		occasion: 'gameNight',
		stressLevel: false
	}, {
		occasion: 'holidayParty',
		stressLevel: true
	}, {
		occasion: 'present',
		streeLevel: true
	}];

giftApp.getLcboProductReturn = (userInput) => {
	giftApp.getAlcohol = $.ajax({
	    url: 'http://proxy.hackeryou.com',
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
	});$.when(giftApp.getAlcohol).done(function(alcoholData){
		var firstArrayReturn = alcoholData.result;
		giftApp.getLcboProductReturnThree(firstArrayReturn, userInput)
	});
}

giftApp.getLcboProductReturnThree = (firstArrayReturn, userInput) => {
	giftApp.getAlcohol = $.ajax({
	    url: 'http://proxy.hackeryou.com',
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
	    url: 'http://proxy.hackeryou.com',
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
		let combinedAlcoholArray = [...firstArrayReturn,...secondArrayReturn,...thirdArrayReturn];
		// console.log(combinedAlcoholArray);
		giftApp.filterByPrimeCat(combinedAlcoholArray);
	})

}

giftApp.getLcboStores = function(userChoice) {
	giftApp.lcboStorebyId = $.ajax({
		url: 'http://lcboapi.com/stores',
		dataType: 'json',
		method:'GET',
		    data: {
		        key: giftApp.lcboKey,
		        // per_page: 100,
		        // page: 3,
		       product_id: userChoice
		    },
	});$.when(giftApp.lcboStorebyId).done(function(data){
		const storeResults = data.result;	
		giftApp.convertStores(storeResults);
	})
}

const fakeArray = [
	{name: 'Store 1',
	 latitude: 43.4503, 
	 longitude: -80.4832

	}, {
		name: 'Store 3', 
		latitude: 43.47, 
		longitude: -80.483
	}, {
		name: 'Store 4',
		latitude: 43.40,
		longitude: -80.49
	}, {
		name: 'Store 2',
		latitude: 43.4508,
		longitude: -80.4828
	}, {name: 'Store 5',
		latitude:43.4501,
		longitude: -80.4836}
]

giftApp.convertStores = (array) => {
	// console.log(array);
	// const arrayForGoogle = array.reduce(function(arr, item){
	// 	return arr[item]
	// }, [])
	giftApp.arrayForGoogle = array.map(function(item){
		return `${item.latitude}, ${item.longitude}`
	})
	// console.log(giftApp.arrayForGoogle);
}



// arrayForGoogle = ['lat,long',]
// var storeOne = '43.4503, -80.4832';
// destinationArray = [ storeOne, storeTwo, Store Three ]

giftApp.filterByPrimeCat = (array) => {
		console.log('the user choice value', giftApp.userAlcoholChoice);
		let idofEl = `#${giftApp.userAlcoholChoice}`;
		let filterParamSelector = $('#alcoholType').children(idofEl);
		const filterParam = filterParamSelector.attr('data-filterParam');
		console.log('filterParam', filterParam)
		const arrayByName = array.filter(function(element){
			return element.primary_category === filterParam;
		})
		// console.log('this should be an array', finalAlcoholArray);
		giftApp.filterByBudget(arrayByName);
}


// this map script creates and displays the map object, don't mess with it!

giftApp.map;

giftApp.initMap = () => {
	giftApp.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		// scrollwheel: false,
		zoom: 8
		});

// geolocation script below - this allows us to get user location

const infoWindow = new google.maps.InfoWindow({
	map: giftApp.map
});

// if autolocation is allowed
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
	const pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
		};


		infoWindow.setPosition(pos);
		infoWindow.setContent('Location found.');
		giftApp.map.setCenter(pos);
		giftApp.holdLocation = pos;
		const userLat = pos.lat;
		const userLong =  pos.lng;
		// const userLatLng = new google.maps.LatLng({lat: userLat, lng: userLong});
		const userLatLng = userLat + ',' + userLong;
		giftApp.runDisMatrix(userLatLng);
		giftApp.convertStores(fakeArray);
		console.log(userLatLng);

	}, function() {
	handleLocationError(true, infoWindow, giftApp.map.getCenter());
	});
	} else {

	// if browser doesn't support geolocation
	handleLocationError(false, infoWindow, giftApp.map.getCenter());
	}
	// console.log("yay location", giftApp.keepUserLocation);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}

// end geolocation script


//these variables are from google example
var origin2 = 'Greenwich, England';
// var destinationA = 'Kitchener, Canada';
var destinationA = '43.4503, -80.4832';
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);
var destinationB = '44.2312, -76.4860';

giftApp.runDisMatrix = (param) => {
service = new google.maps.DistanceMatrixService();
console.log(destinationB);
service.getDistanceMatrix(
  {
    // origins: [param],
    origins: [param],
    destinations: giftApp.arrayForGoogle,
    travelMode: 'DRIVING',
    // transitOptions: TransitOptions,
    // drivingOptions: DrivingOptions,
    // unitSystem: UnitSystem,
    // avoidHighways: Boolean,
    // avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
	 console.log(param);
	console.log(response)
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
console.log(origins);
console.log(destinations);
    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        // var distance = element.distance.text;
        // var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}
};

// giftApp.getUserDetectedLocation = (userLocation) => {
// 	giftApp.getUserLocation = $.ajax({
// 		url: 'https://www.googleapis.com/geolocation/v1/geolocate',
// 		dataType: 'json',
// 		method: 'POST',
// 		data: {
// 			key: 'AIzaSyD00uENO6Qambq9HrEUi91ypFcN0j7elWM',

// 		}
// 	})
// }

// end detect user location

//EVENTS
giftApp.getUserChoice = () => {
	$('#giftMe').on('click', function(e){
		e.preventDefault();
		console.log('clicked gift me button');
		giftApp.userBudget = $('#budget').val();
		giftApp.userOccasion = $('#occasion').val();
		// giftApp.occasionStressLevel = giftApp.userOccasion
		giftApp.userAlcoholChoice = $('#alcoholType').val();
		giftApp.getStressOfOccasion(giftApp.userOccasion);
		giftApp.getLcboProductReturn(giftApp.userAlcoholChoice);
	})
} //end of getUserChoice()

giftApp.filterByBudget = (finalArray) => {
	if(giftApp.userBudget === 'low'){
		const finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents < 2000;
		})
		giftApp.sortedArray(finalBudgetArray);
		console.log('lowest of budget', finalBudgetArray);
		
	}
	else if(giftApp.userBudget === 'medium') {
		const finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents > 2001 && element.price_in_cents < 4000;
		})
		giftApp.sortedArray(finalBudgetArray);
		console.log('medium of budgets', finalBudgetArray);
	} 
	else if(giftApp.userBudget === 'high') {
		const finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents > 4001;
		})
		giftApp.sortedArray(finalBudgetArray);
		console.log('highest of budgets', finalBudgetArray);
	}
}

giftApp.sortedArray = (passedData) => {
// console.log('passed data here', passedData);
	giftApp.userOccasion(selectedOccasion)
	var sortedByAbv = _.sortBy(passedData.'alcohol_content')

	if (selectedOccasion.stressLevel === true ) {
	const lowestAbv = Math.floor(sortedByAbv.length / 2);
	} 
	else {
	const highestAbv = Math.ceil(sortedByAbv.length / 2);
	}
} 

//THIS FUNCTION IS READY TO BE CALLED ONCE FILTER IS DONE
giftApp.displayAlcohol = (array) => {
	$('.results').empty();
	var elemArray = array.forEach((item) =>{
		let elemString = `
		<input type="radio" name="chooseAlcohol" data-id="${item.id}" id="${item.id}">
		<label for="${item.id}">
			<div class="imageContain">
				<img src="${item.image_url}" alt="${item.name}">
			</div>
			<div class="text">
				<h2>${item.name}</h2>
				<p>${item.origin}</p>
				<p>${item.style}</p>
				<p>${item.producer_name}</p>
			</div>
		</label>`
		let allElems = $('<div class="resultItem">').append(elemString);
		console.log(allElems);
		$('.results').append(allElems);
	})
}

giftApp.getStressOfOccasion = (param) => {
	let filteredOccasion = giftApp.occasions.filter((item) => item.occasion === param);
	let truthie = filteredOccasion.map((item) => item.stressLevel);
	giftApp.stressLevel = truthie[0]
	console.log("this is the selected stress", giftApp.stressLevel);
}

giftApp.events = () => {
	giftApp.getUserChoice();
} //end of events()

giftApp.init = () => {
	giftApp.events();
	giftApp.initMap();
} //end of init();

$(function() {
   giftApp.init();
});