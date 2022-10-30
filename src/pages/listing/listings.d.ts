import { ListingResponse } from "services/services";

export interface Templates{
    name: (props: ListingResponse) => JSX.Element;
    capital: (props: ListingResponse) => string;
    action: (props: ListingResponse) => JSX.Element;
}