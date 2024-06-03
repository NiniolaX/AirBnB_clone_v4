const amenitiesChecked = {};

// Function inserts list of amenities selected by user into the DOM
function updateAmenities () {
  const amenitiesList = Object.values(amenitiesChecked).join(', ');
  $('.amenities h4').text(amenitiesList);
}

// Function checks API status and updates DOM accordingly
function checkAPIStatus () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    success: function (response) {
      if (response.status === 'OK') {
        $('header div#api_status').addClass('available');
      } else {
        $('header div#api_status').removeClass('available');
      }
    },
    error: function (error) {
      $('header div#api_status').removeClass('available');
      console.log('Error fetching API status: ' + error);
    }
  });
}

// Function to create new place article
function createPlaceArticle (place) {
  return `
    <article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
        </div>
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article>
  `;
}

// Get places
function getPlaces () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (response) {
      const places = response;
      places.forEach(function (place) {
        const article = createPlaceArticle(place);
        $('.places').append(article);
      });
    },
    error: function (error) {
      console.log('Error fetching places: ' + error);
    }
  });
}

// Inserts dynamic content into the DOM
$(document).ready(function () {
  // Update amenitiesChecked based on user's selection
  $('input[type="checkbox"][id="amenity"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenitiesChecked[amenityId] = amenityName;
    } else {
      delete amenitiesChecked[amenityId];
    }

    updateAmenities();
  });

  // First API status check
  checkAPIStatus();

  // Check API status periodically
  setInterval(checkAPIStatus, 5000);

  // Dynamically load places
  getPlaces();
});
