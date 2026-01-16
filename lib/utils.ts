import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import message from "./db/module/message/message";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toastSuccess(message: string) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
  });
}

export function toastError(message: string) {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
  });
}
