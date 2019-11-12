export interface Client {
  id: number;
  tenantId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  company: string;
  nif: string;
  jobTitle: string;
  adress: string;
  city: string;
  state_Province: string;
  ziP_PostalCode: string;
  country: string;
  email: string;
  phone: string;
  observations: string;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  deletedOn?: any;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
}
