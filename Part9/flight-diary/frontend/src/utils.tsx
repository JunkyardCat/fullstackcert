import { ValidationError } from "./types";

export const isValidationError = (data: unknown): data is ValidationError => {
  console.log("hello", data, data !== null, typeof data === "object");
  console.log(typeof data);
  //return data !== null && typeof data === "object" && "message" in data;
  return data !== null && typeof data === "object" && "data" in data;
};
