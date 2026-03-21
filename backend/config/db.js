import mysql from 'mysql2';

const db = mysql.createConnection({
    host: '127.0.0.1',         
    user: 'root',                
    password: 'rootpassword',    
    database: 'healthq'        
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database inside Docker');
});

export default db;