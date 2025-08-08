const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const db = new sqlite3.Database('./work_reports.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shift TEXT,
        content TEXT,
        date TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pm_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        due_date TEXT,
        completed INTEGER DEFAULT 0
    )`);
});

app.post('/api/reports', (req, res) => {
    const { shift, content, date } = req.body;
    db.run(`INSERT INTO reports (shift, content, date) VALUES (?, ?, ?)`, [shift, content, date], function(err) {
        if (err) return res.status(500).send(err);
        res.json({ id: this.lastID });
    });
});

app.post('/api/pm', (req, res) => {
    const { title, description, due_date } = req.body;
    db.run(`INSERT INTO pm_tasks (title, description, due_date) VALUES (?, ?, ?)`, [title, description, due_date], function(err) {
        if (err) return res.status(500).send(err);
        res.json({ id: this.lastID });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
