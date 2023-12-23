import {Injectable} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";
import {UpdateProfileDto} from "../../dtos/updateProfile.dto";

@Injectable()
export class ProfileService {
    constructor(private readonly sequelize: Sequelize) {
    }

    async updateProfile(body: UpdateProfileDto, user_id: number) {
        const updateProfileSql: string = `UPDATE profile
                                          set name        = :name,
                                              designation = :designation,
                                              image       = :image
                                          where user_id = :user_id`

        await this.sequelize.query(updateProfileSql, {
            replacements: {
                user_id: user_id,
                name: body.name,
                designation: body.designation,
                image: body.image
            }
        });

        return {
            status: true,
            message: 'Profile Updated Successfully',

        }
    }

    async is_completed(user_id: number) {
        const checkSql: string = `select designation, image
                                  from profile
                                  where user_id = :user_id`

        const [data, m1] = await this.sequelize.query(checkSql, {
            replacements: {user_id: user_id}
        });

        return {
            status: true,
            data: data
        }
    }

    async view(user_id: number) {
        const view_sql: string = `select profile.id,
                                         name,
                                         u.email,
                                         designation,
                                         COUNT(p.id) as blogs
                                  from profile
                                           inner join learn_auth.posts p on profile.user_id = p.user_id
                                           inner join learn_auth.users u on p.user_id = u.id
                                  where profile.user_id = :user_id
                                  group by profile.id`

        const [view, m1] = await this.sequelize.query(view_sql, {
            replacements: {
                user_id: user_id
            }
        })

        return {
            status: true,
            data: view
        }
    }
}
