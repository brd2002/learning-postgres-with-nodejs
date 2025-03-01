import { Client } from "pg";
import {important} from './important';
const client =  new Client({
    connectionString : important.databaseUrl
})

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
async function insertUser(username: string, email: string, password: string){
    await client.connect();
    const result = await client.query(`
        insert into all_users (username, email, password) values ('${username}',' ${email}', '${password}');
    `);    
    console.log(result);
}
async function getUsers(){
    await client.connect();
    const result = await client.query(`
        select * from all_users;
    `);
    console.log(result.rows);
}
// createUsersTable();
// insertUser('bharat ruidas', 'bharat@gmail.com', '123456');
getUsers();