import Hotel from "./Hotel";
import Review from "./Review";
import RoomType from "./RoomType"

export default interface Reservation {
    id?: string,
    lastName: string | null,
    firstName: string | null,
    birthDate: Date | null,
    mail: string | null,
    hotelName: string | null,
    incheckDate: Date | null,
    outcheckDate: Date | null,
    price: number | null,
    roomTypeName: string | null,
    image: string,
}