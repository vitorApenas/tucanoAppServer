import sequelize from "../db";
import { DataTypes } from "sequelize";

const ReferenciaAlunos = sequelize.define('ReferenciaAlunos',
    {
        rm:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            validate:{
                len: [6]
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        turma:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rg:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false
    }
);

export default ReferenciaAlunos;