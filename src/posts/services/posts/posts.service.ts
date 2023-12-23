import {Injectable, UseGuards} from '@nestjs/common';
import {Sequelize} from 'sequelize-typescript';
import {CreatePostDto} from "../../dtos/createPost.dto";

@Injectable()
export class PostsService {
    constructor(private readonly sequelize: Sequelize) {
    }

    async getPosts(user_id: number) {
        const getPostsSql: string = `select posts.id,
                                            title,
                                            description,
                                            date,
                                            category,
                                            p.name      as author,
                                            designation as role,
                                            image
                                     from posts
                                              inner join learn_auth.profile p on posts.user_id = p.user_id
                                     where posts.user_id = :user_id order by date desc `;

        const [posts, m1] = await this.sequelize.query(getPostsSql, {
            replacements: {
                user_id: user_id,
            },
        });

        return {
            status: true,
            message: 'Posts Fetched Successfully',
            data: posts,
        };
    }

    async createPost(body: CreatePostDto, user_id: number) {
        const insertPostSql: string = `INSERT INTO posts (user_id, title, description, date, category)
                                       VALUES (:user_id, :title, :description, :date, :category)`

        const [postData, m1] = await this.sequelize.query(insertPostSql, {
            replacements: {
                user_id: user_id,
                title: body.title,
                description: body.description,
                date: body.date,
                category: body.category

            }
        });

        return {
            status: true,
            message: 'Data Inserted Successfully',
            data: postData
        }
    }

    async getAllPosts(user_id: number) {
        const getPostsSql: string = `select posts.id,
                                            title,
                                            description,
                                            date,
                                            category,
                                            p.name      as author,
                                            designation as role,
                                            image
                                     from posts
                                              inner join learn_auth.profile p on posts.user_id = p.user_id
                                     order by date desc `;

        const [posts, m1] = await this.sequelize.query(getPostsSql, {
            replacements: {
                user_id: user_id,
            },
        });

        return {
            status: true,
            message: 'Posts Fetched Successfully',
            data: posts,
        };
    }
}
