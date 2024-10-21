import api from "../../api";

import { PutRegistrationsParams } from "./putRegistrationsType";

export const putRegistrations = async ({ payload }: PutRegistrationsParams) => {
  return await api.put(`/registrations/${payload.id}`, payload);
}
