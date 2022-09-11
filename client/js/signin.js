const signInForm = document.querySelector('#stripe-login');
const errMsg = document.querySelector('.err-msg');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;

    if (email.trim() === '' || password.trim() === '') {
        errMsg.textContent = 'you must enter a valid value'
        return;
    }

    const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('/signin', options)
        .then(data => data.json())
        .then(user => {
            if (user.status) throw user;
            window.location = '/';
        })
        .catch((err) => {
            errMsg.textContent = err.msg;
        });
});
