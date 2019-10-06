$('document').ready(()=>{
Ω('weather-module').register(div);
Ω('search-module').register(div);
Ω('type-in').register(inputText);
Ω('submit-btn').register(button);
Ω('city-name').register(h1);
Ω('temp-data').register(h1);
Ω('humid-data').register(h1);
Ω('weather-con').register(p);
Ω('icon-holder').register(object);
Ω('temp-holder').register(div);
var typeIn =  document.querySelector('#type-in');
var btn =  Ω('#submit-btn');
var temp =  Ω('#temp-data');
var humidity =  Ω('#humid-data');
var city =  Ω('#city-name');
var condition =  Ω('#weather-con');
var icon =  Ω('#icon-holder');
var sign =  Ω('#sign');


Ω('#submit-btn').on('click', ()=>{
    getWeather();
})
$('#type-in').keypress((e)=>{
    if(e.keyCode === 13){
        getWeather();
    }
})
});
const getWeather = () => {
    var cityname = Ω('#type-in').val();
    var appid = '8f0b781695b413cefc268dc91c2c32fd';
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+appid;
    var typeIn =  document.querySelector('#type-in');
var btn =  Ω('#submit-btn');
var temp =  Ω('#temp-data');
var humidity =  Ω('#humid-data');
var city =  Ω('#city-name');
var condition =  Ω('#weather-con');
var icon =  Ω('#icon-holder');
var sign =  Ω('#sign');
    $.getJSON(url, (res)=>{
        city.html(res.name);

        humidity.html(res.main.humidity+"%");
        temp.html(parseInt(res.main.temp - 273));
        sign.html('C');
        temp.on('click', ()=>{
            if(temp.html() == parseInt(res.main.temp - 273) && Ω('#sign').html()=='C'){
            temp.html((parseInt(res.main.temp - 273)*(9/5)+32));
            sign.html('F');
        }
            else{
            temp.html(parseInt(res.main.temp - 273));
            sign.html('C');}
        });
        condition.html(res.weather[0].description);
        iconify(res.weather[0].icon);
    })
    .fail(()=>{
        city.html('Not Found');
        temp.html('');
        humidity.html('');
        condition.html('');
        sign.html('');
        $('#icon-holder').attr('data', '');
    })
}