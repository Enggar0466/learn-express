const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const nims = [
    {id : 1192, name: 'Enggar'},
    {id : 1193, name: 'Gilang'},
];

app.get('/', (req, res) => {
res.send ('Learn ExpressJS Part 2 with Gilang Sukmadik as A Lecturer');
});

app.get('/api/nims', (req, res) => {
    res.send (nims);
});
 
app.post('/api/nims', (req,res) =>{
    const { error } = validatenim(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const nim = {
        id: nims[nims.length-1].id + 1,
        name: req.body.name
    };
    nims.push(nim);
    res.send(nim);
});

app.put('/api/nims/:id', (req,res) => {
    const nim = nims.find(c => c.id === parseInt( req.params.id));
    if (!nim) res.status(404).send('the nim with the given id not found!')
    
    const { error } = validatenim(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
        nim.name = req.body.name;
        res.send(nim);
});

app.delete('/api/nims/:id', (req, res) =>{
    const nim = nims.find(c => c.id === parseInt( req.params.id));
    if (!nim) res.status(404).send('the nim with the given id not found!')

    const index = nims.indexOf(nim);
    nims.splice(index, 1);

    res.send(nims);
});

     
function validatenim(nim){
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(nim, schema);
    return result;  
}

app.get('/api/nims/:id', (req, res) => {
    const nim = nims.find(c => c.id === parseInt( req.params.id));
    if (!nim) res.status(404).send('the nim with the given id not found!')
    res.send(nim);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));