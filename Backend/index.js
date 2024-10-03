const express = require("express");
const {open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const jwt = require('jsonwebtoken');

const app = express();

const dbPath = path.join(__dirname,"transition.db");

app.use(express.json());

let db = null;

const intializeServer = async()=>{
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database,
        });
        app.listen(3004,()=>{
            console.log("Server Started")
        })
    }catch(e){
        console.log(`Db error:${e.message}`);
        process.exit(1);
    }
}

app.get("/transitions",async(req,res)=>{
    const transitionQuery = `
    SELECT *
    FROM transactions
    `
    const response = await db.all(transitionQuery);
    res.send(response)
})

app.post("/login",async(req,res)=>{
    const {userName,password} = req.body
    const loginQuery = `
    SELECT *
    FROM userDetails
    WHERE username = '${userName}';
    `;
    const response = await db.get(loginQuery);
    if (response === undefined){
        res.status(400)
        res.send("Invalid")
    }else{
        if (response.password === password){
            const SECRET_KEY = 'your-secret-key';
            const payload = {
               userName,password
             }
            const token = jwt.sign(payload,SECRET_KEY,{ expiresIn: '1h' })
            res.json({token});
        }else{
            res.status(400)
            res.send("invalid")
        }
    }
})

app.post("/register",async(req,res)=>{
    const {userName,password} = req.body
    const check_userName = `SELECT *
    FROM userDetails
    WHERE username = '${userName}';`;
    const queryResult =await db.get(check_userName)
    if (queryResult===undefined){
        const register_query = `
        INSERT INTO userDetails(username,password)
        VALUES ('${userName}','${password}');`;
        const result = await db.run(register_query)
        res.status(200)
        res.send("sucess")
    }else{
        res.status(400)
        res.send("invalid")
    }

})

app.post("/addtransition",async(req,res)=>{
    const {type,amount,description} = req.body;
    const transitionQueryOld = `
    SELECT *
    FROM transactions
    `
    let balance = undefined
    const transactions_result = await db.all(transitionQueryOld);
    if (transactions_result.length === 0){
        balance = amount
    }else{
        const {running_balance} = transactions_result[transactions_result.length-1]
        if (type ==="Credit"){
            balance = running_balance + parseInt(amount) 
        }else{
            balance = running_balance - parseInt(amount)
        }
    }
    
    const addtransition = `
    INSERT INTO transactions(type,amount,description,date,running_balance)
    VALUES ('${type}','${amount}','${description}',date('now'),'${balance}');
    `;
    const addingTransition =await db.run(addtransition);
    res.status(200)
    res.send("sucess")
})

intializeServer();

module.exports = app;
   