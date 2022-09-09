const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(userEmail => alert(userEmail.email))
        .catch(err => alert(err.msg))
}

greetUser();