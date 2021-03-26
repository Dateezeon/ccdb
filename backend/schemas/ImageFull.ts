import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import 'dotenv/config';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'recipe_full',
};

export const ImageFull = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source'
    }),
    altText: text(),
    recipe: relationship({
      ref: 'Recipe.imageFull'
    })
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'recipe']
    }
  }
})