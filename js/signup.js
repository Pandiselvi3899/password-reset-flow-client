const form = document.getElementById('signup-form');

function signup() {
    const submitbtn = document.getElementById('submitbtn')
    submitbtn.innerHTML = 'Loading...'
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    const confirmpassword = document.getElementById('ConfirmPassword').value
    if (!email || !password || !confirmpassword) {
        custom_alert('warning', 'Please Fill all the Fields...')
        submitbtn.innerHTML = 'Try Again..'
    } else if (password !== confirmpassword) {
        custom_alert('warning', "'Confirm Password' field must match 'Password' field ...")
        submitbtn.innerHTML = 'Try Again..'
    } else {
        registerUser(email,password)
    }
}

async function registerUser(email,password) {
    let data = {
        email: email,
        password: password
    }
    let datares = await fetch('https://password-reset-flow-server-sam.herokuapp.com/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await datares.json()
    custom_alert(res.type_, res.message);
    if (res.type_ == 'success') {
        submitbtn.innerHTML = 'Signup Successful'
        setTimeout(() => {
            window.location.href = "./index.html"
            form.reset()
        }, 3000);
    }else{
        submitbtn.innerHTML = 'Try Again..'
    }
}