import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Recipe from './Recipe';
import { perPage } from '../config';

export const ALL_RECIPES_QUERY = gql`
  query ALL_RECIPES_QUERY($skip: Int = 0, $first: Int) {
    allRecipes(first: $first, skip: $skip) {
      id
      name
      ingredient {
        id
        name
      }
      imageTitle {
        id
        image {
          publicUrlTransformed
        }
      }
      imageFull {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const RecipesListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;


export default function Recipes({ page }) {
  const { data, error, loading } = useQuery(ALL_RECIPES_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <RecipesListStyles>
        {data.allRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </RecipesListStyles>
    </div>
  )
}