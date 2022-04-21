import Hotel from "./Hotel";
import Review from "./Review";
import RoomType from "./RoomType"

export default interface Reservation {
    id?: string,
    name: string,
    firstName: string,
    birthDate: Date,
    email: string,
    hotel: Hotel,
    dateOfReservation: Date,
    review?: Review,
    totalPrice: number,
    roomType: RoomType
}