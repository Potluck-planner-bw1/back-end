# back-end

GET ALL USERS

https://potluck-bw-backend.herokuapp.com/

get request to:
/api/users

REGISTER A NEW USER

post request to:
/api/auth/register
needs:
{user_id, username, password}

LOGIN

post request to:
/api/auth/login
needs:
{username, password}

post request to:
/api/events
needs: {
title, (string)
date, (integer)
time, (integer)
location (string)
}
