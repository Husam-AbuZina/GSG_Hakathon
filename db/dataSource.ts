import { DataSource } from "typeorm";
import { User } from "./entities/User.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'gsg_registration',
    entities: [
        User
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: true
});

dataSource.initialize().then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

export default dataSource;