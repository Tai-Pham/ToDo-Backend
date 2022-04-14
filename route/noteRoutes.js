const noteController = require('../controller/noteController')
const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();

router.route("/api/notes").post(userController.validateJWT, noteController.addNote) // x
router.route("/api/notes").get(userController.validateJWT, noteController.getAllNotes) // x

router.route("/api/notes/note/:id").get(userController.validateJWT, noteController.findNote) // x
router.route("/api/notes/note/:id").patch(userController.validateJWT, noteController.patchNote) // x
router.route("/api/notes/note/:id").delete(userController.validateJWT, noteController.deleteNote) // x

router.route("/api/notes/recent").get(userController.validateJWT, noteController.recentNotes) // x

router.route("/api/notes/important").get(userController.validateJWT, noteController.getImportantNotes) // x

router.route("/api/notes/date").post(userController.validateJWT, noteController.getNotesByDate) // x

module.exports = router