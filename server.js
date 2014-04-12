var server = (function () {
    //private
    var self = this;
    var http = require('http'),
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
                //the following code will create a simple webserver which renders websites
                var file = __dirname + request.url;
                if (request.url === "/") file = __dirname + "/index.html";
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
                            file = fs.readFileSync(file, 'utf8');
                        }
                        else {
                            file = fs.readFileSync(__dirname + "/404.html", 'utf8');
                        }

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