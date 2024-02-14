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

// Swap the change button for the submit buttonthis is to 
// make it clear to the user when they are changing email
function changeEmail() {
    document.getElementById('email').disabled = false
    document.querySelectorAll('.change-btn.email').forEach(a => a.style.display = 'none')
    document.querySelectorAll('.submit-btn.email').forEach(a => a.style.display = 'block')
}

// Swap the change button for the submit buttonthis is to 
// make it clear to the user when they are changing password
function changePassword() {
    document.querySelectorAll('.entry-password').forEach(a => a.style.display = 'flex')
    document.querySelectorAll('.change-btn.password').forEach(a => a.style.display = 'none')
    document.querySelectorAll('.submit-btn.password').forEach(a => a.style.display = 'block')
}

// Change users email
async function confirmEmail() {
    var user = JSON.parse(sessionStorage['user']).email
    var email = document.getElementById('email').value

    if (validateEmail(email)) {
        response = await fetch('http://localhost:8000/user/update', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    type: 'email',
                    change: email,
                    email: user
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => { return response.json() })
        if (response.result == 'success') {
            sessionStorage['user'] = JSON.stringify({ email: email })
            window.alert('Email has been changed successfully')
            window.location.href = 'http://127.0.0.1:5500/settings.html' // Refresh page to reset the email in the top-right
        } else if (response.result == 'fail') {
            window.alert('Email has fail to be changed')
        } else {
            window.alert('An error has occured. Try again later')
        }
    } else {
        window.alert('Invalid email')
    }
}

// Change users password
async function confirmPassword() {
    var user = JSON.parse(sessionStorage['user']).email
    var password = document.getElementById('password').value

    if (validatePassword(password)) {
        response = await fetch('http://localhost:8000/user/update', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    type: 'password',
                    change: password,
                    email: user
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => { return response.json() })
        if (response.result == 'success') {
            window.alert('Password has been changed successfully')
        } else if (response.result == 'fail') {
            window.alert('Password has fail to be changed')
        } else {
            window.alert('An error has occured. Try again later')
        }
    } else {
        window.alert('Password needs to contain: 1 uppercase and lowercase letter, a number and a special character.')
    }
}

// Delete the session storage for user
function logout() {
    sessionStorage.removeItem('user')
    window.location.href = 'index.html'
}

// Change the email displayed to users email
try {
    var user = sessionStorage['user']
    if (user) {
        user = JSON.parse(user)
        document.getElementById('email').value = user.email
    } else {
        window.location.href = 'index.html'
    }

} catch (err) {
    console.log('err: ' + err)
}
