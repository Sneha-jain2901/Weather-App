const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOp=document.querySelector('.date');
const timeOp=document.querySelector('.time');
const cityOp=document.querySelector('.name');
const conditionOp=document.querySelector('.condition');
const iconOp=document.querySelector('.icon');
const cloudOp=document.querySelector('.cloud');
const humidityOp=document.querySelector('.humidity');
const windOp=document.querySelector('.wind');
const form=document.querySelector('#locationInput');
const search=document.querySelector('.search')
const button=document.querySelector('.submit')
const cities=document.querySelectorAll('.city')

let cityIp="Dehradun";

cities.forEach((city)=>{
    city.addEventListener('click',(e)=>{
        cityIp=e.target.innerHTML;

        //function to fetch and display all dat from weather api
        fetchWeatherData();

        search.value="";

        // app.style.opacity="0"
    });
})

form.addEventListener('submit',(e)=>{
    if(search.value.length==0){
        alert("Please enter in a city name")
    }else{
        cityIp=search.value;

        fetchWeatherData();
        search.value="";
        // app.style.opacity="0";
    }
    e.preventDefault();
})

const dayOfTheWeek=function (day,month,year){
    const weekDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date(year, month - 1, day); // Create Date object using year, month, day
    const dayIndex = date.getDay(); // Get day of the week as number (0-6)
    return weekDay[dayIndex]; // Return day name from weekDay array
}

function fetchWeatherData(){
    const apiKey = '89a5aa5e41a84cd491f144605240607'; // Replace with your actual API key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityIp}`;

    fetch(apiUrl)
    //take the data which is in json format and convert it to js object
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        temp.innerHTML=data.current.temp_c+"&#176;C";
        conditionOp.innerHTML=data.current.condition.text;

        /*Get date and time from the city and extract
        the day, monthh, year and time into individual variables */
        const date=data.location.localtime;
        const y=parseInt(date.substr(0,4))
        const m=parseInt(date.substr(5,2))
        const d=parseInt(date.substr(8,2))
        const time=date.substr(11);

        dateOp.innerHTML = `${dayOfTheWeek(d,m,y)} ${d}-${m}-${y}`
        timeOp.innerHTML = time;
        cityOp.innerHTML = data.location.name;

        iconOp.src = 'https:' + data.current.condition.icon;

        cloudOp.innerHTML=data.current.cloud+"%";
        humidityOp.innerHTML=data.current.humidity+"%";
        windOp.innerHTML=data.current.wind_kph+"km/h";

        let timeOfDay="day";
        const code = data.current.condition.code;
        if(!data.current.is_day){
            timeOfDay= "night"
        }

        if(code==1000){ //clear
            if(timeOfDay=="day"){
                app.style.backgroundImage="url(images/day/day-clear.jpg)";
                button.style.background="#e5ba92";
            }else{
                app.style.backgroundImage="url(images/night/night-clear.avif)";
                button.style.background="#181e27"
            }
        }else if(   //cloudy
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ){
            if(timeOfDay=="day"){
                app.style.backgroundImage="url(images/day/day-cloudy.jpeg)";
                button.style.background="#fa6d1b";
            }else{
                app.style.backgroundImage="url(images/night/night-cloudy.avif)";
                button.style.background="#181e27"
            }
        }else if(   //rainy
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ){
            if(timeOfDay=="day"){
                app.style.backgroundImage="url(images/day/day-rainy.jpg)";
                button.style.background="#647d75"
            }else{
                app.style.backgroundImage="url(images/night/night-rainy.avif)";
                button.style.background="#325c80"
            }
        }else{  //snowy
            if(timeOfDay=="day"){
                app.style.backgroundImage="url(images/day/day-snowy.avif)";
                button.style.background="#4d72aa";
            }else{
                app.style.backgroundImage="url(images/night/night-snowy.avif)";
                button.style.background="#1b1b1b"
            }
        }
        app.style.opacity="1";
    }).catch(()=>{
        alert("City not found, plaese try again")
        app.style.opacity="1"
    });
}

fetchWeatherData()
app.style.opacity="1";