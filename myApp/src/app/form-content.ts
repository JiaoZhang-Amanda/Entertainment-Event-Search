export class FormContent {
    keyword: string;
    category: string;
    distance: number;
    disUnite: string;
    isUserInput: boolean;
    location: string;
    lat: number;
    lng: number;
  }

  export class EventInfo {
    LocalDate?: string 
    LocalTime?: string
    Event?:string
    showEvent?: string
    Genre?:string 
    Segment?:string
    Venue?:string
    AT?: object
    minPrice?: number
    maxPrice?: number
    ticketStatus?: string
    buyAt?: string
    seat?: string
    Vaddress?: string
    Vcity?: string
    Vstate?: string
    Vphone?: string = ""
    Vhour?: string
    Vgeneral?: string
    Vchild?: string
    Favorite: boolean
  };