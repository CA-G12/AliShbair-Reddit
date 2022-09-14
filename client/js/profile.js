const username = window.location.href.split('=')[1];
const infoContainer = document.querySelector('.profile-section-user');
const streamPosts = document.querySelector('.stream-posts');

const visitProfile = (username) => {
    fetch(`/profile/${username}`)
        .then(res => res.json())
        .then(userPosts => {
            if (userPosts.status) throw userPosts;
            const { username, img, email } = userPosts[0];
            renderUserInfo({ username, img, email, numOfPosts: userPosts.length });
            userPosts.forEach(post => renderUserPost(post))
        })
        .catch(console.log)
};
if (username) visitProfile(username);

const renderUserInfo = ({ username, img, email, numOfPosts }) => {
    infoContainer.innerHTML = `
    <div class="profile-cover-img"><img
                        src="https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg" alt=""></div>
                <div class="profile-info-brief p-3"><img class="img-fluid user-profile-avatar"
                        src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="">
                    <div class="text-center">
                        <h5 class="text-uppercase mb-4">${username}</h5>
                        <p class="text-muted fz-base">I'm ${username} a web developer and software engineer. I studied
                            computer
                            science and software engineering.</p>
                    </div>
                </div>
                <!-- /.profile-info-brief -->
                <hr class="m-0">
                <div class="hidden-sm-down">
                    <hr class="m-0">
                    <div class="profile-info-contact p-4">
                        <h6 class="mb-3">Contact Information</h6>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><strong>POSTS:</strong></td>
                                    <td>
                                        <p class="text-muted mb-0">${numOfPosts} posts</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>EMAIL:</strong></td>
                                    <td>
                                        <p class="text-muted mb-0">${email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>PHONE: </strong></td>
                                    <td>
                                        <p class="text-muted mb-0">01145525755</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.profile-info-contact -->
                    <hr class="m-0">
                    <div class="profile-info-general p-4">
                        <h6 class="mb-3">General Information</h6>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><strong>JOB:</strong></td>
                                    <td>
                                        <p class="text-muted mb-0">Web Developer</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>POSITION:</strong></td>
                                    <td>
                                        <p class="text-muted mb-0">Team Manager</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>STUDIED:</strong></td>
                                    <td>
                                        <p class="text-muted mb-0">Computer Science</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>LAST SEEN:</strong></td>
                                    <td>
                                        <p class="text-muted mb-0">Yesterday 8:00 AM</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.profile-info-general -->
                    <hr class="m-0">
                </div>
                <!-- /.hidden-sm-down -->
    `
};

const renderUserPost = (post) => {
    streamPosts.innerHTML += `
    <div class="stream-post">
                                <div class="sp-author">
                                    <a href="#" class="sp-author-avatar"><img
                                            src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""></a>
                                    <h6 class="sp-author-name"><a >${post.username}</a></h6>
                                </div>
                                <div class="sp-content">
                                    <div class="sp-info">${post.created_at}</div>
                                    <p class="sp-paragraph mb-0">${post.post}</p>
                                </div>
                                <!-- /.sp-content -->
                            </div>
                            <!-- /.stream-post -->
    `
};



