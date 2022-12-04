//------------------------------------------------INITIAL CONFIGS-------------------------------------------------------------
const express = require('express')
const path = require('path')
const sql = require('mysql')
const cors = require('cors')
const { read } = require('fs')
const app = express()
const port = 3000

// NOTE: use your sql credentials here
// NOTE: turn the server on, using "node server.js" on your terminal
let con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Stkl@1210"
})

let use = 'use dbms_project;'
app.use(express.static(path.join(__dirname, '/public')))

//--------------------------------------------------EVENT AND REQUEST HANDLING-------------------------------------------------
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({ extended : true }));

// app.get('/getAll',(req,res)=>{
//   showAll().then((result)=>{res.send(result)})
// })

app.post('/insert',(req,res)=>{
  insert(req.body['table_name'],req.body['insert_values'])
  res.send('DONE insertion!')
})
app.post('/delete',(req,res)=>{
  del(req.body['table_name'],req.body['del_keys'])
  res.send('DONE deletion!')
})
app.post('/update',(req,res)=>{
  update(req.body['table_name'],req.body['col'],req.body['new_val'],req.body['identifiers'])
  res.send('DONE updating')
})
app.post('/exec',(req,res)=>{
  exec(req.body['sql']).then((result)=>{res.send(result)})
})

app.get('/favicon.ico', (req,res)=> {
  res.sendFile(__dirname, "public/favicon.ico");
})

app.get( '/student', (req,res)=>{
  res.sendFile(__dirname + "/public/student_dashboard/index.html");
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname + "/public/login_page/index.html")
})
app.get('/prof',(req,res)=>{
  res.sendFile(__dirname+"/public/prof_dashboard/index.html")
})
app.get('/register',(req,res)=>{
  res.sendFile(__dirname+"/public/register_page/index.html")
})
app.get( '/register', (req,res)=>{
  res.sendFile(__dirname + "/public/register_page/index.html");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//---------------------------------------------------SQL commands and associate functions--------------------------------------

function current_date(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  return yyyy +'-'+ mm + '-' + dd;
}

function insert(table_name,insert_values){
  let s=""
  for(let i=0;i<insert_values.length;i++){
    if(Number.isInteger(insert_values[i])){
      s+=`${insert_values[i]},`
    }
    else{
      s+=`"${insert_values[i]}",`
    }
  }
  s=s.slice(0,-1)

  let query = `insert into ${table_name} values(${s})`
  con.query(use,(err,result)=>{
    if(err) throw err
    console.log("using database....")
    con.query(query,(err,result)=>{
      if(err) throw err
      console.log("inserted successfully!")
    })
  })
}

function del(table_name,del_keys = []){ //del_keys is an array of arrays. ( [[col_name,col_val],[],[]....] )
  let query = ""
  if(del_keys.length == 0)
    query = `delete from ${table_name}`
  else{
    if(typeof(del_keys[0][1])!='number') del_keys[0][1] = `'${del_keys[0][1]}'`
    query = `delete from ${table_name} where ${del_keys[0][0]} = ${del_keys[0][1]}`
    for(let i=1;i<del_keys.length;i++){
      if(typeof(del_keys[i][1])!='number') del_keys[i][1] = `'${del_keys[i][1]}'`
      query+=`and ${del_keys[i][0]} = "${del_keys[i][1]}"`
    }
  }
  con.query(use,(err,result)=>{
    if(err) throw err
    console.log("using database....")
    con.query(query,(err,result)=>{
      if(err) throw err
      console.log(`deleted successfully!`)
    })
  })
}

function update(table_name,col,new_val,identifiers){ //identifiers work as del_keys of del function
  query = ""
  if(typeof(new_val)!='number') new_val = `'${new_val}'`

  if(typeof(identifiers[0][1])!='number') identifiers[0][1] = `'${identifiers[0][1]}'`
  query = `update ${table_name} set ${col} = ${new_val} where ${identifiers[0][0]} = ${identifiers[0][1]}`
  for(let i=1;i<identifiers.length;i++){
    if(typeof(identifiers[i][1])!='number') identifiers[i][1] = `'${identifiers[i][1]}'`
    query+=` and ${identifiers[i][0]} = ${identifiers[i][1]}`
  }

  con.query(use,(err,result)=>{
    if(err) throw err
    console.log("using database....")
    con.query(query,(err,result)=>{
      if(err) throw err
      console.log(`updated`)
    })
  })
}

function exec(sql_statement){ //returns promise
  return new Promise(function(resolve,reject){
    query = sql_statement
    con.query(use,(err,result)=>{
      if(err) {
        console.log('err')
        throw err;
      }
      console.log("using database....")
      con.query(query,(err,result,fields)=>{
        if(err) reject(new Error(err))
        else resolve(result)
        console.log("selected all and sent.")
      })
    })
  })
}

// function showAll(){ //returns promise
//   return new Promise(function(resolve,reject){
//     query = `select * from user`
//     con.query(use,(err,result)=>{
//       if(err) throw err
//       console.log("using database....")
//       con.query(query,(err,result,fields)=>{
//         if(err) reject(new Error(err))
//         else resolve(result)
//         console.log("selected all and sent.")
//       })
//     })
//   })
// }

// insert("course_details",["dbms",48,20,30,20,30,50,50,10,10,10,10,"1201"])
// del("stu_course",[["course_id","dbms"]])
// update("stu_course","ct1_score",18,[["course_id","dbms"]])
// showAll().then((res)=>{console.log(res)})
// exec('select * from user').then((res)=>{console.log(res)})