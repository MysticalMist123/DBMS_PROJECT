import {Services} from '../services.js'

const signupBtn = document.getElementById('signupbtn');

let s = new Services
function checkUnique(e) {
    s.exec(`select roll_no from user;`)
    .then((data)=>{
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (e.target.value === data[i].roll_no) {
                const feedback = document.createElement('div');
                feedback.textContent = 'Roll number already exists';
                feedback.setAttribute('class', "text-danger");
                e.target.parentElement.appendChild(feedback);
                signupBtn.disabled = true;
                return;
            }
        }
        signupBtn.disabled = false; 
    })
}
function submitData() {
    const psw = document.getElementById('psw').value,
    pswRepeat = document.getElementById('psw-repeat').value,
    inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i])
        if (!inputs[i].checkValidity()) {
            alert('Error');
            return;
        }
    }
    if (psw !== pswRepeat) {
        alert('Repeat password incorrect!')
    } else {
        console.log(document.getElementById('name').value);
        s.exec(`insert into user values ('${document.getElementById('roll-number').value}', '${psw}', '${document.getElementById('name').value}', '${document.getElementById('designation').value}');`)
        .then(()=> {
            window.location.replace('./login');
        })
    }
}

signupBtn.addEventListener('click', submitData); 

const rollNumInput = document.getElementById('roll-number');
rollNumInput.addEventListener('focusout', checkUnique);
rollNumInput.addEventListener('focusin', (e) => {
    if(e.target.parentElement.childElementCount === 3) {
        e.target.parentElement.removeChild(e.target.parentElement.lastChild);
        signupBtn.disabled = false;
    }
})