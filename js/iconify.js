const iconify = (icon) => {
    if(icon == '01d')
    $('#icon-holder').attr('data', 'svg/Sun.svg');
    else if(icon == '01n')
    $('#icon-holder').attr('data', 'svg/Moon.svg');
    else if(icon == '50d'|| icon == '50n')
    $('#icon-holder').attr('data', 'svg/Tornado.svg');
    else if(icon == '02d')
    $('#icon-holder').attr('data', 'svg/Cloud-Sun.svg');
    else if(icon == '02n')
    $('#icon-holder').attr('data', 'svg/Cloud-Moon.svg');
    else if(icon == '03d')
    $('#icon-holder').attr('data', 'svg/Cloud-Fog-Sun-Alt.svg');
     else if(icon == '03n')
    $('#icon-holder').attr('data', 'svg/Cloud-Fog-Moon-Alt.svg');
    else if(icon == '04n' || icon == '04d')
    $('#icon-holder').attr('data', 'svg/Cloud.svg');
    else if(icon == '13d')
    $('#icon-holder').attr('data', 'svg/Snowflake.svg');    
    else if(icon == '10d')
    $('#icon-holder').attr('data', 'svg/Cloud-Drizzle-Sun.svg');
    else if(icon == '09d')
    $('#icon-holder').attr('data', 'svg/Cloud-Drizzle-Moon.svg');
    else if(icon == '11d')
    $('#icon-holder').attr('data', 'svg/Cloud-Lightning.svg');
}