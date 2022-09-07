const signInForm = document.querySelector('#stripe-login');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;

    if (email.trim() === '' || password.trim() === '') {
        alert('you must enter a valid value');
        return;
    }

    const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('/signin', options)
        .then(() => window.location = '/')
        .catch((err) => console.log(err));
});
