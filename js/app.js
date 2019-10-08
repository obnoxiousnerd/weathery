$('document').ready(()=>{
Ω('weather-module').register(div);
Ω('search-module').register(div);
Ω('type-in').register(inputText);
Ω('submit-btn').register(button);
Ω('city-name').register(h3);
Ω('temp-data').register(h1);
Ω('humid-data').register(h1);
Ω('weather-con').register(p);
Ω('icon-holder').register(object);
Ω('temp-holder').register(div);
Ω('geo-btn').register(button);
Ω('we-predict').register(p);
var typeIn =  document.querySelector('#type-in');
var btn =  Ω('#submit-btn');
var temp =  Ω('#temp-data');
var humidity =  Ω('#humid-data');
var city =  Ω('#city-name');
var condition =  Ω('#weather-con');
var icon =  Ω('#icon-holder');
var sign =  Ω('#sign');
var geobtn = Ω('#geo-btn')
var predict = Ω('#we-predict');

Ω('#submit-btn').on('click', ()=>{
    getWeather();
});
Ω('#geo-btn').on('click', ()=>{
    getGeoWeather();
})
$('#type-in').keypress((e)=>{
    if(e.keyCode === 13){
        getWeather();
    }
})
});
const getWeather = () => {
    var cityname = Ω('#type-in').val();
    var typeIn =  document.querySelector('#type-in');
var btn =  Ω('#submit-btn');
var temp =  Ω('#temp-data');
var humidity =  Ω('#humid-data');
const keey = 'f672ff13193bfcc40427a678ebfdbc71';
var city =  Ω('#city-name');
var condition =  Ω('#weather-con');
var icon =  Ω('#icon-holder');
var sign =  Ω('#sign');
var predict = Ω('#we-predict');
    const findcoords = 'https://nominatim.openstreetmap.org/search/'+cityname+'?format=json&addressdetails=1&limit=1&polygon_svg=0';
    $.getJSON(findcoords, (res)=>{
        if(JSON.stringify(res)=='[]'){
            city.html('Not Found');
            temp.html('');
            humidity.html('');
            condition.html('');
            sign.html('');
            $('#icon-holder').attr('data', '');            
    }
        const lat = res[0].lat;
        const lon = res[0].lon;
        if(res[0].address.city != null)
        city.html(res[0].address.city+', '+res[0].address.country);
        else if(res[0].address.station != null && (res[0].address.town != null || res[0].address.city != null))
        city.html(res[0].address.station+', '+res[0].address.country);
        else if(res[0].address.attraction != null)
        city.html(res[0].address.attraction+', '+res[0].address.state+', '+res[0].address.country);
        else if(res[0].address.town != null)
        city.html(res[0].address.town+', '+res[0].address.country);
        else if(res[0].address.peak != null)
        city.html(res[0].address.peak+', '+res[0].address.country);
        else
        city.html(res[0].display_name);
        const prooxy = 'https://cors-anywhere.herokuapp.com/'
    const url = prooxy+'https://api.darksky.net/forecast/'+keey+'/'+lat+','+lon+'?units=si';
    $.getJSON(url, (res)=>{
        temp.html(parseInt(res.currently.temperature));
                temp.on('click', ()=>{
                    if(temp.html() == parseInt(res.currently.temperature) && Ω('#sign').html()=='C'){
                    temp.html(((parseInt(res.currently.temperature)*1.8)+32));
                    sign.html('F');
                }
                    else{
                    temp.html(parseInt(res.currently.temperature));
                    sign.html('C');}
                });
                sign.html('C');
                condition.html(res.currently.summary);
                predict.html(res.hourly.summary);
                iconify(res.currently.icon);
                humidity.html(parseFloat(res.currently.humidity)*100+'%');
    })
    .fail(()=>{
        city.html('Not Found');
        temp.html('');
        humidity.html('');
        condition.html('');
        sign.html('');
        $('#icon-holder').attr('data', '');
    })
})
}
const getGeoWeather= () => {
    if ("geolocation" in navigator) {
        var typeIn =  document.querySelector('#type-in');
        var btn =  Ω('#submit-btn');
        var temp =  Ω('#temp-data');
        var humidity =  Ω('#humid-data');
        var city =  Ω('#city-name');
        const keey = 'f672ff13193bfcc40427a678ebfdbc71';
        var condition =  Ω('#weather-con');
        var icon =  Ω('#icon-holder');
        const prooxy = 'https://cors-anywhere.herokuapp.com/'
        var predict = Ω('#we-predict');
        var sign =  Ω('#sign');
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = prooxy+'https://api.darksky.net/forecast/'+keey+'/'+lat+','+lon+'?units=si';
            const lurl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon+'&zoom=18&addressdetails=1'
            $.getJSON(lurl, (res)=>{
                if(res.address.city != null)
                    city.html(res.address.city+', '+res.address.country);
                else if(res.address.station != null && (res.address.town != null || res.address.city != null))
                city.html(res.address.station+', '+res.address.country);
                else if(res.address.attraction != null)
                city.html(res.address.attraction+', '+res.address.state+', '+res.address.country);
                else if(res.address.town != null)
                city.html(res.address.town+', '+res.address.country);
                else
                city.html(res.display_name);
            })
            $.getJSON(url, (res)=>{
                temp.html(parseInt(res.currently.temperature));
                temp.on('click', ()=>{
                    if(temp.html() == parseInt(res.currently.temperature) && Ω('#sign').html()=='C'){
                    temp.html(((parseInt(res.currently.temperature)*1.8)+32));
                    sign.html('F');
                }
                    else{
                    temp.html(parseInt(res.currently.temperature));
                    sign.html('C');}
                });
                sign.html('C');
                condition.html(res.currently.summary);
                predict.html(res.hourly.summary);
                iconify(res.currently.icon);
                humidity.html(parseFloat(res.currently.humidity)*100+'%');
            })
          });
      } else {
        alert('Geolocation is not possible.');
      }
}