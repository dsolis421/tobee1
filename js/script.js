var $petfinderAPI = 'http://api.petfinder.com/';
var $devkey = '3c73470956892905e562a55f0e113f50';

function getSheltersZip(zip) {
  $('#shelters').html('<h3>Finding families..</h3>');
  $.getJSON($petfinderAPI + 'shelter.find?location=' + zip + '&format=json&key=' + $devkey + '&callback=?')
    .done(function(petApiData){
      console.log(petApiData);
      $('#shelters').empty();
      var shelters = petApiData.petfinder.shelters.shelter;
      for (i in shelters) {
        var listing = '<div class="shelter"><h4>' + shelters[i].name.$t + '</h4><div>See Family<div></div>';
        $('#shelters').append(listing);
      };
    })
    .error(function(err){
      console.log('Get shelters by zip error');
    });
}

$(document).ready(function() {

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 35
          }, 500);
          return false;
        }
      }
    });
  });

  $('#sheltersearchgo').click(function(){
    if($('#sheltersearch').val().length === 5) {
      getSheltersZip($('#sheltersearch').val());
    } else {
      return;
    }
  });
})
