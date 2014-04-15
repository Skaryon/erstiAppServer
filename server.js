var server = (function () {
    //private
    var self = this;
    var http = require('http'),
        url = require('url'),
        cheerio = require('cheerio'),
        fs = require('fs'),
        $ = null;
    var ip = "localhost";
    var port = 7986;
    //public
    return {
        //starts the server
        start: function () {
            //load file and initiate DOM
            //create server
            console.log("starting server... /");
            http.createServer(function (request, response) {
                //get url get vars
                var url_parts = url.parse(request.url, true);
                var query = url_parts.query;
                if (Object.keys(query).length > 0)
                    console.log("the following url parameters were send: /")
                for (varName in query) {
                    console.log(varName + "=" + query[varName] + "/");
                }
                //the following code will create a simple webserver which renders websites
                var file = __dirname + url_parts.pathname;
                if (url_parts.pathname === "/") file = __dirname + "/index.html";
                console.log("incoming request for:  " + file + "/");
                console.log("checking if '" + file + "' exists... /")
                fs.exists(file, function (exists) {
                    //handle favicon requests from chrome
                    if (request.url === "/favicon.ico") {
                        if (exists) {
                            file = fs.readFileSync(file);
                        }
                        response.writeHeader(200, {
                            "Content-Type": "image/x-icon"
                        });
                    } else {
                        if (exists) {
                            console.log("file exists, loading it... /");
                            file = fs.readFileSync(file, 'utf8');
                        }
                        else {
                            console.log("file does not exist, loading 404... /");
                            file = fs.readFileSync(__dirname + "/404.html", 'utf8');
                        }
                        console.log("outputting file /");
                        //output html
                        response.writeHeader(200, {
                            "Content-Type": "text/html"
                        });
                    }
                    response.write(file);
                    response.end();
                });
            }).listen(port, ip);
            console.log("Server running at " + ip + ":" + port + "/");
        }
    }
})();

server.start();