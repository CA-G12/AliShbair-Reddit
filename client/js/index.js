const greetedUser = document.querySelector('.greeted-user');
const signoutBtn = document.querySelector('.signout-btn');
const postsContainer = document.querySelector('.posts-container');


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

const getAllPosts = () => {
    fetch('/home')
        .then(data => data.json())
        .then(posts => {
            console.log('SORTED POSTS:', posts);
            renderPosts(posts);
        })
        .catch(err => console.log(err))
}
getAllPosts();


const renderPosts = (posts) => {
    postsContainer.innerHTML = ''
    posts.forEach(post => {
        postsContainer.innerHTML += `
        <div class="col-8 col-lg-6 post" id=${post.post_id}>
                <div class="panel panel-white post panel-shadow">
                    <div class="post-heading d-flex justify-content-between">
                        <div>
                            <a href="./html/profile.html">
                                <div class="pull-left image">
                                    <img src="${post.img}" class="img-circle avatar"
                                        alt="user profile image">
                                </div>
                            </a>
                            <div class="pull-left meta">
                                <div class="title h5">
                                    <b>${post.username}</b>
                                </div>
                                <h6 class="text-muted time">${post.created_at}</h6>
                            </div>
                        </div>

                        <span class="btn btn-default stat-item delete-post-btn">
                            x
                        </span>

                    </div>


                    <div class="post-description">
                        <p>${post.post}</p>
                        <div class="stats">
                            <span class="btn btn-default stat-item like-btn">
                                <i class="fa fa-thumbs-up icon like"></i>
                            </span>
                            <span class="btn btn-default stat-item dislike-btn dislike">
                                <i class="fa fa-thumbs-down icon"></i>
                            </span>
                            
                            <div class="d-inline">votes: <span class="votes-span">${post.votes_count}</span></div>
                        </div>

                    </div>
                    <div class="post-footer">
                        <div class="input-group">
                            <input class="form-control" placeholder="Add a comment" type="text">
                            <span class="input-group-addon">
                                <a href="#"><i class="fa-solid fa-trash"></i></a>
                            </span>
                        </div>
                        <ul class="comments-list comments-container " id=${post.post_id}>
                        </ul>
                    </div>
                </div>
            </div>

        `
    })

    const commentsContainer = Array.from(document.querySelectorAll('.comments-container'));
    commentsContainer.forEach(singleContainer => {
        console.log('IIID:', singleContainer.id);
        fetch(`/getComments/${singleContainer.id}`)
            .then(data => data.json())
            .then(comments => {
                console.log('comments of each post:', comments);
                comments.forEach(comment => {
                    console.log('single', comment);
                    singleContainer.innerHTML += `
                     <li class="comment" id=${comment.comment_id}>
<a class="pull-left" href="#">
<img class="avatar" src="https://bootdey.com/img/Content/user_1.jpg" alt="avatar">
    </a>
     <div class="comment-body">
    <div>
      <div class="comment-heading d-flex justify-content-between ">
     <div>
    <h4 class="user">${comment.username}</h4>
    <h5 class="time">${comment.created_at}</h5>
   </div>
<span class="btn btn-default stat-item delete-comment-btn">x</span>
</div>
<p>${comment.comment}</p>
</div>
</div>
</li>
                    `
                })

            })
        .catch(err => console.log(err))
    })


};







