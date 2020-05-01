const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const DbFunctions = require("../db/dbFunctions.js");

const dbFunctions = new DbFunctions();
const { readNotes, writeNotes, addNote } = dbFunctions;

// GET
router.get("/notes", async (req, res) => {
	try {
		const notesJSON = await readNotes();
		console.log(notesJSON);
		res.json(notesJSON);
	} catch (err) {
		throw err;
	}
});

// POST
router.post("/notes", async (req, res) => {
	const newNote = req.body;
	await addNote(newNote);
	res.json(newNote);
});

// DELETE
module.exports = router;
