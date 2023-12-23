import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Sequelize} from 'sequelize-typescript';

@Injectable()
export class AppService {

    constructor(
        private sequelize: Sequelize
    ) {}

    async getHello() {

        try {
            const sql = `select * from todoappdb.users`
            return await this.sequelize.query(sql, {
                nest: true,
                raw: true
            });
        } catch (err) {
            throw new HttpException('Failed', HttpStatus.BAD_REQUEST)
        }

    }
}
