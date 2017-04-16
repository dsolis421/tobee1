var $petfinderAPI = 'http://api.petfinder.com/';
var $devkey = '3c73470956892905e562a55f0e113f50';

function getShelter(id) {
  $.getJSON($petfinderAPI + 'shelter.get?id=' + id + '&format=json&key=' + $devkey + '&callback=?')
  .done(function(shelter){
    console.log(shelter);
  })
  .error(function(err) {
    console.log('Get shelter by ID error! ' + err);
  });
}

function getSheltersZip(zip) {
  $('#searchstatus').fadeOut("fast","linear", function() {
    $('#searchstatus').html('<h3>Finding families...</h3>');
    $('#searchstatus').fadeIn("slow","swing");
  });
  $.getJSON($petfinderAPI + 'shelter.find?location=' + zip + '&format=json&key=' + $devkey + '&callback=?')
    .done(function(petApiData){
      console.log(petApiData);
      $('#searchstatus').fadeOut("slow","swing", function() {
        $('searchstatus').empty();
      });
      $('#shelters').fadeOut("slow","swing", function() {
        $('#shelters').empty();
        var shelters = petApiData.petfinder.shelters.shelter;
        for (i in shelters) {
          var listing = '<div class="shelter" shelterid=' + shelters[i].id.$t + '><h4>' + shelters[i].name.$t + '</h4><div>See Family<div></div>';
          $('#shelters').append(listing);
        };
        $('#shelters').fadeIn("slow","swing");
        $('#shelters').on("click", ".shelter", function(){
          getShelter($(this).attr('shelterid'));
        });
      });
    })
    .error(function(err){
      console.log('Get shelters by zip error! ' + err);
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
