import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class UserService {

    constructor(
        private sequelize: Sequelize
    ) {
    }

    async getUserById(user_id: number) {
        const [[user], m1] = await this.sequelize.query(`select *
                                                         from learn_auth.profile
                                                         where user_id = :user_id`, {
            replacements: {user_id: user_id},
        });

        if (!user) {
            throw new HttpException('User does not exist with matching id', HttpStatus.BAD_REQUEST)
        }

        return {
            status: true,
            message: 'user fetched',
            data: user
        }
    }
}
