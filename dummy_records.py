import mysql.connector as mysql
from random import randint

db = mysql.connect (
    host = "localhost",
    user = "root",
    password = "password",
    database = "dbms_project"
)

cursor = db.cursor()

# populate course_details
for course_id in range(1,6):
    numClasses = randint(30, 50)
    totalMarkList = [randint(1,5)*10 for i in range(5)]
    totalWeightList = [randint(1,100) for i in range(5)]
    totalWeightSum = sum(totalWeightList)
    totalWeightList = [num*100/totalWeightSum for num in totalWeightList]
    print(totalWeightList)
    record = f"'{str(course_id)}', {numClasses}, "
    for i in range(5):
        record += f"{totalMarkList[i]}, {totalWeightList[i]}, "
    record += f"'{str(course_id+5)}'"
    cursor.execute(f'insert into course_details values (' + record + f');')
    db.commit()


# populate stu_course and user
for stu in range(1,6):
    cursor.execute(f'insert into user values ("{stu}", "123", "John Doe {stu}", "student")')
    cursor.execute(f'insert into user values ("{stu+5}", "123", "John Doe {stu+5}", "professor")')
    for course in range(1,6):
        cursor.execute(f'select * from course_details where course_id = "{course}";')
        record = cursor.fetchall()[0]
        newRecord = f"'{stu}', '{course}', {randint(0,record[1])}"
        for i in range(2, 11, 2):
            newRecord += f", {randint(0,record[i])}"
        cursor.execute(f'insert into stu_course values (' + newRecord + f');')
        db.commit()
