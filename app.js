const express = require('express');
const jsxEngine = require('jsx-view-engine');
const { loadContacts, findContact } = require('./utils/contacts');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'jsx');

// Third-Party Middleware
app.engine('jsx', jsxEngine());

// Build-in Middleware
app.use(express.static('public'));

// Application-level Middleware
// app.use((req, res, next) => {
//   console.log('Time:', Date.now());
//   next();
// });

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Julhan Abdul Malik',
      email: 'julhan@gmail.com',
    },
    {
      nama: 'Abdul',
      email: 'abdul@gmail.com',
    },
    {
      nama: 'malik',
      email: 'malik@gmail.com',
    },
  ];

  res.render('Home', {
    name: 'Julhan Abdul Malik',
    title: 'Halaman Home',
    mahasiswa,
  });
});

app.get('/about', (req, res) => {
  res.render('About', { title: 'Halaman About' });
});

app.get('/contact', (req, res) => {
  const contacts = loadContacts();
  res.render('Contact', { title: 'Halaman Contact', contacts });
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('DetailContact', { title: 'Halaman Detail Contact', contact });
});

app.use((req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
