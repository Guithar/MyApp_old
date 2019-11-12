
export interface Asset {
  id: number;
  clientId: number;
  tenantId: number;
  clientCompany: string;
  name: string;
  description: string;
  location: string;
  quantity: number;
  manufacturedDate: string;
  installedDate: string;
  productName: string;
  isActive: boolean;
  isDelete: boolean;
  createdOn: Date;
  updatedOn: Date;
  deletedOn: Date;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;

}

