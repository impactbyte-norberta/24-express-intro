const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;

app.use(express.json()); // cara menggunakan body-parser di dalam express
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Selamat datang di server pertamaku');
});

app.get('/route-1', (req, res) => {
    res.send('Selamat datang di route 1');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    res.send(`${name}, registrasi Anda berhasil!`);
});

// Routing dengan parameter
// Chanining
app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    res.send(`produk nomor ${id}`);
}).delete('/products/:id', (req, res) => {
    const { id } = req.params;

    // jalankan kode menghapus produk
    res.send(`produk ${id} terhapus`);
});

app.get('/cookie', (req, res) => {
    res.send(req.signedCookies);
});

// redirect
app.get('/redirect', (req, res) => {
    res.redirect('/products/1');
});

// Routing jika salah endpoint
app.get('*', (req, res) => {
    let body = `
      <h1>Tidak ketemu</h1>
    `;

    res.send(body);

    res.redirect('/redirect');
});

// handle beberapa proses untuk satu request

app.post(
    '/register',
    (req, res) => {
        // kode olahan 1, contoh untuk validasi

        const { name, email, password } = req.body;

        next();
    },
    () => {
        // olahan berikutnya, contoh untuk simpan ke database
    }
);

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
