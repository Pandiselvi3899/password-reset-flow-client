const form = document.getElementById('reset-form');
const submitbtn = document.getElementById('submitbtn');

function resetPassword() {
    const email = document.getElementById('email').value;
    submitbtn.innerHTML ='Loading...'
    if (!email) {
        custom_alert('warning', 'Please fill email field...')
        submitbtn.innerHTML ='Send Verification'
    } else {
        sendVerification(email)
    }
}

async function sendVerification(email) {
    let data = {
        email: email
    }
    let datares = await fetch('https://password-reset-flow-server-sam.herokuapp.com/resetpassword', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await datares.json()
    custom_alert(res.type_, res.message);
    if(res.type_ == 'success'){
        submitbtn.innerHTML ='Check your Inbox..'
        submitbtn.disabled = true
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 4500);
    }
    else{
        submitbtn.innerHTML ='Send Verification'
    }
    
}