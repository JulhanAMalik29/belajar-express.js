const express = require('express');
const jsxEngine = require('jsx-view-engine');
const {
  loadContacts,
  findContact,
  AddContact,
  cekDuplikatNama,
  deleteContact,
  editContact,
} = require('./utils/contacts');
const { validationResult, body, check } = require('express-validator');

// Database MongoDB Connection
require('./utils/mongo-db-contact');
const Contact = require('./model/contact');

// Flash Message
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'jsx');

// Third-Party Middleware
app.engine('jsx', jsxEngine());

// Build-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Application-level Middleware
// app.use((req, res, next) => {
//   console.log('Time:', Date.now());
//   next();
// });

// Flash Message Middleware
// Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Flash Middleware
app.use(flash());

// Middleware untuk Flash Message bisa diakses dari semua view
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');

  next();
});

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

app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();
  res.render('Contact', { title: 'Halaman Contact', contacts });
});

// Fungsi untuk Menangani POST request pada /contact
app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikatNama(value);

      if (duplikat) {
        throw new Error('Nama contact sudah digunakan!');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('AddContact', {
        title: 'Halaman Tambah Contact',
        errors: errors.array(),
      });
    } else {
      AddContact(req.body);

      // Flash Message
      req.flash('success', 'Contact berhasil ditambahkan!');
      res.redirect('/contact');
    }
  }
);

app.get('/contact/add', (req, res) => {
  res.render('AddContact', { title: 'Halaman Tambah Contact' });
});

app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  if (!contact) {
    res.status(404);
    res.send('404 Not Found');
  } else {
    deleteContact(req.params.nama);

    // Flash Message
    req.flash('success', 'Contact berhasil dihapus!');
    res.redirect('/contact');
  }
});

app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  if (!contact) {
    res.status(404);
    res.send('404 Not Found');
  } else {
    res.render('EditContact', { title: 'Halaman Edit Contact', contact });
  }
});

app.post(
  '/contact/update',
  [
    body('nama').custom((value, { req }) => {
      const duplikat = cekDuplikatNama(value);

      if (value !== req.body.oldNama && duplikat) {
        throw new Error('Nama contact sudah digunakan!');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('EditContact', {
        title: 'Halaman Update Contact',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      editContact(req.body);

      // Flash Message
      req.flash('success', 'Contact berhasil diperbarui!');
      res.redirect('/contact');
    }
  }
);

app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render('DetailContact', { title: 'Halaman Detail Contact', contact });
});

app.use((req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
