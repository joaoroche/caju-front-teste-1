import api from "../../api";

import { DeleteRegistrationsParams } from "./deleteRegistrationsType";

export const deleteRegistrations = async ({ id }: DeleteRegistrationsParams) => {
  return await api.delete(`/registrations/${id}`,);
}
