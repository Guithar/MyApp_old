import { Product } from './product';

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
  productProductCategoryId: number;
  productId: number;
  product: Product;
  isActive: boolean;
  isDelete: boolean;
  createdOn: Date;
  updatedOn: Date;
  deletedOn: Date;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;

}

