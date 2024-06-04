import { IToastOptions } from "@/types";
import Swal from "sweetalert2";

export const toast = (options: IToastOptions) => {
  const { position = "top-end", icon = "success", title } = options;
  Swal.fire({
    position,
    icon,
    toast: true,
    title,
    showConfirmButton: false,
    timer: 3000,
  });
};