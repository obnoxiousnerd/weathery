const button = document.querySelector('#submit');
const name = document.querySelector('#name');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const icon = document.querySelector('#ico');
const search = document.querySelector('#search');
const feelslike = document.querySelector('#feelslike');
const apikey = '0ee0cbeb76d9eacb15286a4e66c26ee4';
var city = document.getElementById('search').value;


button.addEventListener('click', function(){
    city = document.getElementById('search').value;
    let theUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apikey;
    httpGet(theUrl, parseData);
});
function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {  
        callback(xmlHttp.responseText);
        console.log('loaded json'); }
    }
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    xmlHttp.suppressDeprecationWarnings = true;
    if(xmlHttp.status == 404 || xmlHttp.status == 400){
        name.textContent = 'Not Found';
        temp.textContent = 'Not Found';
        humidity.textContent = 'Not Found';
        icon.setAttribute('alt', 'Not Found');
    }
    var jsonData =  xmlHttp.responseText;
    
}
function parseData(jsonData){
    var data  =  JSON.parse(jsonData);
    name.textContent = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    temp.textContent = parseInt(data.main.temp - 273) + "°C";
    feelslike.textContent = data.weather[0].description;
}
search.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        city = search.value;
        let theUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apikey;
        httpGet(theUrl, parseData);
    }
});