import axios from "axios";
import { ListingResponse } from "./services";

export const fetchData = async (url: string) : Promise<ListingResponse[]> => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error("Something went wrong");    
    }
}