export interface SidebarLink {
    imgURL: string;
    route: string;
    label: string;
}

export interface ProductLink {
  route: string;
  label: string;
}


export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    is_featured: boolean;
    created_at: Date;
    updated_at: Date;
    sizeId:number;
    variantId: number;
    categoryId: number;
  };

  export type Category = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

 export type Size = {
  id: number;
  name: string;
  value: string;
  created_at: Date;
  updated_at: Date;
}

export type Variant = {
  id: number;
  name: string;
  value: string;
  created_at: Date;
  updated_at: Date;
}