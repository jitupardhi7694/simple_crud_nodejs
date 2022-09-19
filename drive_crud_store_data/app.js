const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const conn = require('./server');

const bodyParser = require('body-parser');
const e = require('express');

const port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

app.get('/', async (req, res) => {
    await res.render('index');
});

app.get('/data_all', async (req, res, err) => {
    const sql_data = 'SELECT * FROM student';

    conn.query(sql_data, (err, data) => {
        if (err) throw err;
        else {
            res.send(data);
            console.log(data);
        }
    });
});

app.get('/data_insert', async (req, res, err) => {
    const sql =
        'INSERT INTO student(user_name, email , mobile_no, address) VALUES("JITENDRA","jaypardhi7694@gmail.com","8483931721","NAGPUR MAHARASHTRA")';
    try {
        conn.query(sql, (error, results, fields) => {
            if (error) {
                // return console.log(error.message);
                throw error;
            } else {
                console.log(results);
            }
        });
        res.send(sql);
        console.log(sql);
    } catch (error) {
        console.log(error);
    }
});

app.get('/data_update', async (req, res, err) => {
    const sql = `UPDATE student SET user_name="jitu", email = "kunal@gmail.com",
     mobile_no = "1234567890", address = "gondia" WHERE id = 3`;

    try {
        await conn.query(sql, (error, results, fields) => {
            if (error) {
                return console.log(error.message);
            } else {
                console.log(results);
            }
        });
        res.send(sql);
        console.log(sql);
    } catch (error) {
        console.log(error);
    }
});

app.get('/data_add', (req, res) => {
    res.render('form');
});

app.post('/form_add', jsonParser, async (req, res) => {
    const user_name = req.body.user_name;
    const email = req.body.email;
    const mobile_no = req.body.mobile_no;
    const address = req.body.address;

    const sql = (await conn).query(
        `INSERT INTO student (user_name, email, mobile_no, address) VALUES ('${user_name}', '${email}', '${mobile_no}', '${address}')`,

        (err, results, fields) => {
            if (err) throw err;
            else {
                res.render('form_add');

                console.log('Data inserted now : ' + results.affectedRows);
            }
        }
    );
});

app.get('/read_data', (req, res) => {
    const sql = 'select * from student';
    const query = conn.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            res.render('form_table', {
                title: 'Crud table students from mysql database',
                student: rows,
            });
        }
    });
});

app.get('/edit-form/:id', function (req, res, next) {
    var id = req.params.id;
    var sql = `SELECT * FROM student WHERE id=${id}`;
    conn.query(sql, function (err, rows, fields) {
        res.render('edit', {
            title: 'Edit Product',
            student: rows[0],
            // message: true,
        });
    });
});

app.post('/update/:id', function (req, res, next) {
    var user_name = req.body.user_name;
    var email = req.body.email;
    var mobile_no = req.body.mobile_no;
    var address = req.body.address;
    var id = req.params.id;
    var sql = `UPDATE student SET user_name="${user_name}", email="${email}", mobile_no="${mobile_no}", address = "${address}" WHERE id=${id}`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record updated!');
        res.redirect('/read_data');
    });
});

app.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    var sql = `DELETE FROM student WHERE id=${id}`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record deleted!');
        res.redirect('/read_data');
    });
});

app.get('/data_trunk', async (req, res, err) => {
    const sql = 'TRUNCATE TABLE student';
    try {
        conn.query(sql, (error, results, fields) => {
            if (error) {
                return console.log(error.affectedRows);
            } else {
                console.log(results.affectedRows);
            }
        });
        res.send(
            'all data are delete in database.. [insert new data]' +
                sql.affectedRows
        );
        console.log(
            'all data are delete in database.. [insert new data]' +
                sql.affectedRows
        );
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, (error) => {
    if (error) throw error;
    else {
        console.log('server is running on port http://localhost:5000');
    }
});
