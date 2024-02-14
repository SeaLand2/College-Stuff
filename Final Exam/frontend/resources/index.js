function gotoLogin() {
    window.location.href = 'login.html'
}

function gotoRegister() {
    window.location.href = 'register.html'
}

// Show/hide the login and signup buttons depending on if
// the user is logged in as soon as the page loads
window.onload = () => {
    try {
        var user = sessionStorage['user']
        if (user) {
            user = JSON.parse(user)
            document.querySelectorAll('.account').forEach(a => a.style.display = 'initial')
            document.querySelectorAll('.acc-email').forEach(a => a.innerHTML = user.email)
            document.querySelectorAll('.acc-btn').forEach(a => a.style.display = 'none')
        } else {
            document.querySelectorAll('.account').forEach(a => a.style.display = 'none')
            document.querySelectorAll('.acc-btn').forEach(a => a.style.display = 'initial')
        }
    } catch (err) {
        console.log('err: ' + err)
    }
}
