const express = require('express')
const app = express()
const { products } = require('./data')


app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

//Now, lets create the /api/products API
app.get('/api/products', (req, res) => {
    //here, I will filter the data(remove description) and then send it
    const newProducts = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })
    res.json(newProducts)
})

//route params
app.get('/api/products/:productID', (req, res) => {
    const id = req.params.productID; //Note: req.params.productID will always send string
    const singleProduct = products.find((product) => product.id === Number(id))
    //Here we converted to Number because id is a string by default
    if (!singleProduct) {
        return res.status(404).send('Product does not exist!')
    }
    res.json(singleProduct)
})

//A complex API
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query; //I am looking for search and limit
    let sortedProducts = [...products]; //using spread operator
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        // res.status(200).send("No products matched your search!") //this can be done
        res.status(200).json({ success: true, data: [] }) //much better thing to do in this case
    }
    res.status(200).json(sortedProducts)
})

app.listen('5001', () => {
    console.log("Listening to port 5001...");
})