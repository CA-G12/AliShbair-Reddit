const signupForm = document.querySelector('#stripe-login');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errMsg = document.querySelector('.err-msg');

const validateForm = (username, email, password, confirmPassword) => {
    if ((username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '')) {
        errMsg.textContent = 'Spaces are not allowed'
        return false;
    }
    if (password !== confirmPassword) {
        confirmPasswordInput.style.border = 'red solid 1px';
        errMsg.textContent = 'Passwords are not matched'
        return false;
    }
    return true;
};

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;

    const isValidate = validateForm(username, email, password, confirmPassword);
    if (!isValidate) return;

    const options = {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('/signup', options)
        .then(data => data.json())
        .then(user => {
            if (user.status) throw user;
            window.location = '/';
        })
        .catch((err) => {
            console.log('errrrrrr:', err);
            errMsg.textContent = err.msg;
        });
});