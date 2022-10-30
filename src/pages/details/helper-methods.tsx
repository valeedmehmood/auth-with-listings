import { ListingResponse } from "services/services"

export const formatCurrencies = (currencies: Pick<ListingResponse, 'currencies'>) => {
    const html = Object.values(currencies).map((currency: any, index: number) => (
      <p key={index}>{currency.name} - {currency.symbol}</p>
    ))
    return html
}