const express = require("express");
const app = express();
const hbs = require("hbs");
const mysql = require("./connection").con;
var username = "userName";
//configuration
app.set("view engine", "hbs");
app.set("views", "./template/views");
hbs.registerPartials("./template/partial");
//to configure static files to express
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + './../public/js'));

//routing localhost
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/login", (req, res) => {
    const { email, password } = req.query;

    let qry = "SELECT * from users where email=? AND password=?";
    mysql.query(qry, [email, password], (err, results) => {

        if (results.length > 0) {
            username = results;
            res.render("userpage", { msg: true, data: username });

        } else {
            res.render("home", { msg: true });

        }
    });

});
app.get("/contact", (req, res) => {
    res.render("contact", { data: username });
});
app.get("/userpage", (req, res) => {
    res.render("userpage", { data: username });
});
app.get("/supportUs", (req, res) => {
    res.render("supportUs", { data: username });
});
app.get("/registartion", (req, res) => {
    res.render("registration");
});
app.get
app.get("/registrationData", (req, res) => {
    const { email, password, password1 } = req.query;
    if (password != password1) {
        res.render("registration", { msg: false, msg1: false, msg3: true });
    }
    else {
        let qry = "SELECT * from users where email=? ";
        mysql.query(qry, [email], (err, results) => {
            if (err) throw err;
            else {
                if (results.length > 0) {
                    res.render("registration", { msg: true, msg1: false });
                }

                else {
                    let qry1 = "INSERT INTO users VALUES(?,?) ";
                    mysql.query(qry1, [email, password], (err, results) => {
                        if (err) throw err;
                        else {
                            res.render("registration", { msg1: true, msg: false });
                        }
                    });
                }
            }
        });
    }
});
app.get("/contactinfo", (req, res) => {

    const { name, email, issue } = req.query;

    let qry = "INSERT INTO issues VALUES(?,?,?)";
    mysql.query(qry, [name, email, issue], (err, results) => {
        if (err) throw err;
        if (results.affectedRows > 0) {
            res.render("contact", { msg: true });
        }
    });
});
app.get("/howtoplay", (req, res) => {
    res.render("howtoplay", { data: username });
})
const port = 8000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Port started on ${port} `);
});