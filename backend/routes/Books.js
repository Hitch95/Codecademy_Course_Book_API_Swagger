const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - start
 *         - end
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         start:
 *           type: string
 *           format: date-time
 *           description: The start date of the book schedule
 *         end:
 *           type: string
 *           format: date-time
 *           description: The end date of the book schedule
 *       example:
 *         id: d5fE_asz
 *         title: JavaScript For Dummies
 *         start: 2021-11-01T00:00:00.000Z
 *         end: 2021-11-05T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * A list of all books and their schedules that exist.
 * In a "real" application, this data would be maintained in a database.
 */
let ALL_BOOKS = [
  {
    id: uuidv4(),
    title: 'JavaScript For Dummies',
    start: new Date(2021, 10, 1).toISOString(),
    end: new Date(2021, 10, 5).toISOString(),
  }
];

router.get("/", (req, res) => {
  res.json(ALL_BOOKS);
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the book to get
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = ALL_BOOKS.find((book) => book.id === id);
  if (!book) {
    res.sendStatus(404);
    return;
  }
  res.json(book);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post("/", (req, res) => {
  const { title, start, end } = req.body;
  const newBook = { id: uuidv4(), title, start: new Date(start).toISOString(), end: new Date(end).toISOString() };
  ALL_BOOKS.push(newBook);
  res.json(newBook);
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Deletes a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the book to delete
 *     responses:
 *       200:
 *         description: The book was deleted successfully
 *       404:
 *         description: The book was not found
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const previousLength = ALL_BOOKS.length;
  ALL_BOOKS = ALL_BOOKS.filter(book => book.id !== id);
  if (ALL_BOOKS.length === previousLength) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
});

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Updates a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title of the book
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: New start time of the book schedule
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: New end time of the book schedule
 *     responses:
 *       200:
 *         description: The book was updated successfully
 *       404:
 *         description: The book was not found
 */
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { newTitle, newStart, newEnd } = req.body;
  const book = ALL_BOOKS.find(book => book.id === id);
  if (!book) {
    res.sendStatus(404);
    return;
  }
  book.title = newTitle;
  book.start = newStart;
  book.end = newEnd;
  res.sendStatus(200);
});

module.exports = router;