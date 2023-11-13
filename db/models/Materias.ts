import sequelize from "../db";
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";

const Materias = sequelize.define("Materias",
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
        }
    },
    {
        timestamps: false
    }
);

const nanoId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");

Materias.beforeCreate((materia)=>{
    materia.id = nanoId();
});

export default Materias;