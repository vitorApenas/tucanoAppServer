import sequelize from "../db";
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";

const Turmas = sequelize.define('Turmas',
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        turma:{ //sigla
            type: DataTypes.STRING,
            allowNull: false
        },
        ano:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        curso:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

const nanoId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");

Turmas.beforeCreate((turma)=>{
    turma.id = nanoId();
});

export default Turmas;