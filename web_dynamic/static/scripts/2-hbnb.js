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
});
