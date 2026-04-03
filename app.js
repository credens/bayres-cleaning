const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/enviar', async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info.bayrescleaning@gmail.com',
            pass: 'TU_CONTRASEÑA_DE_APLICACION' 
        }
    });

    const mailOptions = {
        from: email,
        to: 'info.bayrescleaning@gmail.com',
        subject: `Consulta Web Bayres: ${nombre}`,
        text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('<script>alert("Consulta enviada con éxito"); window.location.href="/";</script>');
    } catch (error) {
        console.error(error);
        res.send('<script>alert("Error al enviar el mensaje."); window.history.back();</script>');
    }
});

// Configurado en el puerto 4000 para no chocar con Nova Panes
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Bayres Cleaning corriendo en puerto ${PORT}`));