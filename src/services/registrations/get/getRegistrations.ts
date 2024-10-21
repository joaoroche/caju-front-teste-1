import api from "../../api";

import { type ReturnGetRegistrations } from "~/@types/registrations/get";
import { type GetRegistrationsParams } from "./getRegistrationsType";

export const getRegistrations = async ({ params }: GetRegistrationsParams) => {
  return await api.get("/registrations", { params }) as ReturnGetRegistrations
}
