const greetedUser = document.querySelector('.greeted-user');
const signoutBtn = document.querySelector('.signout-btn');
const postsContainer = document.querySelector('.posts-container');
const submitPostBtn = document.querySelector('.submit-post-btn');
const postInput = document.querySelector('.post-input');
const errMsg = document.querySelector('.err-msg');
const modal = document.querySelector('.modal');

//! ============== PRINT USER NAME ==============
const greetUser = () => {
    fetch('/greet')
        .then(data => data.json())
        .then(user => { if (user.username) greetedUser.textContent = `welcome ${user.username}` })
        .catch(err => console.log(err))
}
greetUser();

//! ============== LOGOUT USER ==============
signoutBtn.addEventListener('click', () => {
    fetch('/signout')
        .then(() => greetedUser.textContent = '')
        .catch((err) => console.log(err));
});

//! ============== ADD NEW POST ==============
submitPostBtn.addEventListener('click', (e) => {
    e.preventDefault(e);
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
        .then(post => {
            if (post.status) throw post;
            renderPost(post.post);
            postInput.value = ''
            errMsg.textContent = `${post.msg}`
            errMsg.style.color = 'green';
            setTimeout(() => {
                errMsg.textContent = ''
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.querySelector('.modal-backdrop').remove();
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = "0px";
            }, 1500)
        })
        .catch((err) => {
            errMsg.textContent = err.msg;
            setTimeout(() => errMsg.textContent = '', 3000);
        });
});

//! ============== DELETE OWN POST ==============
const deletePost = (id) => {
    fetch(`/deletePost/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.status) throw data;
            document.getElementById(`${id}`).remove();
        })
        .catch(err => alert(err.msg))
};

//! ============== GET POSTS ==============
const getAllPosts = () => {
    fetch('/home')
        .then(data => data.json())
        .then(posts => posts.forEach(post => renderPost(post)))
        .catch(err => console.log(err))
};
getAllPosts();

//! ============== RENDER POSTS ==============
const renderPost = (post) => {
    postsContainer.innerHTML += `
        <div class="col-8 col-lg-6 post single-post" id=${post.post_id}>
        <p class="deleteErr" name="deleteErr"></p>
                <div class="panel panel-white post panel-shadow">
                    <div class="post-heading d-flex justify-content-between">
                        <div>
                            <a href="./html/profile.html">
                                <div class="pull-left image">
                                    <img src="https://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar"
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
                        <span class="btn btn-default stat-item delete-post-btn "
                          onclick = "deletePost(${post.post_id})">
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
                    <div class="post-footer" id=notDuplicated${post.post_id}>
                        <div class="input-group">
                            <input class="form-control comment-input" id=${post.post_id}
                             placeholder="Add a comment" type="text">
                            <span class="input-group-addon">
                                <a href="#"><i class="fa-solid fa-trash"></i></a>
                            </span>
                        </div>
                        <ul class="comments-list comments-container" id=${post.post_id} >
                        </ul>
                    </div>
                </div>
            </div>
        `

    //! ============== VOTE POST ==============
    const likeBtns = document.querySelectorAll('.like-btn');
    const dislikeBtns = document.querySelectorAll('.dislike-btn');

    likeBtns.forEach(like => {
        like.addEventListener('click', () => {
            const votesCountEle = like.parentElement.lastElementChild;
            handleVote(like.id, 'like', votesCountEle)
        })
    });
    dislikeBtns.forEach(dislike => {
        dislike.addEventListener('click', () => {
            const votesCountEle = dislike.parentElement.lastElementChild;
            handleVote(dislike.id, 'dislike', votesCountEle)
        })
    });

    const handleVote = (votedPost_id, voteType, votesCountEle) => {
        fetch(`/vote/${votedPost_id}.${voteType}`)
            .then(res => res.json())
            .then((newCount) => {
                if (newCount.status) throw newCount;
                votesCountEle.textContent = `votes: ${newCount.msg}`;
                votesCountEle.style.color = newCount.color;
            })
            .catch(err => console.log(err.msg))
    };

    //! ============== COMMENT ON POST ==============
    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            addComment(input.id, e.target.value)
            e.target.value = '';
        })
    });
    const addComment = (post_id, value) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ comment: value }),
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/comment/${post_id}`, options)
            .then(res => res.json())
            .then(comment => {
                if (comment.status) throw comment;
                renderComments(comment.comment, post_id);
            })
            .catch((err) => console.log(err));
    };

    //! ============== GET COMMENTS ==============
    const commentsContainer = document.querySelectorAll('.comments-container');
    commentsContainer.forEach(container => {
        fetch(`/getComments/${container.id}`)
            .then(data => data.json())
            .then(comments => {
                comments.forEach(comment => {
                    renderComments(comment, container.id, container)
                })
            })
            .catch(err => console.log(err))
    })
}; // end render post

//! ============== RENDER COMMENTS ==============
const renderComments = (comment, post_id, queriedContainer) => {
    const containerCase = queriedContainer || document.getElementById(`notDuplicated${post_id}`).childNodes[3];
    containerCase.innerHTML += `
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
                    <span class="btn btn-default stat-item delete-comment-btn"
                    onclick = "deleteComment(${comment.comment_id})">x</span>
                    </div>
                    <p>${comment.comment}</p>
                    </div>
                    </div>
                    </li>
                    `
};

//! ============== DELETE OWN COMMENT ==============
const deleteComment = (id) => {
    fetch(`/deleteComment/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if (data.status) throw data;
            document.getElementById(`${id}`).remove();
        })
        .catch(err => alert(err.msg))
};





