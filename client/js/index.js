const greetedUser = document.querySelector('.greeted-user');
const signoutBtn = document.querySelector('.signout-btn');

const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(user => { if (user.username) greetedUser.textContent = `Welcome: ${user.username}` })
        .catch(err => console.log(err))
}
greetUser();

signoutBtn.addEventListener('click', () => {
    fetch('/signout')
        .then(() => greetedUser.textContent = '')
        .catch((err) => console.log(err));
})

const displayAllPosts = () => {
    fetch('/home')
        .then(data => data.json())
        .then(posts => console.log('SORTED POSTS:', posts))
        .catch(err => console.log(err))
}
displayAllPosts()