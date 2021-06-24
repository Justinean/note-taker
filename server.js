const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
let index = 1;
let init = [{"title":"Test Title","text":"Test text"}];
fs.writeFileSync('./db/db.json', JSON.stringify(init));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/notes', function(req, res) {
    fs.readFile(`./public/notes.html`, (err, data) => {
        if (err) throw err;
        res.writeHead("202", {'Content-Type': "text/html"});
        res.end(data);
    });
});

app.get('/api/notes', (req, res) => {
    let rawdata = fs.readFileSync('./db/db.json');

    res.end(rawdata);
})

app.get('/assets/css/styles.css', function(req, res) {
    fs.readFile(`./public/assets/css/styles.css`, (err, data) => {
        if (err) throw err;
        res.writeHead("202", {'Content-Type': "text/html"});
        res.end(data);
    });
});

app.get('/assets/js/index.js', function(req, res) {
    fs.readFile(`./public/assets/js/index.js`, (err, data) => {
        if (err) throw err;
        res.writeHead("202", {'Content-Type': "text/html"});
        res.end(data);
    });
});

app.get('/*', function(req, res) {
    fs.readFile(`./public/index.html`, (err, data) => {
        if (err) throw err;
        res.writeHead("202", {'Content-Type': "text/html"});
        res.end(data);
    });
});

app.post('/api/notes', function(req, res) {
    const note = req.body;

    let data = fs.readFileSync('./db/db.json', (err, data) => {
        if (err) throw err;
        res.writeHead("202", {'Content-Type': "text/html"});
        return data;
    });
    data = JSON.parse(data);
    data.push(note)
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    return res.json(data)
});

app.delete('/api/notes/*', function(req, res) {
    const noteId = Number(req.url.slice(11)) - 1;

    let data = fs.readFileSync('./db/db.json', (err, data) => {
        if (err) throw err;
        res.writeHead("202", {'Content-Type': "text/html"});
        return data;
    });
    data = JSON.parse(data);
    data.splice(noteId, 1)
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    return res.json(data)
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));