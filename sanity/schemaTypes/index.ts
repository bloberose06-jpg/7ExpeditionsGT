import { tourType } from './tour'
import vlog from './vlog'
import { volcano } from './volcano' // 1. Importas el nuevo schema

export const schemaTypes = [tourType, vlog, volcano] // 2. Lo agregas aquí

export const schema = {
  types: [tourType, vlog, volcano], // 3. Y lo agregas aquí también
}
