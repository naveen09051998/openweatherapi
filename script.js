let apikey = "80f5909e3d7ff84b196df89b011e5744";
let units = "imperial";
let id;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
       id = 'zip';  
    }else{
        id = 'q';
    }
}


 async function searchWeather(searchTerm){
    try{
        getSearchMethod(searchTerm);
    let resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?${id}=${searchTerm}&appid=${apikey}&units=${units}`)
    let data = await resp.json();
    //console.log(data);
    Init(data);
    }catch(error){
        console.log(error);
    }
}




function Init(resultfromserver){
    //console.log(resultfromserver);
    switch (resultfromserver.weather[0].main) {
        case 'Clear':
            document.body.style.background = `url("bluesky.jpg")`;
            break;

        case 'Clouds':
            document.body.style.background = `url("cloudy.jpg")`;
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.background = `url("rainy.jpg")`;
            break;

        case 'Thunderstorm':
            document.body.style.background = `url("storm.jpg")`;
            break;

        case 'Snow':
            document.body.style.background = `url("snow.jpg")`;
            break;

        default:
            break;
    
    }  
    let weatherDescription = document.getElementById("weatherDescription");
    let cityHeader = document.getElementById("cityHeader");
    let weatherMain = document.getElementById("weatherMain");
    let temperature = document.getElementById("temperature");
    let windspeed = document.getElementById("windspeed");
    let humidity = document.getElementById("humidity");
    let weatherIcon = document.getElementById("documentIconImg");
    weatherIcon.src = ' http://openweathermap.org/img/wn/' + resultfromserver.weather[0].icon + '.png';

    let resultdescription = resultfromserver.weather[0].description;
    weatherDescriptionHeader.innerText = resultdescription.charAt(0).toUpperCase() + resultdescription.slice(1);

    temperature.innerHTML= Math.floor(resultfromserver.main.temp) + '&#176';
    windspeed.innerHTML = 'Winds at ' +  Math.floor(resultfromserver.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultfromserver.name;
    humidity.innerHTML = 'Humidity levels at ' + Math.floor(resultfromserver.main.humidity) + '%';
    setPositionForWeatherInfo();
 }

 function setPositionForWeatherInfo(){
     let weatherContainer = document.getElementById('weatherContainer');
     let weatherContainerHeight = weatherContainer.clientHeight;
     let weatherContainerwidth = weatherContainer.clientWidth;

     weatherContainer.style.left = `calc(50% - ${weatherContainerwidth/2}px)`;
     weatherContainer.style.top = `calc(50% - ${weatherContainerwidth/1.3}px)`;
     weatherContainer.style.visibility = 'visible';
 }

 document.getElementById("searchBtn").addEventListener("click",function(){

    let searchTerm = document.getElementById("searchInput").value;
     if(searchTerm)
     searchWeather(searchTerm);
 })

