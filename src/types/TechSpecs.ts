import { Properties } from './Properties';

export interface TechSpecs extends Properties {
  'camera': string;
  'zoom': string;
  'cell': string[];
}
