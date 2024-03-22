const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
// const stripe = require('stripe')('your secret key');
const cors = require('cors');
const knex = require('knex');
const buyersignin = require('./buyer/signin');
const buyerregister = require('./buyer/register');


const YOUR_DOMAIN = 'http://localhost:3000';




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'himanshu',
    password : '',
    database : 'helper'
  }
});

db.on('error', (error) => {
  console.error('Database connection error:', error);
});
db.raw('SELECT 1').then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());


app.post('/api/submit-form', (req, res) => {
  const formData = req.body;
  const sql = 'INSERT INTO FormData SET ?';
  connection.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error inserting form data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Form data inserted successfully:', result);
    res.redirect('/success');
  });
});

// checkout api (FOR STRIPE PAYMENT)
// app.post("/api/create-checkout-session", async (req, res) => {
//   const { products } = req.body;
//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: product.dish,
//         images: [product.imgdata]
//       },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.qnty
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3001/success",
//     cancel_url: "http://localhost:3001/cancel",
//   });
//   res.json({ id: session.id })
// })







app.get('/products', (req, res) => {
  // Fetch product data from the database
  db.select('*').from('products')
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
});

app.post('/products', (req, res) => {
  const { name, seller, price, url, sellerid } = req.body;

  // Check if all required fields are provided
  if (!name || !price || !url || !seller || !sellerid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert the product data into the database
  db('products')
    .insert({
      nameofproduct: name,
      nameofseller: seller,
      url: url,
      prize: price,
      sellerid: sellerid,
    })
    .then(() => {
      res.status(201).json({ message: 'Product added successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to add product' });
    });
});











app.get('/cart/:userId', (req, res) => {
  const { userId } = req.params;
  db.select('cart.id', 'products.id', 'products.nameofproduct', 'products.nameofseller', 'products.url', 'products.prize', 'cart.quantity')
    .from('cart')
    .where('cart.userid', '=', userId)
    .innerJoin('products', 'cart.productid', '=', 'products.id')
    .then(cartItems => {
      res.json({ cartItems });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    });
});

// Add item to cart
app.post('/cart/add', (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db('cart')
    .insert({
      userid: userId,
      productid: productId,
      quantity: quantity,
    })
    .then(() => {
      res.status(201).json({ message: 'Cart item added successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to add cart item' });
    });
});

// Remove item from cart
app.delete('/cart/remove', (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db('cart')
    .where({
      userid: userId,
      productid: productId
    })
    .del()
    .then(() => {
      res.status(200).json({ message: 'Cart item removed successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove cart item' });
    });
});















app.get('/buyer', (req, res)=> { res.send(db.buyer) })

app.post('/buyer/signin', buyersignin.handleSignin(db, bcrypt));

app.post('/buyer/register', (req, res) => {buyerregister.handleRegister(req, res, db, bcrypt)})

app.get('/buyer/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('email', 'firstname', 'lastname', 'mobile').from('buyer').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('Error getting user profile'))
})

app.put('/buyer/profile/:id', (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  db('buyer')
    .where({ id })
    .update(updatedUserData)
    .then(() => {
      res.json({ message: "User data updated successfully" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Failed to update user data" });
    });
});

app.delete('/buyer/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db('buyer').where({ id }).del();
    await db('buyerlogin').where({ id }).del();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/seller', (req, res) => { res.send(db.seller) })

app.post('/seller/signin', (req, res) => {
  db.select('email', 'hash1', 'hash2').from('sellerlogin')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid1 = bcrypt.compareSync(req.body.password, data[0].hash1);
      const isValid2 = bcrypt.compareSync(req.body.business, data[0].hash2);
      if (isValid1 && isValid2) {
        db.select('*').from('seller')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/seller/register', (req, res) => {
  const { email, firstname, password, lastname, city, state, country, pincode, mobile, business } = req.body;
  const hash1 = bcrypt.hashSync(password);
  const hash2 = bcrypt.hashSync(business);
  db.transaction(trx => {
    trx.insert({
      email: email,
      hash1: hash1,
      hash2: hash2
    })
      .into('sellerlogin')
      .returning('email')
      .then(loginEmail => {
        return trx('seller')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            firstname: firstname,
            lastname: lastname,
            city: city,
            state: state,
            country: country,
            pincode: pincode,
            mobile: mobile, 
            business: business,
            counts: 0,
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json(err))
})

app.get('/seller/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('email', 'firstname', 'lastname', 'mobile', 'business', 'city', 'state', 'country', 'pincode').from('seller').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('Error getting user profile'))
})

app.put('/seller/profile/:id', (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  db('seller')
    .where({ id })
    .update(updatedUserData)
    .then(() => {
      res.json({ message: "User data updated successfully" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Failed to update user data" });
    });
});

app.delete('/seller/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db('seller').where({ id }).del();
    await db('sellerlogin').where({ id }).del();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})

