# DBMS_PROJECT

Schema:

1. user:
   roll_no string primary key
   password string
   name string
   designation string
   
2. stu_course:
   roll_no string primary key
   course_id string primary key
   no_of_presents int
   ct1 score int
   ct2 score int
   endsem_score int
   assign1_score int
   assign2_score int
   
3. course_details:
   course_id string primary key
   no_of_classes int
   ct1_total int
   ct1_weight int
   ct2_total int
   ct2_weight int
   endsem_total int
   assign1_total int
   assign1_weight int
   assign2_total int
   assign2_weight int
   prof_roll_no string
   
NOTE: install node and npm
before starting off, open terminal and go to your project folder. Type the command: 'npm init'
then type,
1. 'npm install mysql'
2. 'npm install express'
3. 'npm install cors'
