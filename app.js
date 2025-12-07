const express = require('express');
const jsxEngine = require('jsx-view-engine');
const { validationResult, body, check } = require('express-validator');
const methodOverride = require('method-override');

// Database MongoDB Connection
require('./utils/mongo-db-contact');
const Contact = require('./model/contact');

// Flash Message
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// Method Override Middleware
app.use(methodOverride('_method'));

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

// CONTACT ROUTES
app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();
  res.render('Contact', { title: 'Halaman Contact', contacts });
});

app.get('/contact/add', (req, res) => {
  res.render('AddContact', { title: 'Halaman Tambah Contact' });
});

// Fungsi untuk Menangani POST request pada /contact
app.post(
  '/contact',
  [
    body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });

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
      // Tambahkan contact
      Contact.insertMany(req.body).then(() => {
        // Flash Message
        req.flash('success', 'Contact berhasil ditambahkan!');
        res.redirect('/contact');
      });
    }
  }
);

app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then(() => {
    // Flash Message
    req.flash('success', 'Contact berhasil dihapus!');
    res.redirect('/contact');
  });
});

app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  if (!contact) {
    res.status(404);
    res.send('404 Not Found');
  } else {
    res.render('EditContact', { title: 'Halaman Edit Contact', contact });
  }
});

app.put(
  '/contact',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });

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
      // Update contact
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email,
          },
        }
      ).then(() => {
        // Flash Message
        req.flash('success', 'Contact berhasil diperbarui!');
        res.redirect('/contact');
      });
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
