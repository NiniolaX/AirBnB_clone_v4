$(document).ready(function() {
  let amenitiesChecked = {};

  // Function that inserts list of amenities checked by user into the DOM
  function updateAmenities() {
    const amenitiesList = Object.values(amenitiesChecked).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  // Update amenitiesChecked based on user's action on amenities checkboxes
  $('input[type="checkbox"][id="amenity"]').on('change', function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenitiesChecked[amenityId] = amenityName;
    } else {
      delete amenitiesChecked[amenityId];
    }

    updateAmenities();
  });

  // Function that checks API status and updates DOM accordingly 
  function checkAPIStatus() {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/status/',
      type: 'GET',
      success: function(response) {
        if (response.status === 'OK')
          $('header div#api_status').addClass('available');
        else
          $('header div#api_status').removeClass('available');
      },
      error: function(error) {
          console.log('Error fetching API status: ' + error)
      }
    });
  } 

  checkAPIStatus();

  // Check API status periodically
  setInterval(checkAPIStatus, 5000);
});
