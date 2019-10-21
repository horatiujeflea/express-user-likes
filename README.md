# Express.js Backend App - User Likes

### Application description:
Build an application with the following REST endpoints

`/signup` - Sign up to the system (username, password)

`/login` - Logs in an existing user with a password

`/me` - Get the currently logged in user information

`/me/update-password` - Update the current users password

`/user/:id/` - List username & number of likes of a user

`/user/:id/like` - Like a user

`/user/:id/unlike` - Un-Like a user

`/most-liked` - List users in a most liked to least liked

Each user can like another only once, and they can unlike eachother.

The bolded endpoints are authenticated calls.



### Other instructions:
Use:
 - Node.js
 - PostgreSQL
 - Express.js

### Required functionality 
 - JWT token authentication 
 - JSON server responses
 - Tests