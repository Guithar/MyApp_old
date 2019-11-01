
export interface Asset {
  id: number;
  clientId: number;
  clientUserId: number;
  clientCompany: string;
  name: string;
  description: string;
  location: string;
  quantity: number;
  isActive: boolean;
  manufacturedDate: string;
  installedDate: string;
  productId: number;
  productName: string;
}
