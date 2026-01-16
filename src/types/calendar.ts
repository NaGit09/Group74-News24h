export interface HolidayResponse {
    meta : {
        code : number;
    }
    response : {
        holidays : Holiday[];
    }
}

export interface Holiday {
    name: string;
    description: string;
    country: {
        id : string;
        name : string;
    }
    date : {
        iso: string;
        datetime : {
            day : number;
            month : number;
            year : number;
        }
    }
    type: string[];
    primary_type: string;
    canonical_url: string;
    urlid: string;
    locations: string;
    state: string;

}