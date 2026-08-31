import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Reservation extends Model {
    declare id: number;
    declare userId: number;
    declare courtId: number;
    declare startHour: number;
    declare endHour: number;
    declare totalPrice: number;
}

Reservation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        courtId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        startHour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        endHour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "reservations",
        timestamps: true
    }
);