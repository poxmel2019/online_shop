const Pool = require('pg').Pool;
const helpers = require("./_helpers.js")
//const Pool = require('m').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    //database: "online_shop",
    database: "erp_online",
    password: "postgres1",
    port: 5432,
})


const getCatalog = (request, response) => {

  pool.query(`select * from dict_view`, (error, results) => {
    helpers.serverLog(results);
    if (error) {
      helpers.serverLog(error);
      throw error
    }
    response.status(200).json(results.rows);
  })

}

const getGoods = (request, response) => {

  pool.query(`select * from goods_view`, (error, results) => {
    helpers.serverLog(results);
    if (error) {
      helpers.serverLog(error);
      throw error
    }
    response.status(200).json(results.rows);
  })

}


const getGoodById = (request, response) => {

  const id = request.params.id; 
  
  pool.query(`select * from goods_view where id = ${id}`, (error, results) => {
    helpers.serverLog(results);
    if (error) {
      helpers.serverLog(error);
      throw error
    }
    response.status(200).json(results.rows);
  })

}

const getBasketByClient = (request, response) => {

  const id = request.params.id; 
  
  pool.query(`
  select b.id, b.num, b.dato, b.client_id, cl.name client_name
    from basket b
    inner join clients cl
    on cl.id = b.client_id
    where b.client_id = ${id}
  order by b.id;`, 
  (error, results) => {
    //helpers.serverLog(results);
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })

}

const getBasketDetail = (request, response) => {

  const basketid = request.params.basketid; 
  
  pool.query(`
  select bd.id, bd.basket_id, bd.dato,
bd.good_id, bd.units, 
d.name as product, d.release_year, co.name as color, me.capacity, pr.price
from basket_detail bd
inner join goods gd
on gd.id = bd.good_id
inner join dict d
on d.id = gd.product
inner join colors co
on co.id = gd.color_id
inner join memory me
on me.id = gd.capacity_id
inner join prices pr
on gd.price_id = pr.id
where bd.basket_id = ${basketid}
order by bd.id
 `, 
  (error, results) => {
    //helpers.serverLog(results);
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })

}

const createBasket = (request, response) => {
  const client = request.body.client_id;
  const num = request.body.num;
  
  const query = num ? `insert into basket (client_id,num) values (${client},${num})` :  `insert into basket (client_id) values (${client})`;

  pool.query(query,(error,results) => {
    helpers.serverLog(results);
    if (error) {
      helpers.serverLog(results);
      throw error;
    }
    response.status(200).json(results.rows);
  });


}

// cancel order
const deleteBasket = (request, response) => {
  const {id} = request.body;

  const query = `delete from basket where id = ${id}`;

  pool.query(query,(error,results) => {
    helpers.serverLog(results)
    if (error) {
      helpers.serverLog(error)
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const updateBasket = (request, response) => {
    const {num, id} = request.body;
  
    const query = `update basket set num = ${num} where id = ${id}`;
  
    pool.query(query,(error,results) => {
      if (error) {
        console.log(error)
        throw error;
      }
      response.status(200).json(results.rows);
    });
}

const basketAdd = (request, response) => {
  const {basket, good} = request.body;

  const units = request.body.units ? request.body.units : 1;
  
  const query = `insert into basket_detail 
                (basket_id, good_id, units)
                values
                (${basket},${good},${units})`
    ;

  pool.query(query,(error,results) => {
    helpers.serverLog(results)
    if (error) {
      helpers.serverLog(error)
      throw error;
    }
    response.status(200).json(results.rows);
  });


}

const basketDelete = (request, response) => {
  const {id} = request.body;

  const query = `delete from basket_detail where id = ${id}`;
  helpers.serverLog(results)
  pool.query(query,(error,results) => {
    if (error) {
      helpers.serverLog(error)
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const basketUpdate = (request, response) => {
  const {units, id} = request.body;

  const query = `update basket_detail set units = ${units} where id = ${id}`;

  pool.query(query,(error,results) => {
    helpers.serverLog(results)
    if (error) {
      helpers.serverLog(results)
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

module.exports = {
  getCatalog,
  getGoods,
  getGoodById,
  getBasketByClient,
  getBasketDetail,
  createBasket,
  deleteBasket,
  updateBasket,
  basketAdd,
  basketUpdate,
  basketDelete,
}


