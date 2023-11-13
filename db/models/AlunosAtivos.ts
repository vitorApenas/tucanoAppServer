import sequelize from "../db";
import { DataTypes } from "sequelize";

const AlunosAtivos = sequelize.define('AlunosAtivos',
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
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rg:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        turma:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fotoPerfil:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.TEXT, //por causa da criptografia, sem se limitar a 255 char
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

export default AlunosAtivos;