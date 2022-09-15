const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        name: 'vase table',
    })
    res.status(200).json({ products, nbHuts: products.length })
}
const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === true ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        // for mapping the user friendly operators to mongoose understood operators
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        //regex magic
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;  // you can find these on stack overflow
        // if regEx matches any user friendly operators get the mongoose operator from operatorMap
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        // Now we can do this only on certain properties (price, rating)
        const options = ['price', 'rating']
        // for multiple we will split first
        filters = filters.split(',').forEach((item) => {
            // splitting into array
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) } //{price : {$gt : 30}} -> example
            }
        })
    }
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ') //for name,-company etc
        result = result.sort(sortList)
    } else {
        result.sort('createdAt') //default sort
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList) //chaining select
    }
    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)
    /* explaining logic
    Imagine you have 23 items => 4 pages => distributed like 7 7 7 2
    By default we have 1 as page so skip will be 0 => skip 0 items and limit to  7
    In 2nd page => skip = (2-1)*7 = 7 => so skip 7 items and have limit of 7
    In 3rd page => skip = (3-1)*7 = 14 => so skip 14 items and have limit of 7
    And so on
    */
    const products = await result;
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }