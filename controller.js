const http = require('http'),
    fs = require('fs');
module.exports.getIndex = async function getIndex(req, res) {
    await fs.readFile('./index.html', function (err, html) {
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
    });
}

module.exports.getCallback = async function getCallback(req, res) {
    const data = 'code='+ req.query.code +'&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=407408718192.apps.googleusercontent.com&client_secret=************&scope=&grant_type=authorization_code';
    const options = {
        host: '/www.googleapis.com',
        path: '/oauth2/v4/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    const post_req = http.request(options, function (error, response) {
        if (error){
            console.log(error);
            return;
        }
        const {access_token} = response.body;
        const optionsGet = {
            host: '/www.googleapis.com',
            path: '/calendar/v3/users/me/calendarList',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token;
            }
        };
        const get_request = http.request(optionsGet, function(error, response) {
            if (error) {
                console.log(error);
                return;
            }
            res.json(response.body).end();
        });
        get_request.write();
    })
    post_req.write(data);
}