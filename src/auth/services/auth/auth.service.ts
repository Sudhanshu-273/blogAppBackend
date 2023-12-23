import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Sequelize} from 'sequelize-typescript';
import {CreateUserDto} from '../../dtos';
import {JwtService} from '@nestjs/jwt';
import {LoginUserDto} from 'src/auth/dtos/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly sequelize: Sequelize,
        private readonly jwtService: JwtService,
    ) {
    }

    async createAccount(userDetails: CreateUserDto) {
        try {
            const sql = `insert into learn_auth.users (username, email, password)
                         VALUES (:username, :email, :password)`;


            const [data, m1] = await this.sequelize.query(sql, {
                replacements: {
                    username: userDetails.username,
                    email: userDetails.email,
                    password: userDetails.password,
                },
            });

            console.log(data);

            const [user_details, m2] = await this.sequelize.query(`select users.username as name from users where id = :id`, {
                replacements: {
                    id: data
                }
            });

            const createProfileSql = await this.sequelize.query(`INSERT INTO learn_auth.profile (user_id, name)
                                                                 VALUES (:user_id, :name)`, {
                replacements: {
                    user_id: data,
                    name: userDetails['username']
                }
            });

            console.log(data);

            return {
                status: true,
                message: 'User Created Sucessfully. Kindly Login',
                data: data,
            };
        } catch (err) {
            console.log(err);
            return {
                status: false,
                message: 'Some Error Occured. Read error log',
                error: err,
            };
        }
    }

    async loginUser(userDetails: LoginUserDto) {
        const {email, password} = userDetails;

        const [[user], m1] = await this.sequelize.query(
            `select *
             from learn_auth.users
             where email = :email`,
            {
                replacements: {email},
            },
        );

        console.log(user)

        if (!user || user['password'] !== password) {
            throw new HttpException(
                'Incorrect Email/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        const jwt = await this.jwtService.signAsync({
            id: user['id'],
        });

        console.log(jwt);

        return jwt;
    }
}
