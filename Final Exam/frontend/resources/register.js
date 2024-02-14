function gotoHome() {
    window.location.href = 'http://127.0.0.1:5500/index.html'
}

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

async function register(email, password) {
    // Send the request to the API
    response = await fetch('http://localhost:8000/user/register', {
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

    if (response.result == 'account created') {
        document.getElementById('incorrect-message').innerHTML = ''
        // Store email within session storage this is
        // so that the user can stay logged in when they change page
        sessionStorage['user'] = JSON.stringify({ email: email })
        document.querySelectorAll('.login-popup').forEach(a => a.style.display = 'flex')
    } else if (response.result == 'cannot create account') {
        document.getElementById('incorrect-message').innerHTML = 'Cannot create account'
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
            register(email, password)
        } else {
            document.getElementById('incorrect-message').innerHTML = 'Invalid password'
            window.alert('Password needs to contain: 1 uppercase and lowercase letter, a number and a special character.')
        }
    } else {
        document.getElementById('incorrect-message').innerHTML = 'Invalid email'
    }
}