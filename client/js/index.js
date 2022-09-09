const greetedUser = document.querySelector('.greeted-user');
const signoutBtn = document.querySelector('.signout-btn');

console.log(signoutBtn);
const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(user => greetedUser.textContent = `Welcome: ${user.username}`)
        .catch(err => console.log(err))
}
greetUser();

signoutBtn.addEventListener('click', () => {
    fetch('/signout')
        .then(() => greetedUser.textContent = '')
        .catch((err) => console.log(err));
})