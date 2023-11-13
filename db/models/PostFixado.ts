import sequelize from "../db";
import { DataTypes } from "sequelize";

const PostFixado = sequelize.define("PostFixado", 
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

export default PostFixado