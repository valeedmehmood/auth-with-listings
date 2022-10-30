import { useParams } from "react-router-dom"
import useFetch from "custom-hooks/useFetch"
import ErrorComp from "components/ErrorComp"
import Loader from "components/Loader"
import { formatCurrencies } from "./helper-methods"
import React from "react"

const Details = () => {

  const {code} = useParams()

  const {isLoading, isError, data} = useFetch([`detail-${code}`, code!],  `https://restcountries.com/v3.1/alpha/${code}`)

  if(isLoading){
    return <React.Fragment data-testid="details-loader"><Loader /></React.Fragment>
  }

  if(isError){
    return <React.Fragment data-testid="details-error"><ErrorComp /></React.Fragment>
  }

  return (
    <div className="container" data-testid="details">
      <h2 className="mb-20">Country Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Common Name</td>
            <td>{data?.[0]?.name?.common ?? "-"}</td>
          </tr>
          <tr>
            <td>Official Name</td>
            <td>{data?.[0]?.name?.official ?? "-"}</td>
          </tr>
          {
            'currencies' in data![0]
            && 
            <tr>
              <td>Currencies</td>
              <td>{formatCurrencies(data?.[0].currencies!)}</td>
            </tr>
          }
          { 
            'languages' in data![0]
            &&
            <tr>
              <td>Languages</td>
              <td>{Object.values(data?.[0]?.languages!).join(" | ")}</td>
            </tr>
          }
          
          {
            ('svg' in data![0].flags || 'png' in data![0].flags)
            &&
            <tr>
              <td>Flag</td>
              <td><img src={data?.[0]?.flags?.svg ?? data?.[0]?.flags?.png} alt={data?.[0].name.common} loading="lazy" height="60" width="60"/></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Details