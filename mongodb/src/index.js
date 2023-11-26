import express from "express";
import mongoose from "mongoose";

const app = express();

const uri =
	"mongodb+srv://server-user:ny64PL2nMSFpqs7z@myapp.pifuust.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
	try {
		await mongoose.connect(uri);
		console.log("connected to mongo db");
	} catch (err) {
		console.log(err);
	}
}

connect();

app.listen(8000, () => {
	console.log("listen port 8000");
});
