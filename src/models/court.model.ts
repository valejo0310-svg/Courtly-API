import { DataTypes, Model  } from "sequelize";
import {sequelize} from "../config/database";

export class Court extends Model {
    declare id: number;
    declare name: string;
    declare pricePerHour: number;
    declare active: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt: Date | null; 
}

Court.init (
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },name:{
        type :DataTypes.STRING,
        allowNull : false
    },pricePerHour:{
        type :DataTypes.INTEGER,
        allowNull : false,
    },active:{
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },{
    sequelize: sequelize,
    tableName: "courts",
    timestamps : true,
    paranoid : true
}
    
)