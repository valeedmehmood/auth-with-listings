import ErrorComp from "components/ErrorComp"
import Loader from "components/Loader"
import { Link } from "react-router-dom";
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, PageSettingsModel } from '@syncfusion/ej2-react-grids';
import { listformat } from "utils";
import { Templates } from "./listings";
import useFetch from "custom-hooks/useFetch";

const Listing = () => {

  const {isLoading, isError, data} = useFetch(['listings'], "https://restcountries.com/v3.1/all")

  const pageSettings: PageSettingsModel = { pageSize: 10 };

  const templates: Templates = {
    name({name, cca2}){
      const popup = () => alert(`${name.common} in [English/native language] – ${name.official} in [English/native language]`)
      return <span className="name-cell" data-testid={`${cca2}`} onClick={popup}>{name.common}</span>
    },
    capital({capital}){
      return listformat().format(capital!)
    },
    action({cca3}){
      return <Link className="xs" to={`/details/${cca3}`}></Link>
    }
  }

  if(isLoading){
    return <Loader />
  }

  if(isError){
    return <ErrorComp />
  }

  return (
    <div className="container" data-testid="listings">
      <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings}>
          <ColumnsDirective>
              <ColumnDirective field='cca2' headerText="Cca2" width='100'/>
              <ColumnDirective field='name.common' template={templates.name} headerText="Common name" width='100'/>
              <ColumnDirective field='capital' template={templates.capital} headerText="Capital" width='100'/>
              <ColumnDirective template={templates.action} headerText="Actions" width='100'/>
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]}/>
      </GridComponent>
    </div>
  )
}

export default Listing