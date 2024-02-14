// Display advice within a popup
async function viewAdvice(adviceTitle) {
    response = await fetch('http://localhost:8000/advice/getAdvice', {
        method: 'POST',
        body: JSON.stringify({
            type: 'all'
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => { return response.json() })
    response.data.data.forEach(element => {
        if (element.title == adviceTitle) {
            const advicePopup = document.querySelector('.advice-popup')
            //display advice
            advicePopup.querySelector('h1').innerHTML = element.title
            advicePopup.querySelector('p').innerHTML = element.description
            advicePopup.style.display = 'flex'
        }
    })
}

// Close the popup
function goBack() {
    document.querySelector('.advice-popup').style.display = 'none'
}

// Add advice to the document using a template
function addAdvice(data) {
    if (data != '') {
        const adviceTemplate = document.querySelector('#advice-template')
        const adviceCon = document.querySelector('#advice-links')

        data.forEach(element => {
            const advice = adviceTemplate.cloneNode(true)

            advice.querySelectorAll('h4')[0].innerHTML = element.title
            advice.querySelectorAll('.advice-img')[0].src = './images/' + element.image
            advice.querySelector('.link').addEventListener('click', () => {
                viewAdvice(element.title)
            })
            advice.style.display = 'flex'
            adviceCon.appendChild(advice)
        })
    }
}

// Recieve advice from teh database
async function getAdvice() {
    response = await fetch('http://localhost:8000/advice/getAdvice', {
        method: 'POST',
        body: JSON.stringify({
            type: 'weather'
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => { return response.json() })
    addAdvice(response.data.data)
}

// Call function to display advice when the page laods
getAdvice()

// Display the weather for today
function todayWeather(data) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var iconcode = data.weather[0].icon
    var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`
    var weather = data.weather[0].main
    var maxTemp = Math.round(data.main.temp_max)
    var minTemp = Math.round(data.main.temp_min)

    // Change the content on daily forecast
    document.getElementById('weather-icon').src = iconurl
    document.getElementById('day').innerHTML = days[new Date(data.dt * 1000).getDay()]
    document.getElementById('weather').innerHTML = weather
    if (document.getElementById('celsius').checked == true) {
        document.getElementById('tempurature').innerHTML = `${maxTemp}\u00B0\u0043 - ${minTemp}\u00B0\u0043`
    } else {
        document.getElementById('tempurature').innerHTML = `${maxTemp}\u00B0\u0046 - ${minTemp}\u00B0\u0046`
    }
}

// Display the weather for the next 4 days
function addForecasts(data) {
    const forecastTemplate = document.querySelector('.forecast-template')
    const forecastsCon = document.getElementById('forecasts')

    while (forecastsCon.childNodes.length > 1) {
        forecastsCon.removeChild(forecastsCon.lastChild);
    }

    data.forEach(element => {
        const forecast = forecastTemplate.cloneNode(true)
        // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] Correct???
        var days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        var iconcode = element.weather[0].icon
        var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`
        var maxTemp = Math.round(element.main.temp_max)
        var minTemp = Math.round(element.main.temp_min)
        forecast.querySelectorAll('p')[0].innerHTML = days[new Date(element.dt * 1000).getDay()]
        forecast.querySelector('img').src = iconurl
        forecast.querySelectorAll('p')[0].innerHTML
        if (document.getElementById('celsius').checked == true) {
            forecast.querySelectorAll('p')[1].innerHTML = `${maxTemp}\u00B0\u0043 - ${minTemp}\u00B0\u0043`
        } else {
            forecast.querySelectorAll('p')[1].innerHTML = `${maxTemp}\u00B0\u0046 - ${minTemp}\u00B0\u0046`
        }
        forecast.style.display = 'initial'
        forecastsCon.appendChild(forecast)
    })
}

// Get data from the weather API
async function getData(lat, lon) {
    if (document.getElementById('celsius').checked == true) {
        units = 'metric'
    } else {
        units = 'imperial'
    }
    response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=74ee89923d1a41d368d81b85dc863f6a`)
        .then((response) => { return response.json() })
    var dayList = []
    var forecasts = []
    var today = new Date()

    // Find the closest time that the API forecast provides
    var times = [...new Set(response.list.map(item => new Date(item.dt * 1000).getHours()))] // create an array of unique hours from the response
    var currentTime = today.getHours()
    var closest = times.reduce(function (prev, curr) {
        return (Math.abs(curr - currentTime) < Math.abs(prev - currentTime) ? curr : prev)
    })

    // Filter the API response so that only ones with the correct time and unique day are used
    response.list.forEach(element => {
        var date = new Date(element.dt * 1000)
        var day = date.getDay()
        if (!dayList.includes(day) && date.getHours() == closest) {

            dayList.push(day)
            // 1st is today/right now
            // rest are next few days (forecast)
            forecasts.push(element)
        }
    })

    todayWeather(forecasts[0])
    addForecasts(forecasts.slice(1,))
}

// Uncheck the other tempurature input when one is selected
function check(temp) {
    if (temp == 'farenheit') {
        document.getElementById('farenheit').checked = true
        document.getElementById('celsius').checked = false
    } else if (temp == 'celsius') {
        document.getElementById('celsius').checked = true
        document.getElementById('farenheit').checked = false
    }
}

// Refresh the forecast when user selects the refesh button
function refresh() {
    var lat = document.getElementById('latitude').value
    var lon = document.getElementById('longitude').value
    getData(lat, lon)
}

// Make sure that the user cannot input a value larger than the max/min
document.getElementById('latitude').addEventListener('input', () => {
    var input = document.getElementById('latitude')
    if (input.value > 90 || input.value == '90.') {
        input.value = 90
    } else if (input.value < -90 || input.value == '-90.') {
        input.value = -90
    }
})

// Make sure that the user cannot input a value larger than the max/min
document.getElementById('longitude').addEventListener('input', () => {
    var input = document.getElementById('longitude')
    if (input.value > 180 || input.value == '180.') {
        input.value = 180
    } else if (input.value < -180 || input.value == '-180.') {
        input.value = -180
    }
})

// Change the Latitude and Longitude boxed to their values
function setLatLon(lat, lon) {
    var latInput = document.getElementById('latitude')
    var lonInput = document.getElementById('longitude')
    latInput.value = lat
    lonInput.value = lon
}

// Geolocation works at getting location
function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    setLatLon(lat, lon)
    getData(lat, lon)
}

// Cannot get geolocation
function error() {
    window.alert('Unable to get location. Defaulting to London, UK')
    var lat = 51.5072;
    var lon = 0.1276;
    setLatLon(lat, lon)
    getData(lat, lon)
}

// Check to see is geolocation is supported
if (!navigator.geolocation) {
    window.alert('Geolocation is not supported by your browser. Defaulting to London, UK')
    var lat = 51.5072;
    var lon = 0.1276;
    setLatLon(lat, lon)
    getData(lat, lon)
} else {
    // Get the users lat+lon using geolocation
    navigator.geolocation.getCurrentPosition(success, error);
}