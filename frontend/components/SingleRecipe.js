import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const ProductStyles = styled.div`
  text-align: center;
`;

const SINGLE_RECIPE_QUERY = gql`
  query SINGLE_RECIPE_QUERY($id: ID!){
    Recipe(where: { id: $id}) {
      name
      imageFull {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleRecipe({ id }) {
  const { data, loading, error } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: {
      id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage  error={error} />;
  const { Recipe } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Cooking Comically DB | {Recipe.name}</title>
      </Head>
      <img
        src={Recipe.imageFull.image.publicUrlTransformed}
        alt={Recipe.imageFull.altText}
      />
    </ProductStyles>
  )
}