import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { ImageEntity } from "./entities/ImageEntity.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, ImageEntity],
    migrations: [],
    synchronize: true,
    logging: false
});

dataSource.initialize().then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

export default dataSource;
