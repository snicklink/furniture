
import React from 'react';
import { FurnitureType } from '../types';
import { ProceduralCouch } from './procedural/ProceduralCouch';
import { ProceduralDesk } from './procedural/ProceduralDesk';
import { ProceduralRug } from './procedural/ProceduralRug';
import { ProceduralBed } from './procedural/ProceduralBed';
import { ProceduralPlant } from './procedural/ProceduralPlant';

interface FurnitureItemProps {
  type: FurnitureType;
  variant: number;
  seed: number;
}

export const FurnitureItem: React.FC<FurnitureItemProps> = ({ type, variant, seed }) => {
  switch (type) {
    case 'couch':
      return <ProceduralCouch variant={variant} seed={seed} />;
    case 'desk':
      return <ProceduralDesk variant={variant} seed={seed} />;
    case 'rug':
      return <ProceduralRug variant={variant} seed={seed} />;
    case 'bed':
      return <ProceduralBed variant={variant} seed={seed} />;
    case 'plant':
      return <ProceduralPlant variant={variant} seed={seed} />;
    default:
      return null;
  }
};
