const greetedUser = document.querySelector('.greeted-user');

const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(user => greetedUser.textContent = `Welcome: ${user.username}`)
        .catch(err => alert(err.msg))
}

greetUser();