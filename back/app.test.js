const request = require("supertest");
 
var app = require("./app").app;
var catalogResult = require("./data").catalog; 
var goodsResult = require("./data").goods; 
var goodOneResult = require("./data").goodOne; 
var basketOneResult = require("./data").basketOne; 

// describe("Express Tests", function(){
//1 /
it("1. should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .get("/")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});

// 2 /catalog
it("2. should return dictionary of models", function(done){
     
    request(app)

        .get("/catalog")
        .expect(200)
        .expect(catalogResult)
        .end(done);
});

// 3 /goods
it("3. should return list of products", function(done){
     
    request(app)

        .get("/goods")
        .expect(200)
        .expect(goodsResult)
        .end(done);
});


// 4 /getGoodById
it("4. should return product by id", function(done){
     
    request(app)

        .get("/goods/1")
        .expect(200)
        .expect(goodOneResult)
        .end(done);
});




// 5 // app.get("/basket/:id",db.getBasketByClient);
it("5. should return basket by user id", function(done){
     
    request(app)

        .get("/basket/1")
        .expect(200)
        .expect(basketOneResult)
        .end(done);
});


/*
// 6 // app.post("/basket/create",db.createBasket);
it("should return created order", function(done){
     
    request(app)

        .post("/basket/create")
        .expect(function(response){
            assert.deepEqual(request.body, {client_id:1});
        })
        .expect(200)
        .expect([])
        .end(done);
});


// 7 // app.get("/basket/detail/:basketid",db.getBasketDetail);
it("should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .get("/basket/detail/1")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});



// 8 // app.delete("/basket/delete",db.deleteBasket); // cancel order
it("should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .delete("/basket/delete")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});

// 9 // app.put("/basket/update",db.updateBasket);
it("should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .put("/basket/update")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});

// 10 // app.post("/basket/detail/add",db.basketAdd);
it("should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .post("/basket/detail/add")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});

// 11 // app.put("/basket/detail/update",db.basketUpdate);
it("should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .put("/basket/detail/update")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});

// 12 // app.delete("/basket/detail/delete",db.basketDelete);
it("should return \"Node.JS, Express, Postgres API\"", function(done){
     
    request(app)

        .delete("/basket/detail/delete")
        .expect(200)
        .expect({info: "Node.JS, Express, Postgres API"})
        .end(done);
});
*/
// }