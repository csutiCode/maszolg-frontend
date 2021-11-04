
    export interface City {
        name: string;
        city_uuid: string;
    }
    
    export interface Address {
        city: City;
        cityName?: any;
        postalCode?: any;
        street?: any;
        number?: any;
        workAddress: boolean;
    }

    export interface ListedAccount {
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber?: any;
        professions: Profession[];
        address: Address;
        about?: any;
        lastLogin?: any;
        registeredAt?: any;
        classifications: Classification[];
        listedAccount_uuid: string;
        email?: any;
        averageRating: number;
        webPage?: any;
        image?: any;
    }

    export interface Profession {
        name: string;
        profession_uuid: string;
    }

    export interface Category {
        name: string;
        professions: Profession[];
        category_uuid: string;
    }

    export interface Classification {
        rating: string;
        text: string;
        createdOn?: any;
        createdBy: string;
        classificationUuid: string;
        email: string;
        comment?: any;
        commentCreatedOn?: any;
        rate: number;
        commented: boolean;
    }
