import Review from "./Review";

export default interface Hotel {
    id?: string,
    name: string,
    city: string,
    address: string,
    province: string,
    description: string,
    starRating: number,
    images?: string[], //naar bucket gaan (azure storage)
    longitude: number,
    latitude: number,
    pricePerNightMin: number,
    pricePerNightMax: number,
    rating: number,
    reviews?: Review[],
}