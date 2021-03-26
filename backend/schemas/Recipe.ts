import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Recipe = list({
  fields: {
    name: text({
      isRequired: true
    }),
    ingredient: relationship({
      ref: 'Ingredient',
      many: true
    }),
    imageTitle: relationship({
      ref: 'ImageTitle.recipe',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: {
          fields: ['image', 'altText']
        },
        inlineEdit: {
          fields: ['image', 'altText']
        }
      }
    }),
    imageFull: relationship({
      ref: 'ImageFull.recipe',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: {
          fields: ['image', 'altText']
        },
        inlineEdit: {
          fields: ['image', 'altText']
        }
      }
    })
  },
});