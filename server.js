// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express app
const app = express();
const PORT = process.env.PORT || 8000;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

// GET
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "db", "db.json"));
});

// POST

// DELETE

// Start server to begin listening
app.listen(PORT, function () {
	console.log(`Listening on PORT ${PORT}`);
});
