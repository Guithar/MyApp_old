export interface MaintForList {
  assetId: number;
  maintScheduleId: number;
  tenantId: number;
  product: ProductforMaintList;
  location: string;
  quantity: number;
  monthsInterval: number;
  manufacturedDate: Date;
  lastRev: Date;
  nextRev: Date;
  lastResult: string;
  isActive: boolean;
  isDeleted: boolean;
  createdOn: Date;
  updatedOn: Date;
  deletedOn?: Date;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
}

 interface ProductforMaintList {
  id: number;
  name: string;
  description: string;
  productCategoryId: number;
  productCategoryName: string;
}
