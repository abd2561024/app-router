export type CommonPage = {
    uri: string;
    statusCode: number;
    domain: string;
    locales: { isAvail: boolean; isPopular: boolean; href: string; name: string; code: string }[];
    locale: string;
    currencies: { isPopular: boolean; name: string; code: string }[];
    currency: string;
    routes: {
        about: { id: 'about'; href: string };
        privacy: { id: 'privacy'; href: string };
        terms: { id: 'terms'; href: string };
        general: { id: 'general'; href: string };
        contact: { id: 'contact'; href: string };
        hotels: { id: 'hotels'; href: string };
        flights: { id: 'flights'; href: string };
        rentcar: { id: 'rentcar'; href: string };
        guide: { id: 'guide'; href: string };
        activities: { id: 'activities'; href: string };
        activitiesAllCountries: { id: 'activitiesAllCountries'; href: string };
        activitiesAllRegions: { id: 'activitiesAllRegions'; href: string };
        activitiesAllCities: { id: 'activitiesAllCities'; href: string };
        activitiesAllCategories: { id: 'activitiesAllCategories'; href: string };
        hotelsDestination: { id: 'hotelsDestination'; href: string };
        hotelsAirports: { id: 'hotelsAirports'; href: string };
        hotelsCities: { id: 'hotelsCities'; href: string };
        hotelsCountries: { id: 'hotelsCountries'; href: string };
        hotelsHotels: { id: 'hotelsHotels'; href: string };
        hotelsRegions: { id: 'hotelsRegions'; href: string };
        flightsAllCountries: { id: 'flightsAllCountries'; href: string };
        flightsFromAllCountries: { id: 'flightsFromAllCountries'; href: string };
        flightsAllCities: { id: 'flightsAllCities'; href: string };
        flightsFromAllCities: { id: 'flightsFromAllCities'; href: string };
        flightsAllRoutes: { id: 'flightsAllRoutes'; href: string };
        flightsAllCompanies: { id: 'flightsAllCompanies'; href: string };
        flightsAllAirports: { id: 'flightsAllAirports'; href: string };
        flightsFromAllAirports: { id: 'flightsFromAllAirports'; href: string };
        guideAllCities: { id: 'guideAllCities'; href: string };
        guideAllCountries: { id: 'guideAllCountries'; href: string };
        guideAllIslands: { id: 'guideAllIslands'; href: string };
        guideAllRegions: { id: 'guideAllRegions'; href: string };
        guideAttractions: { id: 'guideAttractions'; href: string };
        guideBlog: { id: 'guideBlog'; href: string };
    };
    seo: {
        schema: { [key: string]: unknown } | { [key: string]: unknown }[] | null;
        htmlLang: string;
        title?: string;
        description?: string;
        alternate: { hreflang: string; href: string; name: string; code: string }[];
    };
} & Record<any, any>;
