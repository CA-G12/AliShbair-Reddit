insert into users (username, email, password, img) values 
('ali4', 'ali4@gmail.com', '$2y$10$oIeRqKjnl6.GMRrHI5.bv.yV1Nj/d8RTe1NV9BUcGQ42lvuEdpyFW', 'https://bit.ly/3TLJynb'),
('ali5', 'ali5@gmail.com', '$2y$10$8xkl2uHRVckGFts00HoXk.xQl.XsU8.FjERFbFYhd3vNjoCquZLpa', 'https://bit.ly/3TLJynb'),
('ali6', 'ali6@gmail.com', '$2y$10$JwZWc7TYYVlmpk51Qf30wuWR42/uO666m5b0QEj/KdKZ6bEibOfDq', 'https://bit.ly/3TLJynb');

insert into posts (post, votes_count, user_id) values 
('ali4 First post ever on Reddit', 9, 1),
('ali5 Fisrt Post', 22, 2),
('ali5 Second Post', 30, 2),
('ali6 First Post', 4, 3);

insert into comments (comment, user_id, post_id) values 
('ali4 comment', 1, 1),
('ali5 comment', 2, 2),
('ali5 comment2', 2, 2),
('ali6 comment', 3, 3),
('ali6 comment', 3, 2),
('ali6 comment', 3, 4);

insert into votes (status, user_id, post_id) values 
('like', 1, 1),
('dislike', 1, 2),
('like', 3, 2),
('like', 2, 3);