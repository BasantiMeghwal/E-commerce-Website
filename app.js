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
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname, 'template' , 'signup.html'))
})
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'success_page.html'));
});
app.get('/signup_success', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'signup_success.html'));
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

const signupSchema = new mongoose.Schema({
  name: String,
  email:String,
  password:String
});
const signup = mongoose.model('Signup', signupSchema);

app.post('/signup', async (req, res) => {
    
    const { name, email, password,confirmPassword } = req.body

    if(password !== confirmPassword){
        
        return res.send("Password and Confirm Password do not match");
    }
    const newUser = new signup   ({
        name: name,
        email: email,
        password: password
    })
    await newUser.save()
    res.redirect('/signup_success');


});

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    const user = await signup.findOne({
        email:email,
        password:password
    })
    if(user){
        res.redirect('/')
    }
    else{
        res.send("Invalid Email or Password");
    }
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});