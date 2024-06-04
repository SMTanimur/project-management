import { QUERY_KEY } from "@/lib"
import { API_SERVICE } from "@/services"
import { IUser } from "@/types/user"
import { useQuery } from "@tanstack/react-query"


export const useUser=()=> {

  const profile = ()=> {
    return useQuery({
      queryKey:[QUERY_KEY.ME],
      queryFn: API_SERVICE.USER.ME,

    })
  }

  return {
    profile
  }
  
}