import { tourType } from './tour'
import vlog from './vlog'
import { volcano } from './volcano'
import instagramPost from './instagramPost'
import { destination } from './destination' // 1. Import destination

export const schemaTypes = [tourType, vlog, volcano, instagramPost, destination] // 2. Add here

export const schema = {
  types: [tourType, vlog, volcano, instagramPost, destination], // 3. Add here
}
