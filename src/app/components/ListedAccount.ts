

export interface ListedAccount {

    firstName?: string;
    lastName?: string;
    phoneNumber?: number;
    profession?: Array<any>;
    address?: Address;
    comment?: string;
    lastLogin?: Date;
    registeredAd?: Date;
    classifications?: Array<any>;
    email?: string;
    averageRating?: number;
    listedAccount_uuid?: string;
    country?: string,
    category?: string


    }


    export class Address {

        constructor(
            public city: string,
            public postalCode: string,
            public street: string,
            public number: string,
        ) {}
    }



   

   