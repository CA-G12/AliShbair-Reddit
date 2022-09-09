const greetedEmail = document.querySelector('.greeted-email');

const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(userEmail => greetedEmail.textContent = `Welcome: ${userEmail.email}`)
        .catch(err => alert(err.msg))
}

greetUser();