
export interface Asset {
  id: number;
  tenantId: number;
  location: string;
  quantity: number;
  manufacturedDate: string;
  product: ProductInAsset;
  client: ClientInAsset;
  inspections: Inspection[];
  isActive: boolean;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  deletedOn?: any;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
}

interface Inspection {
  maintScheduleId: number;
  name: string;
  description: string;
  monthsInterval: number;
  lastInspectionDate: string;
  nextInspectionDate: string;
  lastResult?: string;
}

interface ProductInAsset {
  id: number;
  name: string;
  description: string;
  productCategoryId: number;
  productCategoryName: string;
}


interface ClientInAsset {
  id: number;
  tenantId: number;
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
}
