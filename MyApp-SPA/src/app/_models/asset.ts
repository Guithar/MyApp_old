
export interface Asset {
  assetId: number;
  maintScheduleId: number;
  tenantId: number;
  product: ProductInAsset;
  location: string;
  quantity: number;
  monthsInterval: number;
  maintScheduleName: string;
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

 interface ProductInAsset {
  id: number;
  name: string;
  description: string;
  productCategoryId: number;
  productCategoryName: string;
}