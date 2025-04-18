export type SweetAlertPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "top-left"
  | "top-right"
  | "center"
  | "center-start"
  | "center-end"
  | "center-left"
  | "center-right"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "bottom-left"
  | "bottom-right";

export interface IToastOptions {
  position?: SweetAlertPosition;
  icon?: "success" | "error";
  toast?: boolean;
  title: string;
  showConfirmButton?: boolean;
  timer?: number;
}