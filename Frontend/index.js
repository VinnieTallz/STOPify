function userLocationSuccess (userPosition) {

  let map;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: userPosition.coords.latitude, lng: userPosition.coords.longitude },
      zoom: 16,
    });
  }

  initMap();
}

function userLocationError (error){
  console.log("Error")
}



navigator.geolocation.getCurrentPosition(userLocationSuccess, userLocationError);