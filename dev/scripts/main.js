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

giftApp.lcboKey = 'MDpkODE2NzI1ZS1mZGM4LTExZTYtODdlZi03MzlkMjFiYjEwYzg6TEw1Z0hoTjI2Vk1LNkZhZnVsV0FIM2JhbmFqazlSQ005ZXpO';
giftApp.mapsKey = 'AIzaSyD00uENO6Qambq9HrEUi91ypFcN0j7elWM';
giftApp.lcboUrl = 'http://lcboapi.com/';
giftApp.userBudget;
giftApp.userOccasion;
giftApp.AlcoholChoice;
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
		let finalAlcoholArray = combinedAlcoholArray.filter(function(element){
			return element.primary_category === userInput;
		});
		giftApp.filterByBudget(finalAlcoholArray);
	})

}





//Function to get user's location
// giftApp.getUserLocation = () => {
// 	// function initMap() {
// 	        var map = new google.maps.Map(document.getElementById('map'), {
// 	          center: {lat: -34.397, lng: 150.644},
// 	          zoom: 6
// 	        });
// 	        var infoWindow = new google.maps.InfoWindow({map: map});
// 	        // Try HTML5 geolocation.
// 	             if (navigator.geolocation) {
// 	               navigator.geolocation.getCurrentPosition(function(position) {
// 	                 var pos = {
// 	                   lat: position.coords.latitude,
// 	                   lng: position.coords.longitude
// 	                 };

// 	                 infoWindow.setPosition(pos);
// 	                 infoWindow.setContent('Location found.');
// 	                 map.setCenter(pos);
// 	               }, function() {
// 	                 handleLocationError(true, infoWindow, map.getCenter());
// 	               });
// 	             } else {
// 	               // Browser doesn't support Geolocation
// 	               handleLocationError(false, infoWindow, map.getCenter());
// 	             }
// 	           }

// 	           function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// 	             infoWindow.setPosition(pos);
// 	             infoWindow.setContent(browserHasGeolocation ?
// 	                                   'Error: The Geolocation service failed.' :
// 	                                   'Error: Your browser doesn\'t support geolocation.');
// 	           }
	
// }

// this map script creates and displays the map object, don't mess with it!

giftApp.map;

giftApp.initMap = () => {
	giftApp.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		// scrollwheel: false,
		zoom: 6
		});

// geolocation script below

const infoWindow = new google.maps.InfoWindow({
	map: giftApp.map
});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        giftApp.map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, giftApp.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, giftApp.map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

// end geolocation script

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
		let finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents < 2000;
		})
		console.log('lowest of budget', finalBudgetArray);
		
	}
	else if(giftApp.userBudget === 'medium') {
		let finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents > 2001 && element.price_in_cents < 4000;
		})
		console.log('medium of budgets', finalBudgetArray);
	} 
	else if(giftApp.userBudget === 'high') {
		let finalBudgetArray = finalArray.filter((element) => {
			return element.price_in_cents > 4001;
		})
		console.log('highest of budgets',  finalBudgetArray);
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
	console.log(giftApp.stressLevel);
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