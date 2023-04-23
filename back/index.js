const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require('./queries')
const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
	extended: true
	})
);

app.get("/",(req,res) => {
	res.json({info: "Node.JS, Express, Postgres API"})
})


// category
// color
// price
// memory

// goods

// catalog
app.get("/catalog",db.getCatalog);

app.get("/goods",db.getGoods);

//good by id
app.get("/goods/:id",db.getGoodById);

// basket
app.get("/basket/:id",db.getBasketByClient);

app.get("/basket/detail/:basketid",db.getBasketDetail);

app.post("/basket/create",db.createBasket);

app.delete("/basket/delete",db.deleteBasket); // cancel order

app.put("/basket/update",db.updateBasket);

app.post("/basket/detail/add",db.basketAdd);

app.put("/basket/detail/update",db.basketUpdate);

app.delete("/basket/detail/delete",db.basketDelete);

app.listen(port, ()=> {
	console.log(`It works on port ${port}`);
})


