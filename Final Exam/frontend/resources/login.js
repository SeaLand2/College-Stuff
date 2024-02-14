// Check to see if the email has the correct format
function validateEmail(email) {
    // Specify the layout that the email needs to be
    // <start>@<email>.<ext>
    const validRegex = /\S+@\S+\.\S+/

    // Check the format of the email
    if (validRegex.test(email)) {
        return true
    } else {
        return false
    }
}

// Check to see if the password is >= 8 charactes long and has at least 1 uppercase, lowercase, number and special character
function validatePassword(password) {
    // Define the regex
    const lowerCaseLetters = /[a-z]/g
    const upperCaseLetters = /[A-Z]/g
    const numbers = /[0-9]/g

    // Check the format of the password
    if (password.length > 8 && lowerCaseLetters.test(password) && upperCaseLetters.test(password) && numbers.test(password)) {
        return true
    } else {
        return false
    }
}

// Send the login request to the API and process the response
async function login(email, password) {
    var response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        body: JSON.stringify({
            user: {
                email: email,
                password: password
            }
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => { return response.json() })

    if (response.result == 'login') {
        document.getElementById('incorrect-message').innerHTML = ''
        // Store email within session storage this is
        // so that the user can stay logged in when they change page
        sessionStorage['user'] = JSON.stringify({ email: email })
        window.location.href = 'http://127.0.0.1:5500/index.html'
    } else if (response.result == 'fail') {
        document.getElementById('incorrect-message').innerHTML = 'Email or password is incorrect'
    } else {
        document.getElementById('incorrect-message').innerHTML = 'An error has occured\nTry again later'
    }
}


function submit() {
    // Recieve email and password from HTML
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    // Validate inputs then send data to API to
    // Make sure that user input is valid and reduce API requests
    if (validateEmail(email)) {
        if (validatePassword(password)) {
            document.getElementById('incorrect-message').innerHTML = ''
            login(email, password)
        } else {
            document.getElementById('incorrect-message').innerHTML = 'Email or password is incorrect'
        }
    } else {
        document.getElementById('incorrect-message').innerHTML = 'Email or password is incorrect'
    }
}