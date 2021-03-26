import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { Ingredient } from './schemas/Ingredient';
import { Recipe } from './schemas/Recipe';
import { ImageTitle } from './schemas/ImageTitle';
import { ImageFull } from './schemas/ImageFull';

const databaseURL = process.env.DATABASE_URL;

export default config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL
    },
    lists: createSchema({
      Ingredient,
      Recipe,
      ImageTitle,
      ImageFull
    }),
    ui: {
      isAccessAllowed: () => true,
    }
});