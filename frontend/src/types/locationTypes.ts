export interface UserLocation {
    id: number;
    userId: number;
    locationId: number;
    location: Location;
}

export interface Location {
    id: number;
    location: string;
    latitude: number;
    longitude: number;
}