import { Sequelize } from "sequelize"

export const databaseConfig: object = {
    development : {
        username: 'root',
        password: 'Chaubey@123',
        database: 'learn_auth',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
}

export const sequelize = new Sequelize(databaseConfig['development']);