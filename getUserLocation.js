function userLocationSuccess (userPosition) {
    console.log("your current position " + JSON.stringify(userPosition))
}

function userLocationError (error){
    console.log("Error")
}



navigator.geolocation.getCurrentPosition(userLocationSuccess, userLocationError);