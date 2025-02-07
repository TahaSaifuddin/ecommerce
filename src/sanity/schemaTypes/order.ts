const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customer',
      title: 'Customer Details',
      type: 'object',
      fields: [
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'streetAddress', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'country', type: 'string' },
      ]
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'product',
            type: 'reference',
            to: [{ type: 'product' }]
          },
          { name: 'quantity', type: 'number' },
          { name: 'size', type: 'string' },
          { name: 'color', type: 'string' }
        ]
      }]
    },
    { name: 'subtotal', type: 'number' },
    { name: 'paymentMethod', type: 'string' },
    { name: 'status', type: 'string' },
  ]
}
export default orderSchema