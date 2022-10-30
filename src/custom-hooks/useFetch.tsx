import { useQuery } from "@tanstack/react-query"
import { fetchData } from "services"

type strNum = string | number

const useFetch = (key: strNum[], url: string) => {

    // Creating this custom hook, so that we can mock this useQuery functionality in our test cases easily, and don't need to wrap Queryclientprovider in our component testing.

    const {isLoading, isError, data} = useQuery(key, () => fetchData(url))

    return {isLoading, isError, data}

}

export default useFetch