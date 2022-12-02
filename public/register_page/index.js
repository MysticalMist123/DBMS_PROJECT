import {Services} from '../services.js';


let service = new Services();

let submitButton = document.getElementById('signupbtn');

function createAccount() {
    let rollNumber = document.getElementById("roll-number").value;
    let Name = document.getElementById("name").value;
    let designation = document.getElementById("designation").value
    let psw = document.getElementById("psw").value;
    let pswRepeat = document.getElementById("psw-repeat").value;
    
    console.log(typeof(rollNumber), typeof(Name), typeof(designation), typeof(psw), typeof(pswRepeat));
    
    // check password
    if (psw === pswRepeat) {
        service.insert('user', [rollNumber, psw, Name, designation]).then((_data)=>{
            window.location.replace("./login");
        })
    }

}

submitButton.addEventListener('click', (e)=>{
    for(var i = 0; i < 100; i++) {
        console.log(i);
    }
    console.log('hello1');
    console.log('hello1.5');
    createAccount();
    console.log('hello2');
})