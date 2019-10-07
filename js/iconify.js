const iconify = (icon) => {
    if(icon == 'clear-day')
    $('#icon-holder').attr('data', 'svg/Sun.svg');
    else if(icon == 'clear-night')
    $('#icon-holder').attr('data', 'svg/Moon.svg');
    else if( icon == 'partly-cloudy-day')
    $('#icon-holder').attr('data', 'svg/Cloud-Sun.svg');
    else if(icon == 'partly-cloudy-night')
    $('#icon-holder').attr('data', 'svg/Cloud-Moon.svg');
    else if(icon == 'cloudy')
    $('#icon-holder').attr('data', 'svg/Cloud.svg');
    else if(icon == 'snow')
    $('#icon-holder').attr('data', 'svg/Snowflake.svg');    
    else if(icon == 'rain')
    $('#icon-holder').attr('data', 'svg/Cloud-Rain.svg');    
    else if(icon == 'sleet')
    $('#icon-holder').attr('data', 'svg/Cloud-Drizzle.svg');    
    else if(icon == 'wind')
    $('#icon-holder').attr('data', 'svg/Wind.svg');    
    else if(icon == 'fog')
    $('#icon-holder').attr('data', 'svg/Cloud-Fog-Alt.svg');
}