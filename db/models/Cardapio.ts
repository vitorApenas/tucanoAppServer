import sequelize from "../db";
import { DataTypes } from "sequelize";

const Cardapio = sequelize.define('Cardapio',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content1:{
            type: DataTypes.STRING,
            allowNull: false
        },
        content2:{
            type: DataTypes.STRING,
            allowNull: true
        },
        abertura:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechamento:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cancelado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

export default Cardapio;