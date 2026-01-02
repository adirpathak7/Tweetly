 hey bro I'm developing a node project which's simple explanation is creating a simple x clone like user can post their post's and add edit delete post's and other's can comment on that post, there will be 2 role admin and user using migration there will be one admin and admin can make other user admin for this application I have created a simple db design please check it is it correct or not
I have to use mysql, node.js, express.js there is no frontend you have to check my db design if there is anything wrong so you have to suggest me

tables

roles:- roleId, role, createdAt (current time stamp)

users:- userId, username, email, gender, age, password, roleId, isDeleted, deletedBy, deletedAt, createdAt, updatedAt

posts:- postId, postDetails, type (text/file), fileURL, usersId, isDeleted, deletedBy, deletedAt, createdAt, updatedAt

comments:- commentId, comment, postId, userId, isDeleted, deletedBy, deletedAt, createdAt, updatedAt