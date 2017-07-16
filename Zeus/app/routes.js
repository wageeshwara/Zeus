var Todo = require('./models/todo');
var User = require('./models/user');
var Product = require('./models/product');
var Order = require('./models/oder');
var OrderProduct = require('./models/oderProduct')

module.exports = function (app,jwt) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function (err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            password: req.body.password,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    //create user api
    app.post('/api/create_user', function (req, res) {

        User.create({
            firstname: req.body.firstname,
            secondname: req.body.secondname,
            email: req.body.email,
            password: req.body.password,
            newsletter: req.body.newsletter,
            termsCondition: req.body.termsCondition,
            hospitlename: req.body.hospitlename
        }, function (err, create_user) {
            if (err)
                res.json({
                    success: false,
                    message: err
                });
            else {
                res.json({
                    success: true,
                    message: "Success"
                })
            }
        });
    });

    //Add product api
    app.post('/api/addProduct', function (req, res) {

        Product.create({
            id: req.body.productId,
            name: req.body.name,
            price: req.body.price,
            image: '',
            quantity: req.body.quantity,
            
        }, function (err, addProduct) {
            if (err)
                res.json({
                    success: false,
                    message: err,
                    addProduct
                });
            else {
                res.json({
                    success: true,
                    message: "Success"
                })
            }
        });
    });

    app.get('/api/addProduct', function (req, res) {

        // use mongoose to get all addProdcut in the database
        Product.find(function (err, addProduct) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(addProduct); // return all addProduct in JSON format
        });
    });

    app.get('/api/oder', function (req, res) {

        // use mongoose to get all orders in the database
        Order.find(function (err, orders) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(orders); // return all orders in JSON format
        });
    });

    app.get('/api/create_user', function (req, res) {

        // use mongoose to get all todos in the database
        User.find(function (err, create_user) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(create_user); // return all todos in JSON format
        });
    });

    app.get('/api/orderproduct', function (req, res) {

        // use mongoose to get all todos in the database
        OrderProduct.find(function (err, create_user) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(create_user); // return all todos in JSON format
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    app.post('/api/authenticate', function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found' });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Inccorect password' });
                } else {
                    var token = jwt.sign(user, app.get('supersecret'), {
                        expiresIn : 1440
                    });

                    res.json({
                        success: true,
                        message: 'Success',
                        token: token
                    });
                }
            }
            });
    });

    app.post('/api/order', function (req, res) {
        var dat = req.body;
        console.log(dat);
        var oderId;
        var now = Date.now()
        var user = dat[0];

        console.log(user._doc.email);
        Order.create({
            date: now,
            userid: 1,
            username: user._doc.email
        }, function (err, oder) {
            if (!err) {
                oderId = oder._id;
                console.log(oder._id);
                console.log(oderId);
            }
        });
        var data = dat[1];
        console.log(oderId);
        for (i = 0; i < data.length; ++i) {
            console.log("SECOND");
        console.log(oderId);
            OrderProduct.create({
                oderId: oderId,
                productId: data[i].id,
                productName: data[i].name,
                Quantity: data[i].count
            }, function (err, oder) {
                if (err) {
                    res.json({
                        success: false,
                        message: err,
                        addProduct
                    });
                }
            });
        }
        res.json({
            success:true,
            message: 'success',
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};