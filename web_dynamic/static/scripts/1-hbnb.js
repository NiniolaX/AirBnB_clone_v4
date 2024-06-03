const amenitiesChecked = {};

// Write function that inserts list of amenities selected by user into  DOM
function updateAmenities () {
  const amenitiesList = Object.values(amenitiesChecked).join(', ');
  $('.amenities h4').text(amenitiesList);
}

$(document).ready(function () {
  // Select all checkboxes with id="amenity" attribute
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
});
