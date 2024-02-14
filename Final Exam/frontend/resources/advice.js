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
        // Create advice using the data recieved 
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
            type: 'all'
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => { return response.json() })
    addAdvice(response.data.data)
}

// Call the function to get advice when page loads
getAdvice()