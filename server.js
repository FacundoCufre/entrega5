const express = require('express')
const {Router} = express

const app = express()

const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./datos.txt")

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const arrayProductos = []

const routerProductos = Router()

routerProductos.get('/', (req, res) => {
    const respuesta = contenedor.getAll()
    res.json(respuesta)
})
routerProductos.get('/:id', (req, res) => {
    const {id} = req.params
    const respuesta = contenedor.getById(parseInt(id))
    res.json(respuesta)
})

routerProductos.put('/:id', (req, res) => {
    const objProducto = req.body
    const {id} = req.params
    const respuesta = contenedor.updateById( {id: parseInt(id), ...objProducto} )
    res.json(respuesta)
})
routerProductos.delete('/:id', (req, res) => {
    const {id} = req.params
    const respuesta = contenedor.deleteById(parseInt(id))
    res.json(respuesta)
})
routerProductos.post('/', (req, res) => {
    const objProducto = req.body
    const respuesta = contenedor.save(objProducto)
    res.json({respuesta})
})

app.use('/api/productos', routerProductos)

app.listen(8080, err => {
    if(err) throw err
    console.log('en linea puerto 8080')
})