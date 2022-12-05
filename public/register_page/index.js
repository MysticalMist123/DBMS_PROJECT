import {Services} from '../services.js'

const signupBtn = document.getElementById('signupbtn');

let s = new Services

function checkUnique(e) {
    s.exec(`select roll_no from user;`)
    .then((data)=>{
        // console.log(data);
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
    });
}
function submitData() {
    const psw = document.getElementById('psw');
    const pswRepeat = document.getElementById('psw-repeat');
    const roll = document.getElementById('roll-number');
    const Name = document.getElementById('name');
    if (!roll.checkValidity()) {
        alert('Roll number must only contain digits from 0-9!');
    } else if (!Name.checkValidity()) {
        alert('Name must only contain uppercase/lowercase letters and space!');
    } else if (!document.getElementsByTagName('select')[0].checkValidity()) {
        alert('Please select a designation!');
    } else if (!psw.checkValidity() || !pswRepeat.checkValidity()) {
        alert('Password must be non-empty and can contain the following symbols\n1. Uppercase/lowercase letters\n2. digits 0-9\n3. Special characters: !@#$%^&*')
    } else if (psw.value !== pswRepeat.value) {
        alert('Repeat password incorrect!');
    } else {
        console.log(document.getElementById('name').value);
        s.exec(`insert into user values ('${document.getElementById('roll-number').value}', '${psw.value}', '${document.getElementById('name').value}', '${document.getElementById('designation').value}');`)
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