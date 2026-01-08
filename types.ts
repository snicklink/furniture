
export type FurnitureType = 'couch' | 'desk' | 'rug' | 'bed' | 'plant';

export interface FurnitureVariant {
  id: number;
  name: string;
  description: string;
  seed: number;
}

export interface FurnitureData {
  type: FurnitureType;
  variants: FurnitureVariant[];
}
