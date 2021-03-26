import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import 'dotenv/config';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'recipe_title',
};

export const ImageTitle = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source'
    }),
    altText: text(),
    recipe: relationship({
      ref: 'Recipe.imageTitle'
    })
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'recipe']
    }
  }
})