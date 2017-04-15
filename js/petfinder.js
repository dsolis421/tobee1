var $petfinderAPI = 'http://api.petfinder.com/';
var $devkey = '3c73470956892905e562a55f0e113f50';

function getAllShelters() {
  $.getJSON($petfinderAPI + 'pet.getRandom?output=basic&format=json&key=' + $devkey + '&callback=?')
    .done(function(petApiData){
      console.log(petApiData);
    })
    .error(function(err){
      console.log('Get shelters error');
    });
}
