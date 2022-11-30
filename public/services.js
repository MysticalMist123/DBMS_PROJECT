//--------------------------------------------IMPORTANT: try not to change this-----------------------------------------------
// console.log("yo")
// let getAll_ep = 'http://localhost:3000/getAll'
let insert_ep = 'http://localhost:3000/insert'
let del_ep = 'http://localhost:3000/delete'
let upd_ep = 'http://localhost:3000/update'
let exec_ep = 'http://localhost:3000/exec'
// let load_ep = 'http://localhost:3000/'

export class Services{
    current_date(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
    
        return yyyy +'-'+ mm + '-' + dd;
    }

    // async function getAll(){
    //     console.log("getAll button clicked")
    //     fetch(getAll_ep).then((res)=>res.json()).then((data)=>(
    //         console.log(data)
    //     ))
    // }

    // async load(page_name){
    //     console.log("loading "+page_name)
    //     /* fetch(load_ep+page_name,{

    //     })*/
    // }

    async insert(table_name,insert_values){
        console.log('insert button clicked')
        fetch(insert_ep,{
            method: 'POST',
            body: JSON.stringify({
                table_name : table_name,
                insert_values : insert_values
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            }
        }).then((data)=>(
            console.log(`inserted record.`)
        ))
    }

    async del(table_name,del_keys){
        console.log('delete button clicked')
        fetch(del_ep,{
            method:'POST',
            body: JSON.stringify({
                table_name : table_name,
                del_keys : del_keys
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            }
        }).then((data)=>(
            console.log(`deleted record `)
        ))
    }

    async update(table_name,col,new_val,identifiers){
        console.log('update button clicked')
        fetch(upd_ep,{
            method:'POST',
            body: JSON.stringify({
                table_name : table_name,
                col: col,
                new_val: new_val,
                identifiers : identifiers
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            }
        }).then((data)=>(
            console.log(`updated record`)
        ))
    }

    async exec(sql_statement){
        return new Promise(function(resolve,reject){
        // console.log(`executing ${sql_statement}`)
        fetch(exec_ep,{
            method:'POST',
            body: JSON.stringify({
                sql: sql_statement
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            }
        }).then((res)=>res.json()).then((data)=>(
            resolve(data)
        ))
        })
    }
}

//+++++++++++++++++++++++++++++++++++++++ HTML JS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
to insert, call insert(table_name,[value1,value2,value3,.....,valueN])

to delete, call del(table_name,[[ col_name1,cell_value1 ],[ col_name2,cell_value2 ],.......])
(basically, delete from {table_name} where {col_name1} = {cell_value1} and {col_name2} = {cell_value2} and......)

to update, call update(table_name,column_name,new_value,[[ col_name1,cell_value1 ],[ col_name2,cell_value2 ],.......])
(basically, update {table_name} set {column_name} = {new_val} where {col_name1} = {cell_value1} and {col_name2} = {cell_value2} and......)

to execute sql statements, call exec(sql_statement as a string).then(whatever you wanna do with it)
*/