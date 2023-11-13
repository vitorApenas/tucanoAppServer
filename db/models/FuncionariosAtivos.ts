import sequelize from "../db";
import { DataTypes } from "sequelize";

const FuncionariosAtivos = sequelize.define('FuncionariosAtivos',
    {
        email:{
            type: DataTypes.STRING,
            primaryKey: true,
            validate:{
                isEmail: true
            }
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fotoPerfil:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

export default FuncionariosAtivos;