/* eslint-disable @typescript-eslint/no-explicit-any */
const userSchema = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'Username',
        type: 'string',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email(),
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
    ],
  };
  
  export default userSchema;
  