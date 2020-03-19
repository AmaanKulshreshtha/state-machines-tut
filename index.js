const http = require('http');
const fs = require('fs-extra');
const path = require('path');

const serverConfig = async (req, res) => {
	if (req.url === '/state-machine.js') {
		res.writeHead(200, {
			'Content-Type': 'text/javascript'
		});
		await fs.createReadStream(path.resolve('state-machine.js')).pipe(res);
	} else {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		await fs.createReadStream(path.resolve('index.html')).pipe(res);
	}
};

const server = http.createServer(serverConfig);

server.listen(5000);
