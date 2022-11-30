//----------------------------------INITIATIONS-----------------------------------------------------------

import {Services} from '../services.js'

const add_button = document.getElementById('add')
const drop_button = document.getElementById('drop')
const logout_button = document.getElementById('logout')

const markTableContainer = document.getElementById('mark-table')
const attendanceTableContainer = document.getElementById('attendance-table')
const markChart = document.getElementById('mark-chart')
const attendanceChart = document.getElementById('attendance-chart')
let service = new Services()

let chart_exist1 = null
let chart_exist2 = null

//----------------------------------------MAIN STUFF------------------------------------------------------

let ROLL_NO = sessionStorage.getItem('roll_no')//'106120127'


let MARK_TABLE_QUERY = `SELECT * FROM stu_course,course_details where stu_course.course_id = course_details.course_id and roll_no = '${ROLL_NO}'`
service.exec(MARK_TABLE_QUERY).then((data)=>{
    displayMarkTable(data)
    displayAttendanceTable(data)
})

function displayMarkTable(data){
    markTableContainer.innerHTML = ``
    let string = `<table>
                    <tr>
                        <th>Course ID</th>
                        <th>CT-1</th>
                        <th>CT-2</th>
                        <th>END SEMESTER</th>
                        <th>ASGMNT - 1</th>
                        <th>ASGMNT - 2</th>
                        <th>Total Marks Obtained</th>
                        <th>Maximum Marks</th>
                    </tr>
                    `
    // let weights = []
    // let score = []
    for(let key in data){
        let course_id = data[key]['course_id']
        let ct1score = data[key]['ct1_score'] * data[key]['ct1_weight'] / data[key]['ct1_total']
        let ct2score = data[key]['ct2_score'] * data[key]['ct2_weight'] / data[key]['ct2_total']
        let endsem_score = data[key]['endsem_score'] * data[key]['endsem_weight'] / data[key]['endsem_total']
        let assign1_score = data[key]['assign1_score']*data[key]['assign1_weight']/data[key]['assign1_total']
        let assign2_score = data[key]['assign2_score']*data[key]['assign2_weight']/data[key]['assign2_total']
        let total = ct1score + ct2score + endsem_score + assign1_score + assign2_score
        let total_weight = data[key]['ct1_weight'] + data[key]['ct2_weight'] + data[key]['endsem_weight'] + data[key]['assign1_weight'] + data[key]['assign2_weight']
        string += `<tr class="choice1">
        <td>${course_id}</td>
        <td>${ct1score}</td>
        <td>${ct2score}</td>
        <td>${endsem_score}</td>
        <td>${assign1_score}</td>
        <td>${assign2_score}</td>
        <td>${total}</td>
        <td>${total_weight}</td></tr>
        `
        // score.push(total)
        // weights.push(data[key]['ct1_weight'] + data[key]['ct2_weight'] + data[key]['assign1_weight'] + data[key]['assign2_weight'] + data[key]['endsem_weight'])
    }
    string += `</table>`
    markTableContainer.innerHTML = string

    for(let i=0;i<data.length;i++){
        document.getElementsByClassName('choice1')[i].addEventListener('click',(e)=>{
            if(chart_exist1!=null){
                chart_exist1.destroy()
            }

            let row = document.getElementsByClassName('choice1')[i].innerText.split("\t")
            console.log(row)
            draw_graph(['Marks','No marks'],[row[6],row[7]-row[6]],'Marks',markChart)
        })
    }
    // graphing
    // let totalMarks = weights.reduce((partialSum, a) => partialSum + a, 0);
    // let accquiredMarks = score.reduce((partialSum, a) => partialSum + a, 0);
    // let piChartColors = ['rgba(0,255,0)','rgba(255,255,0)']
    // let config = getConfig('doughnut',['Marks','No marks'],[accquiredMarks,totalMarks-accquiredMarks],'Marks',piChartColors)
    // const chart = new Chart(markChart,config)
}
function displayAttendanceTable(data){
    attendanceTableContainer.innerHTML = ``
    let string = `<table>
                    <tr>
                        <th>Course ID</th>
                        <th>No. of days Present</th>
                        <th>No. of days Absent</th>
                        <th>Total working days</th>
                        <th>Attendance percentage %</th>
                    </tr>
                    `
    // let totalpresent = 0
    // let totalabsent = 0
    for(let key in data){
        let course_id = data[key]['course_id']
        let present = data[key]['no_of_presents']
        let working = data[key]['no_of_classes']
        let absent = working - present
        let percentage = Number((present*100/working).toFixed(3))
        string += `<tr class="choice2">
        <td>${course_id}</td>
        <td>${present}</td>
        <td>${absent}</td>
        <td>${working}</td>
        <td>${percentage}</td></tr>
        `
        // totalpresent += present
        // totalabsent += absent

    }
    string += `</table>`
    attendanceTableContainer.innerHTML = string

    for(let i=0;i<data.length;i++){
        document.getElementsByClassName('choice2')[i].addEventListener('click',(e)=>{
            if(chart_exist2!=null){
                chart_exist2.destroy()
            }

            let row = document.getElementsByClassName('choice2')[i].innerText.split("\t")
            console.log(row)
            draw_graph(['Present','Absent'],[row[1],row[2]],'Attendance',attendanceChart)
        })
    }
    //graphing
    // let piChartColors = ['rgba(0,255,0)','rgba(255,0,0)']
    // let config = getConfig('doughnut',['Present','Absent'],[totalpresent,totalabsent],'Attendance%',piChartColors)
    // const chart = new Chart(attendanceChart,config)
}

function applyCourse(){
    let inp = document.getElementById('course-inp')
    let course = inp.value
    service.exec(`insert into stu_course values('${ROLL_NO}','${course}',0,0,0,0,0,0)`)
    inp.value = ''
}

function dropCourse(){
    let inp = document.getElementById('course-inp-drop')
    let course = inp.value
    service.exec(`delete from stu_course where roll_no = '${ROLL_NO}' and course_id = '${course}'`)
    inp.value = ''
}

// ------------------------------------------GRAPH UTILITY-----------------------------------------------------------------
function draw_graph(labels,data,title,chart_name){
    let piChartColors = ['rgba(0,255,0)','rgba(255,0,0)']
    let config = getConfig('doughnut',labels,data,title,piChartColors)
    let chart = new Chart(chart_name,config)

    if(title == 'Marks') chart_exist1 = chart
    else if(title == 'Attendance') chart_exist2 = chart
}

function getConfig(type,x,y,label,backgroundColor=`rgba(0, 0, 0, 0.1)`,borderColor=`rgba(0, 0, 0, 0.1)`,color=`#666`){
    let data = {
        labels: x,
        datasets : [{
            data : y,
            backgroundColor : backgroundColor,
            borderColor : borderColor,
            color : color,
            label: label,
        }]
    }
    return {type:type,data:data}
}

//------------------------------EVENT LISTENERS------------------------------------------------------

add_button.addEventListener('click',(e)=>{
    applyCourse()
})

drop_button.addEventListener('click',(e)=>{
    dropCourse()
})

logout_button.addEventListener('click',(e)=>{
    sessionStorage.clear()
    window.location.replace("./login")
})