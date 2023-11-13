import sequelize from "../db";
import { DataTypes } from "sequelize";

const Posts = sequelize.define("Posts", 
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        txt:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        foto:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        extensao:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        updatedAt: false
    }
);

export default Posts;