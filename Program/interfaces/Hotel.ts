import Reservation from "./Reservation";
import Review from "./Review";
import RoomType from "./RoomType";

export default interface Hotel {
    id?: string,
    name: string,
    city: string,
    address: string,
    province: string,
    description: string,
    starRating: number,
    image: string,
    longitude: number,
    latitude: number,
    pricePerNightMin: number,
    pricePerNightMax: number,
    rating: number,
    reviews?: Review[],
    roomtypes: RoomType[]
}