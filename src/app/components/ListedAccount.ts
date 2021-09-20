

export interface ListedAccount {

    firstName?: string;
    lastName?: string;
    phoneNumber?: number;
    professions?: Array<any>;
    address?: Address;
    comment?: string;
    lastLogin?: Date;
    registeredAd?: Date;
    classifications?: Array<any>;
    email?: string;
    averageRating?: number;
    listedAccount_uuid?: string;
    category: string;
    country: string;


    }


    export class Address {

        constructor(
            public city: City,
            public postalCode: string,
            public street: string,
            public number: string,
        ) {}
    }

    export interface City {
        name?: string;
        uuid?: string;
    }

    export interface Profession {
        name?: string;
        uuid?: string;
    }




   

   