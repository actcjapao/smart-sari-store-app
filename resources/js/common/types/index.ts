import { HttpStatusCode } from "axios";
import { ResponseKey } from "../enums";

export type BaseResponse = {
   key: ResponseKey;
   status_code: HttpStatusCode;
   message: string;
};
