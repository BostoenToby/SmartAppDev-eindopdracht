import Hotel from "./Hotel";
import Review from "./Review";

export default interface Reservation {
    id?: string,
    name: string,
    firstName: string,
    birthDate: Date,
    email: string,
    hotel: Hotel,
    numberOfRooms: number,
    dateOfReservation: Date,
    review?: Review,
    totalPrice: number,
}