import { tourType } from './tour'
import vlog from './vlog'
import { volcano } from './volcano'
import instagramPost from './instagramPost'

export const schemaTypes = [tourType, vlog, volcano, instagramPost]

export const schema = {
  types: [tourType, vlog, volcano, instagramPost],
}
