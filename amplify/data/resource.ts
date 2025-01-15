import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a
  .schema({
    Products: a.model({
      itemName: a.string(),
      quantity: a.float(),
      price: a.float(),
      total: a.float(),

      invoiceId: a.id(),
      invoice: a.belongsTo('Invoice', 'invoiceId'),
    }),

    Invoice: a.model({
      id: a.id(),
      identifier: a.string(),

      streetAddressFrom: a.string().required(),
      cityFrom: a.string().required(),
      postCodeFrom: a.string().required(),
      countryFrom: a.string().required(),

      clientName: a.string().required(),
      clientEmail: a.string().required(),
      clientStreetAddress: a.string().required(),
      clientCity: a.string().required(),
      clientPostcode: a.string().required(),
      clientCountry: a.string().required(),

      invoiceDate: a.date().required(),
      paymentTerms: a.string().required(),
      projectDescription: a.string(),

      itemList: a.hasMany('Products', 'invoiceId'),
    }),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
