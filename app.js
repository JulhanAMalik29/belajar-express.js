const express = require('express');
const jsxEngine = require('jsx-view-engine');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'jsx');

app.engine('jsx', jsxEngine());

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
  res.render('Contact', { title: 'Halaman Contact' });
});

// contoh link: http://localhost:3000/product/10?category=Shoes
app.get('/product/:id', (req, res) => {
  res.render('Product', {
    title: 'Halaman Product',
    id: req.params.id,
    category: req.query.category,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
