const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('hola con nodejs');
})

let items= ['manzana','papaya','limon']

//endpoint 1 : GET /items -> lista todas las frutas
app.get('/items', (req, res) => {
  res.status(200).json(items);
})

//endpoint 2 : POST /items-> agrega una fruta
app.post('/items', (req, res) => {
  const fruta = req.body;
  
  if(fruta){
     console.log(fruta);
     items.push(fruta.item);
     console.log(items);
     res.status(200).send(`Se agrego la fruta: ${fruta.item} \n Lista: ${JSON.stringify(items)}`);
  }
  else {
     res.status(400).send("este items es invalido");
  }
})


//endpoint 3 : PUT /items/:id -> actualiza la fruta
app.put('/items/:index', (req, res) =>{
  console.log(req.params['index']);
  let posicion = req.params['index'];

  const fruta = req.body;
  
  if((items.length-1)>=posicion)
  {
    items.splice(posicion, 1,fruta.item)
    res.status(200).send(`Se quito de la posicion: ${posicion} \n nueva lista: ${JSON.stringify(items)}`);
    console.log(items);
  }
  else
  {
    res.status(200).send(`No se pudo modificar no existe nada en esa posicion de la lista`);
  }
});


//endpoint 4 : DELETE /items/:id -> eliminar la fruta
app.delete('/items/:index', (req, res) =>{
    console.log(req.params['index']);
   
    let posicion = req.params['index'];
    if((items.length-1)>=posicion)
    {
    items.splice(posicion, 1)
    res.status(200).send(`Se quito de la posicion: ${posicion} \n nueva lista: ${JSON.stringify(items)}`);
    console.log(items);
    }
    else
    {
      res.status(200).send(`No se pudo eliminar no existe nada en esa posicion de la lista`);
    }

});


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento ${PORT}`)
})