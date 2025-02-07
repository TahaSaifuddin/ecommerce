/* eslint-disable @typescript-eslint/no-explicit-any */

const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bedroom', value: 'bedroom'},
          {title: 'Hallway', value: 'hallway'},
          {title: 'Living Room', value: 'livingRoom'},
          {title: 'Dining Room', value: 'diningRoom'},
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    },
    {
      name: 'isHero',
      title: 'Hero Product',
      type: 'boolean',
      description: 'Show in hero section',
      initialValue: false,
    },
    {
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show in featured section',
      initialValue: false,
    },
    {
      name: 'isTopPick',
      title: 'Top Pick Product',
      type: 'boolean',
      description: 'Show in top picks section',
      initialValue: false,
    },
    {
      name: 'isSpotlight',
      title: 'Spotlight Product',
      type: 'boolean',
      description: 'Show in spotlight section',
      initialValue: false,
    },
  ],
}

export default productSchema;