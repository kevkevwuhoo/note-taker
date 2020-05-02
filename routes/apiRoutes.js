const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const DbFunctions = require("../db/dbFunctions.js");

const dbFunctions = new DbFunctions();
// const { getNotes, addNote, deleteNote } = dbFunctions;

// GET
router.get("/notes", async (req, res) => {
	try {
		const notesJSON = await dbFunctions.getNotes();
		res.json(notesJSON);
	} catch (err) {
		throw err;
	}
});

// POST
router.post("/notes", (req, res) => {
	const newNote = req.body;
	dbFunctions.addNote(newNote);
	res.json(newNote);
});

// DELETE
router.delete("/notes/:id", (req, res) => {
	res.json(dbFunctions.deleteNote(req.params.id));
});

module.exports = router;
