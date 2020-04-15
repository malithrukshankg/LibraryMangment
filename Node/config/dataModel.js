const pool=require("./database");
const mysql = require('mysql') ;
const {genSaltSync,hashSync}=require("bcrypt")


const client = mysql.createConnection({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
    connectionLimit:10
    
});

module.exports={
   
    createUserTable:()=>{
        
        
            client.query(
                `create table if not exists user(
                    uid int primary key auto_increment,
                    fname varchar(255)not null,
                    lname varchar(255)not null,
                    email varchar(255),
                    Gender varchar(255),
                    password varchar(255)not null,
                    telephone INT,
                    role varchar(255)not null,
                    UNIQUE (fname)
                    
                )`,function(err, rows, fields) {
                    if (err){
                        console.log(err);
                        console.log('Error in barrow making user table');
                    };
                    console.log('user Table created');
                    
                });

            var records = [
                ['Jack','thomas','mc@gmail.com','male','abcdef', 827894668978,"user"],
                ['malith','rukshan','mcwe@gmail.com','male','pqrst', 878956664552,"user"],
                ['drashi','sarathchandra','mcwe@gmail.com','female','xyqw', 82895636,"user"],
                ['chamodi','dilshani','abc@gmail.com','female','xyqw', 828789636,"user"],
                ['chamika','madushan','vbn@gmail.com','male','xyqfjgw', 828789636,"user"]
              ];
            
              records.forEach(function(value){
                const array=value;
                const salt=genSaltSync(10);
               value[4]=hashSync(value[4],salt)
              });
            
         client.query(
            'insert into user(fname,lname,email,Gender,password,telephone,role)values?',
            [records],function(err, rows, fields) {
                if (err){
                    console.log(err);
                   
                };
                console.log('Data aded to user tabel');
            });
            
               
        
        
    },

    createBookTable:()=>{

        var records = [
            ['Harry Potter','upload/harryPotter.jpg'],
            ['Lord of the rings','upload/lordOfTherRing.jpg'],
            ['game of thrones','upload/Game.jpg'],
            ['angels and deamon','upload/angels.jpg'],
            ['davinchi code','upload/DaVinciCode.jpg'],
            ['famous five','upload/famous.jpg'],
            ['hansel and grattel','upload/hansel-and-gretel.jpg'],
            ['God father I','upload/godI.jpg'],
            ['God father II','upload/godII.jpg'],
            
          ];
        
        
            client.query(
                `create table if not exists book(
                    bid int primary key auto_increment,
                    name varchar(255)not null,
                    image_location varchar(255), 
                    UNIQUE (name)
                )`,function(err, rows, fields) {
                    if (err){
                        console.log(err);
                        console.log('Error in making book table');
                    };
                    console.log('book Table created');
                });
            
            client.query(
                    'insert into book(name,image_location)values?',
                    [records],function(err, rows, fields) {
                        if (err){
                            console.log(err);
                            
                        };
                        console.log('Data aded to book table Table created');
                    });



              
        
    },
    
    createBarrowTable:()=>{
        var records = [
            [1,3,'2012-1-5','2012-2-5'],
            [4,4,'2012-1-5','2012-2-5'],
            [4,1,'2012-5-5','2012-6-5'],
            [1,4,'2012-6-5','2012-7-5'],
            [1,3,'2012-7-5','2012-8-5'],
            [3,1,'2017-8-5','2017-9-5'],
            [3,4,'2016-6-5','2016-7-5'],
            [3,3,'2015-7-5','2015-8-5'],
            [3,1,'2013-8-5','2013-9-5'],
            [2,1,'2013-8-5','2013-9-5'],
            [5,4,'2019-1-5','2019-2-5'],
            [6,1,'2019-1-5','2019-2-5'],
            [7,4,'2016-6-5','2016-7-5'],
            [8,3,'2015-7-5','2015-8-5'],
            [9,4,'2016-6-5','2016-7-5'],
        ];
        
            client.query(
                `create table if not exists Barrow(
                    bid INT,
                    uid INT,
                    date_of_borrow Date,
                    date_of_return Date,
                    PRIMARY KEY (bid, uid,date_of_borrow,date_of_return),
                    FOREIGN KEY (bid) REFERENCES book (bid) ON DELETE CASCADE,
                    FOREIGN KEY (uid) REFERENCES user (uid) ON DELETE CASCADE
                )`,function(err, rows, fields) {
                    if (err){
                        console.log(err);
                        console.log('Error in barrow making barrow table');
                    };
                    console.log('Barrow Table created');
                });


                client.query(
                    'insert into Barrow(bid,uid,date_of_borrow,date_of_return)values?',
                    [records], function(err, rows, fields) {
                    if (err){
                        console.log(err)
                    };
                    console.log('Data added to barrow table');
                });
                        

                
        
        
    },

    createAdminTable:()=>{
        
        
        client.query(
            `create table if not exists admin(
                uid int primary key auto_increment,
                name varchar(255)not null,
                password varchar(255)not null,
                role varchar(255)not null,
                UNIQUE (name)
                
            )`,function(err, rows, fields) {
                if (err){
                    console.log(err);
                    console.log('Error in barrow making user table');
                };
                console.log('admin Table created');
                
            });

        var records = [
            ['admin','admin',"admin"],
          ];
        
          records.forEach(function(value){
            const array=value;
            const salt=genSaltSync(10);
           value[1]=hashSync(value[1],salt)
          });
        
     client.query(
        'insert into admin(name,password,role)values?',
        [records],function(err, rows, fields) {
            if (err){
                console.log(err);
               
            };
            console.log('Data aded to admin tabel');
        });
        
           
    
    
},

    


    
}