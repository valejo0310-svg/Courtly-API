import { DataTypes, Model  } from "sequelize";
import {sequelize} from "../config/database";

export class User extends Model {
    declare id: number;
    declare name : string;
    declare email : string;
    declare password :string;
    declare role : string;
    declare active : boolean;

}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },name: {
            type : DataTypes.STRING,
            allowNull : false
        },email: {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },password:{
            type : DataTypes.STRING,
            allowNull : false,
        },role :{
            type : DataTypes.STRING,
            defaultValue : 'CUSTOMER',
            allowNull : false
        },active : {
            type : DataTypes.BOOLEAN,
            defaultValue :true,
            allowNull : false
        }
    },{
    sequelize: sequelize,
    tableName: "users",
    timestamps : true,
    paranoid : true
}
)

