$('document').ready(()=>{
Ω('weather-module').register(div);
Ω('search-module').register(div);
Ω('type-in').register(inputText);
Ω('submit-btn').register(button);
Ω('city-name').register(h3);
Ω('temp-data').register(h1);
Ω('humid-data').register(h1);
Ω('weather-con').register(p);
Ω('icon-holder').register(canvas);
Ω('temp-holder').register(div);
Ω('geo-btn').register(button);
Ω('we-predict').register(p);
Ω('show-more').register(button);
Ω('extend-module').register(div);
Ω('day-2').register(div);
Ω('icon-2').register(canvas);
Ω('temp-2').register(h1);
Ω('con-2').register(p);
Ω('day-3').register(div);
Ω('icon-3').register(canvas);
Ω('temp-3').register(h1);
Ω('con-3').register(p);
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
            predict.html('');
            $('#icon-holder').hide();            
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
        $('#show-more').show();
        $('#icon-holder').show();
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
                humidity.html(parseInt(res.currently.humidity*100)+'%');
                getDay2(res);            
                getDay3(res); 
    })
    .fail(()=>{
        city.html('Not Found');
        temp.html('');
        humidity.html('');
        condition.html('');
        sign.html('');
        predict.html('');
        $('#icon-holder').hide();
        $('#show-more').hide();
        $('#extend-module').hide();
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
                $('#show-more').show();
                $('#icon-holder').show();
                temp.html(parseInt(res.currently.temperature));
                temp.on('click', ()=>{
                    if(temp.html() == parseInt(res.currently.temperature) && Ω('#sign').html()=='C'){
                    temp.html(((parseInt(res.currently.temperature)*1.8)+32).toFixed(0));
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
                humidity.html((parseInt(res.currently.humidity*100)).toFixed(2)+'%');
                getDay2(res);            
                getDay3(res);            
            })
          });
      } else {
        alert('Geolocation is not possible.');
      }
}
const getDay2 = (res)=>{
    $('#temp-2').removeClass('no-cel')
    iconify(res.daily.data[1].icon, '#icon-2')
                $('#temp-2').html(parseInt(res.daily.data[1].temperatureHigh) + ' / ' + parseInt(res.daily.data[1].temperatureLow) +' C');            
                $('#temp-2').click(()=>{
                $('#temp-2').toggleClass('no-cel')
                if($('#temp-2').hasClass('no-cel')){
                $('#temp-2').html(parseInt((res.daily.data[1].temperatureHigh)*1.8)+32 + ' / ' + ((parseInt(res.daily.data[1].temperatureLow)*1.8)+32).toFixed(2) +' F');
                }
                else if(! $('#temp-2').hasClass('no-cel')){
                $('#temp-2').html(parseInt(res.daily.data[1].temperatureHigh) + ' / ' + parseInt(res.daily.data[1].temperatureLow) +' C');            
                }
            });
                $('#con-2').html(res.daily.data[1].summary);
}
const getDay3 = (res)=>{
    iconify(res.daily.data[2].icon, '#icon-3')
                $('#temp-3').removeClass('no-cel')
                $('#temp-3').html(parseInt(res.daily.data[2].temperatureHigh) + ' / ' + parseInt(res.daily.data[2].temperatureLow) +' C');            
                $('#temp-3').click(()=>{
                    $('#temp-3').toggleClass('no-cel');
                    if($('#temp-3').hasClass('no-cel')){
                    $('#temp-3').html(parseInt(((res.daily.data[1].temperatureHigh)*1.8)+32).toFixed(2) + ' / ' + ((parseInt(res.daily.data[1].temperatureLow)*1.8)+32).toFixed(2) +' F');
                    }
                    else if(! $('#temp-3').hasClass('no-cel')){
                    $('#temp-3').html(parseInt(res.daily.data[1].temperatureHigh) + ' / ' + parseInt(res.daily.data[1].temperatureLow) +' C');            
                    }
                });
                $('#con-3').html(res.daily.data[2].summary);
}
const iconify = (icon, iconid) =>{
    let iconholder;
    if(iconid == null || iconid == undefined){
    iconholder = document.querySelector('#icon-holder');}
    else{
    iconholder = document.querySelector(iconid);}
    const skycons  = new Skycons({monochrome : false,
                                 "resizeClear": true});
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.set(iconholder, Skycons[currentIcon]);
    skycons.play();
}