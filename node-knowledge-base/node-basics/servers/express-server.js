import express from "express";

const port = 8000;

const app = express();

app.get("/hello", (req, res) => {
	res.send("Hello");
});

app.get("/", (req, res) => {
	res.send("main rout");
});

app.listen(port, () => {
	console.log(`server is run on http://localhost:${port}`);
});
