//---------------------------------------------initializations------------------------------------------

import {Services} from '../services.js'
let s = new Services

const proll_no = sessionStorage.getItem('roll_no')
let DESIGNTION = sessionStorage.getItem('designation')
if (DESIGNTION === "student") {
    window.location.replace('./prof');
}
const sroll_no = document.getElementById('roll_no')
const cid = document.getElementById('course_id')
const enter_button = document.getElementById('get_info_button')
const save_button = document.getElementById('save_stu_button')
const detail_box = document.getElementById('details')

//--------------------------------------------functions-------------------------------------------------

function caltot(data){
    let ct1 = (data[0].ct1_weight * data[0].ct1_score)/data[0].ct1_total
    let ct2 = (data[0].ct2_weight * data[0].ct2_score)/data[0].ct2_total
    let ass1 = (data[0].assign1_weight * data[0].assign1_score)/data[0].assign1_total
    let ass2 = (data[0].assign2_weight * data[0].assign2_score)/data[0].assign2_total
    let endsem = (data[0].endsem_weight * data[0].endsem_score)/data[0].endsem_total
    return ct1+ct2+ass1+ass2+endsem
}

//--------------------------------------------event-listeners--------------------------------------------

enter_button.addEventListener('click',(e)=>{
    if(sroll_no.value != '' && cid.value != ''){
        s.exec(`select * from stu_course,course_details where stu_course.course_id = course_details.course_id and prof_roll_no = '${proll_no}' and stu_course.course_id = '${cid.value}' and roll_no = '${sroll_no.value}'`).then((data)=>{
            if(data.length){
                // console.log(data)
                document.getElementById('ct1_score').value = data[0].ct1_score
                document.getElementById('ct2_score').value = data[0].ct2_score
                document.getElementById('ass1_score').value = data[0].assign1_score
                document.getElementById('ass2_score').value = data[0].assign2_score
                document.getElementById('endsem_score').value = data[0].endsem_score
                let tot = caltot(data)
                document.getElementById('total_score').value = `${tot}/${data[0].ct1_weight + data[0].ct2_weight + data[0].assign1_weight + data[0].assign2_weight + data[0].endsem_weight}`
                document.getElementById('pre_days').value = data[0].no_of_presents
                document.getElementById('tot_days').value = data[0].no_of_classes
                document.getElementById('attend').value = `${data[0].no_of_presents*100/data[0].no_of_classes}%`
                detail_box.style.display = 'flex'
            }
        })
    }
})

save_button.addEventListener('click',(e)=>{
    let ct1_score = document.getElementById('ct1_score').value
    let ct2_score = document.getElementById('ct2_score').value
    let ass1_score = document.getElementById('ass1_score').value
    let ass2_score = document.getElementById('ass2_score').value
    let endsem_score = document.getElementById('endsem_score').value
    let pre_days = document.getElementById('pre_days').value

    s.exec(`update stu_course set ct1_score = ${ct1_score} where roll_no = '${sroll_no.value}' and course_id = '${cid.value}'`)
    s.exec(`update stu_course set ct2_score = ${ct2_score} where roll_no = '${sroll_no.value}' and course_id = '${cid.value}'`)
    s.exec(`update stu_course set assign1_score = ${ass1_score} where roll_no = '${sroll_no.value}' and course_id = '${cid.value}'`)
    s.exec(`update stu_course set assign2_score = ${ass2_score} where roll_no = '${sroll_no.value}' and course_id = '${cid.value}'`)
    s.exec(`update stu_course set endsem_score = ${endsem_score} where roll_no = '${sroll_no.value}' and course_id = '${cid.value}'`)
    s.exec(`update stu_course set no_of_presents = ${pre_days} where roll_no = '${sroll_no.value}' and course_id = '${cid.value}'`)

    alert('Changes saved!')
})

document.getElementById('logout').addEventListener('click',(e)=>{
    sessionStorage.clear()
    window.location.replace('./login')
})