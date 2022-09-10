const greetedUser = document.querySelector('.greeted-user');
const signoutBtn = document.querySelector('.signout-btn');
const postsContainer = document.querySelector('.posts-container');
const submitPostBtn = document.querySelector('.submit-post-btn');
const postInput = document.querySelector('.post-input');
const errMsg = document.querySelector('.err-msg');

//! ============== ADD NEW POST ==============
submitPostBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (postInput.value.trim() === '') {
        errMsg.textContent = 'you must enter a valid value';
        return;
    }
    const options = {
        method: 'POST',
        body: JSON.stringify({ post: postInput.value }),
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('/submitPost', options)
        .then(res => res.json())
        .then(data => {
            if (data.status) throw data;
            window.location = '/';
        })
        .catch((err) => {
            errMsg.textContent = err.msg;
            setTimeout(() => errMsg.textContent = '', 3000);
        });
})

//! ============== DELETE OWN POST ==============
const deletePost = (id) => {
    fetch(`/deletePost/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.status) throw data;
            window.location = '/';
        })
        .catch(err => alert(err.msg))
}

//! ============== PRINT USER NAME ==============
const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(user => { if (user.username) greetedUser.textContent = `welcome: ${user.username}` })
        .catch(err => console.log(err))
}
greetUser();


//! ============== LOGOUT USER ==============
signoutBtn.addEventListener('click', () => {
    fetch('/signout')
        .then(() => greetedUser.textContent = '')
        .catch((err) => console.log(err));
})

//! ============== GET POSTS ==============
const getAllPosts = () => {
    fetch('/home')
        .then(data => data.json())
        .then(posts => {
            renderPosts(posts);
        })
        .catch(err => console.log(err))
}
getAllPosts();

//! ============== RENDER POSTS ==============
const renderPosts = (posts) => {
    postsContainer.innerHTML = ''
    posts.forEach(post => {
        postsContainer.innerHTML += `
        <div class="col-8 col-lg-6 post single-post" id=${post.post_id}>
        <p class="deleteErr" name="deleteErr"></p>
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
                                <h5 class="text-muted time">${post.created_at}</h5>
                            </div>
                        </div>
                        <span class="btn btn-default stat-item delete-post-btn " onclick = "deletePost(${post.post_id})">
                            x
                        </span>
                    </div>
                    <div class="post-description">
                        <p>${post.post}</p>
                        <div class="stats">
                            <span class="btn btn-default stat-item like-btn " id=${post.post_id}>
                                <i class="fa fa-thumbs-up icon like"></i>
                            </span>
                            <span class="btn btn-default stat-item dislike-btn" id=${post.post_id}>
                                <i class="fa fa-thumbs-down icon"></i>
                            </span>
                            
                            <div class="d-inline">votes: <span class="votes-span">${post.votes_count}</span></div>
                        </div>
                    </div>
                    <div class="post-footer">
                        <div class="input-group">
                            <input class="form-control comment-input" id=${post.post_id} placeholder="Add a comment" type="text">
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

    //! ============== COMMENT ON POST ==============
    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            comment(input.id, e.target.value)
        })
    })
    const comment = (id, value) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ comment: value }),
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/comment/${id}`, options)
            .then(res => res.json())
            .then(data => {
                if (data.status) throw data;
                window.location = '/';
            })
            .catch((err) => console.log(err));
    }

    //! ============== VOTE POST ==============
    const likeBtns = document.querySelectorAll('.like-btn');
    const dislikeBtns = document.querySelectorAll('.dislike-btn');

    likeBtns.forEach(like => {
        like.addEventListener('click', () => {
            const post_id = like.id;
            fetch(`/like/${post_id}`)
                .then(()=> window.location = '/')
                .catch(console.log)
        })
    })

    dislikeBtns.forEach(dislike => {
        dislike.addEventListener('click', () => {
            const post_id = dislike.id;
            fetch(`/dislike/${post_id}`)
                .then(() => window.location = '/')
                .catch(console.log)
        })
    })

    //! ============== RENDER COMMENTS ==============
    const commentsContainer = Array.from(document.querySelectorAll('.comments-container'));
    commentsContainer.forEach(singleContainer => {
        fetch(`/getComments/${singleContainer.id}`)
            .then(data => data.json())
            .then(comments => {
                comments.forEach(comment => {
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
                    <span class="btn btn-default stat-item delete-comment-btn" onclick = "deleteComment(${comment.comment_id})">x</span>
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

//! ============== DELETE OWN COMMENT ==============
const deleteComment = (id) => {
    fetch(`/deleteComment/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.status) throw data;
            window.location = '/';
        })
        .catch(err => alert(err.msg))
}