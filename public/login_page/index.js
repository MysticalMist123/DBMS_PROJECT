import {Services} from '../services.js'
let s = new Services

const loginBtn = document.getElementById('signupbtn');
const roll = document.getElementById('roll-number'); 
const psw = document.getElementById('psw');

function login(e) {
    s.exec(`select designation from user where roll_no = '${roll.value}' and password = '${psw.value}';`)
    .then((data)=>{
        if (data.length === 0) {
            alert('Error: Incorrect credentials!');
        } else {
            const desig = data[0].designation;
            sessionStorage.setItem("roll_no", roll.value);
            sessionStorage.setItem("designation", desig);
            if (desig == 'prof') {
                window.location.replace('./prof');
            } else {
                window.location.replace('./student');
            }
        }
    });
}

loginBtn.addEventListener('click', login);