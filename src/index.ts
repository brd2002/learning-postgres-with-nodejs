import { Client } from "pg";
import {important} from './important';
const client =  new Client({
    connectionString : important.databaseUrl // database link from important.ts file neondb
})

// this function will create a table in the database

async function createUsersTable(){
    await client.connect();
    const result = await client.query(`
        create table all_users (
            id serial primary key , 
            username varchar(50) unique not null , 
            email varchar(50) unique not null,
            password varchar(255) not null , 
            create_at timestamp with time zone default current_timestamp
            );
        `);
        console.log(result);
}
// this function will insert a user in the database
async function insertUser(username: string, email: string, password: string){
    await client.connect();
    const result = await client.query(`
        insert into all_users (username, email, password) values ('${username}',' ${email}', '${password}');
    `);    
    console.log(result);
}
// this function will get all the users from the database
async function getUsers(){
    await client.connect();
    const result = await client.query(`
        select * from all_users;
    `);
    console.log(result.rows);
}
// this function will get a user by id from the database
async function getUserById(id: number){
    await client.connect();
    const result = await client.query(`
        select * from all_users where id = ${id};
    `);
    console.log(result.rows);
}
// createUsersTable();
// insertUser('anusri ruidas', 'anu@gmail.com', '123456');
// getUsers();
// getUserById(1);