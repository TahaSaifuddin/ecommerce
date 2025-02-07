/* eslint-disable @typescript-eslint/no-explicit-any */
const paymentSchema = {
    name: 'payment',
    title: 'Payment',
    type: 'document',
    fields: [
      {
        name: 'orderId',
        title: 'Order ID',
        type: 'string',
      },
      {
        name: 'amount',
        title: 'Amount',
        type: 'number',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
      },
      {
        name: 'method',
        title: 'Method',
        type: 'string',
        options: {
          list: [
            { title: 'Online Payment', value: 'online' },
            { title: 'Cash on Delivery', value: 'cod' },
          ],
        },
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
      },
    ],
  };
  
  export default paymentSchema;
  