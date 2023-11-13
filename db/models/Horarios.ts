import sequelize from "../db";
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";

const Horarios = sequelize.define("Horarios",
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        aula:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        horario:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idTurma:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idMateria:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idProf:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

const nanoId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");

Horarios.beforeCreate((horario)=>{
    horario.id = nanoId();
});

export default Horarios;