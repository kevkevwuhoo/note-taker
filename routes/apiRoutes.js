const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const DbFunctions = require("../db/dbFunctions.js");

const dbFunctions = new DbFunctions();

// GET
router.get("/notes", async (req, res) => {
	try {
		// get the notes, then return them to the user client
		const notesJSON = await dbFunctions.getNotes();
		res.json(notesJSON);
	} catch (err) {
		throw err;
	}
});

// POST
router.post("/notes", (req, res) => {
	// get the body of the user post request
	const newNote = req.body;
	// add it to the notes in db.json
	dbFunctions.addNote(newNote);
	// return the new note that the user added
	res.json(newNote);
});

// DELETE
router.delete("/notes/:id", (req, res) => {
	// delete the note with the same id
	res.json(dbFunctions.deleteNote(req.params.id));
});

module.exports = router;
