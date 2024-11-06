import { auth } from "./auth";
import { botflow } from "./botflow";
import { user } from "./user";
export * from "./organization"
export * from "./chat"

export const API_SERVICE = {
  AUTH:auth,
  USER:user,
  BOTFLOW:botflow

}