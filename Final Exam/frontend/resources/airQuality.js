// Show the Air quality index popup
document.querySelector('.information').addEventListener('click', () => {
    document.querySelector('.index').style.display = 'flex'
})

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
    // Itterate over each section of the response
    response.data.data.forEach(element => {
        if (element.title == adviceTitle) {
            const advicePopup = document.querySelectorAll('.advice-popup')[1]
            // Display advice
            advicePopup.querySelector('h1').innerHTML = element.title
            advicePopup.querySelector('p').innerHTML = element.description
            advicePopup.style.display = 'flex'
        }
    })
}

// Close the popup
function goBack() {
    document.querySelectorAll('.advice-popup').forEach(element => {
        element.style.display = 'none'
    })
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

// Recieve advice from the database
async function getAdvice() {
    response = await fetch('http://localhost:8000/advice/getAdvice', {
        method: 'POST',
        body: JSON.stringify({
            type: 'airQuality'
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

// Get data from the weather API
async function getData(lat, lon) {
    response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=74ee89923d1a41d368d81b85dc863f6a`)
        .then((response) => { return response.json() })
    var data = response.list[0].components
    // Create a pie chart from the data
    var xValues = Object.keys(data)
    var yValues = Object.values(data)
    var barColours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'grey']

    document.querySelector('.index-rating h2').innerHTML = response.list[0].main.aqi

    // See if a pie chart already exists. If so then delete it
    if (pieChart) {
        pieChart.destroy()
    }

    // Create a pie chart to display the air quality data
    var pieChart = new Chart(document.getElementById('air-quality-chart'), {
        type: 'pie',
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColours, data: yValues
            }]
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: 'Current Air Pollution'
            }
        }
    })
}

// Refresh the piechart using lat and lon inputs
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