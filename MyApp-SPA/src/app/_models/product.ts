export interface Product {

  id: number;
  tenantId: number;
  name: string;
  description: string;
  productCategoryId: number;
  productCategoryName: string;
  productCategoryDescription: string;
  isActive: boolean;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  deletedOn?: any;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
}
