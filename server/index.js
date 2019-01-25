import express from "express"

const app = express();

app.use('/api/v1', require('./routes/api'));

app.listen(process.env.port || 3000, function() {
	console.log("Listening on port 3000...")
});

export default app;
