var Todo = require('./models/todo');
var User = require('./models/user');

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
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            hospitlename: req.body.hospitlename
        }, function (err, create_user) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            User.find(function (err, create_user) {
                if (err)
                    res.send(err)
                res.json(create_user);
            });
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
            username : req.body.username
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

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};