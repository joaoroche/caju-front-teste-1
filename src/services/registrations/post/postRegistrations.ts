import api from "../../api";

import { PostRegistrationsParams } from "./postRegistrationsType";

export const postRegistrations = async ({ payload }: PostRegistrationsParams) => {
  return await api.post("/registrations", payload);
}
