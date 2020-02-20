window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".degree");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
             
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/be6cd051854211525750ac0eb77129a2/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
            })
                .then(data => {
                    console.log(data.currently);
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    setIcon(icon, document.querySelector(".icon"));
            });
        });

    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});