const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');


const app = express();
app.use(bodyParser.json());

const eventos = []


app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento)

    try{
        //envia o evento para o microsserviço de lembretes
        axios.post('http://10.33.109.9:4000/eventos', evento).catch(error => console.log("Error "+ error));
        //envia o evento para o microsserviço de obervações
        axios.post('http://10.33.109.9:5000/eventos', evento).catch(error => console.log("Error "+ error));
        //envia o evento para o microsserviço de consulta
        axios.post("http://10.33.109.9:6000/eventos", evento).catch(error => console.log("Error "+ error));
        //envia o evento para o microsservico de classificacao
        axios.post("http://10.33.109.9:7000/eventos", evento).catch(error => console.log("Error "+ error));
    }
    catch(err){};
        res.status(200).send({ msg: "ok"});
        
});

app.get('/eventos', (req, res) => {
    res.send(eventos)
    })

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000');
});