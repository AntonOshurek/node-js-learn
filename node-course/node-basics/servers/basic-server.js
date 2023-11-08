import http from "http";

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	console.log(`request - ${req.method} - ${req.url}`);
	res.end("Hello");
});

server.listen(port, host, () => {
	console.log(`server is run on ${host}:${port}`);
});
