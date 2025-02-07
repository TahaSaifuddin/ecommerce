import { defineField, defineType } from 'sanity';

export const ContactInfo = defineType({
  name: "contactInfo",
  type: "document",
  title: "Contact Information",
  fields: [
    defineField({
      name: "address",
      type: "string",
      title: "Address",
    }),
    defineField({
      name: "phoneMobile",
      type: "string",
      title: "Mobile Phone",
    }),
    defineField({
      name: "phoneHotline",
      type: "string",
      title: "Hotline Phone",
    }),
    defineField({
      name: "workingTimeWeekdays",
      type: "string",
      title: "Working Time (Weekdays)",
    }),
    defineField({
      name: "workingTimeWeekends",
      type: "string",
      title: "Working Time (Weekends)",
    }),
  ],
});
