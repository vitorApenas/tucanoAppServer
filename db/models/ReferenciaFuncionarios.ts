import { customAlphabet } from "nanoid";
import sequelize from "../db";
import {DataTypes} from 'sequelize';

const ReferenciaFuncionarios = sequelize.define('ReferenciaFuncionarios',
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-');

ReferenciaFuncionarios.beforeCreate((func)=>{
    func.id = nanoId();
});

export default ReferenciaFuncionarios;