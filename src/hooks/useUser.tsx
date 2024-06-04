
import { QUERY_KEY } from "@/lib"
import { API_SERVICE } from "@/services"

import Cookies from 'js-cookie';
import { useQuery } from "@tanstack/react-query"


export const useUser=()=> {
  const session = Cookies.get('orga_sid') 
 console.log({session})
  const profile =  useQuery({
      queryKey:[QUERY_KEY.ME],
      queryFn: API_SERVICE.USER.ME,
    })
  

  return {
    profile
  }
  
}