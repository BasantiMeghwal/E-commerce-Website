const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 8000;


app.use(express.static('template'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/test');
console.log('Connected');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'index.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'products.html'));
});

app.get('/categories', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'categories.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'contact.html'));
});
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'success_page.html'));
});


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

const Contact = mongoose.model('Contact', contactSchema)


app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body
    const newMessage = new Contact ({
        name: name,
        email: email,
        message: message
    })
    await newMessage.save()
    res.redirect('/success');


});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});