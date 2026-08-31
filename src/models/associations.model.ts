import { User } from "./user.model";
import { Court } from "./court.model";
import { Reservation } from "./reservation.model";

User.hasMany(Reservation, {
    foreignKey: "userId",
    as: "reservations"
});

Reservation.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

Court.hasMany(Reservation, {
    foreignKey: "courtId",
    as: "reservations"
});

Reservation.belongsTo(Court, {
    foreignKey: "courtId",
    as: "court"
});

export {
    User,
    Court,
    Reservation
};