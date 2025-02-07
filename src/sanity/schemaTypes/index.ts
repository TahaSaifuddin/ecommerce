import { type SchemaTypeDefinition } from 'sanity';
import { ContactInfo } from './ContactInfo';
import shopSchema from './shop';
import userSchema from './user';
import paymentSchema from './payment';
import  orderSchema  from './order';




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ContactInfo, shopSchema, paymentSchema, orderSchema, userSchema],
}
