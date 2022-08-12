const express = require('express')
const {Router} = express
const handlebars = require('express-handlebars')

const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./datos.txt")

const app = express()

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
    })
)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const arrayProductos = []


app.get('/', (req, res)=>{
    res.render('main')
})
app.post('/productos', async (req, res) => {
    const objProducto = req.body
    contenedor.save(objProducto)
    const lista = await contenedor.getAll()
    res.render('lista', {list: lista})
})
app.get('/productos', async (req, res) => {
    const lista = await contenedor.getAll()
    res.render('lista', {list: lista})
})
app.listen(8080, err => {
    if(err) throw err
    console.log('en linea puerto 8080')
})