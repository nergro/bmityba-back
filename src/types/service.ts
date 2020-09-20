interface Benefit {
    nameLT: string;
    nameEN: string;
    descriptionLT: string;
    descriptionEN: string;
}

export interface Service {
    id: string;
    nameLT: string;
    nameEN: string;
    descriptionLT: string;
    descriptionEN: string;
    benefitsTitle: string;
    benefitsDescription: string;
    benefits: {
        titleLT: string;
        titleEN: string;
        descriptionLT: string;
        descriptionEN: string;
        benefits: Benefit[];
    };
    price: number;
    priceDescriptionLT: string;
    priceDescriptionEN: string;
    image: string;
}
