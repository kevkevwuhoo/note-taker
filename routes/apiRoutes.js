const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const DbFunctions = require("../db/dbFunctions.js");

const dbFunctions = new DbFunctions();
const { readNotes, writeNotes, getNotes, addNote } = dbFunctions;

// GET
router.get("/notes", (req, res) => {
	getNotes();
});

// POST
router.post("/notes", (req, res) => {
	const newNote = req.body;
	console.log(newNote);
	addNote(newNote);
});

// DELETE

module.exports = router;
