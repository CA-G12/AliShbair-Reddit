const welcomeUser = () => {
    fetch('/welcome')
        .then(data => data.json())
        .then(userEmail => console.log('userEmail:', userEmail))
}

welcomeUser();