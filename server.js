const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const validator = require('validator');
const mysql = require('mysql');
const app = express();

const port = process.env.PORT || 3000;

//  configure mysql
//  to do
const options = {
    host: 'localhost',
    user: 'root',
    password: '1RVE4X89ld019~N',
    database: 'mydb'
}

const connection = mysql.createConnection(options);


app.use(bodyParser());

//  configure view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

const clearInput = (value) => {

    value = validator.trim(value);
    value = validator.escape(value);
    return value;

}

const search = obj => {

    return new Promise ((resolve, reject) => {

        const query = `SELECT * FROM ${obj.table} WHERE ${obj.selector} LIKE ?`;

        const data = [];
    
        connection.query(query, obj.question, (error, table) => {
    
            if (error) {
        
                reject(error);
            }
    
            if (!!table.length) {

                table.forEach(element => {

                    data.push(element[obj.selector]);

                });

                resolve(data);
    
            } else {

                data.push('there are no resluts');
                resolve(data);
            }
    
        });

    });

}


app.get('/', (req, res) => {

    res.render('index');

});

app.post('/search', (req, res) => {

    if (req.body.question !== '') {

        const question = `${clearInput(req.body.question)}%`;

        search({table: 'products', selector: 'product_name', question: question})
        .then((data) => { 

            console.log(data)
            
            res.status(202).end(JSON.stringify(data));

        })
        .catch((error) => {
            console.log(error)
            res.end();
        })

    } else {

        res.status(202).end();

    }

});

app.listen(port);