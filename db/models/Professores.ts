import sequelize from "../db";
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";

const Professores = sequelize.define('Professores',
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        sigla:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        sala:{
            type: DataTypes.STRING,
            allowNull: false
        },
        presente:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

const nanoId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");

Professores.beforeCreate((prof)=>{
    prof.id = nanoId();
});

export default Professores;