import { useRouter } from 'next/dist/client/router';
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';


const SEARCH_RECIPES_QUERY = gql`
  query SEARCH_RECIPES_QUERY($searchTerm: String!) {
    searchTerms: allRecipes(
      where: {
        OR: [
          {
            name_contains_i: $searchTerm
          }
          {
            ingredient_some: {
              name_contains_i: $searchTerm
            }
          }
        ]
      }
    ) {
      id
      name
      imageTitle {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findRecipes, { loading, data, error }] = useLazyQuery(SEARCH_RECIPES_QUERY, {
    fetchPolicy: 'no-cache'
  });
  const items = data?.searchTerms || [];
  const findRecipesDebounce = debounce(findRecipes, 500);

  resetIdCounter();

  const {
    isOpen,
    inputValue,
    highlightedIndex,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps
  } = useCombobox({
    items,
    onInputValueChange() {
      findRecipesDebounce({
        variables: {
          searchTerm: inputValue
        }
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/recipe/${selectedItem.id}`
      })
    },
    itemToString: item => item?.name || ''
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input {...getInputProps({
          type: 'search',
          placeholder: 'Search for a Recipe',
          id: 'search',
          className: loading ? 'loading' : ''
        })} />
        <DropDown {...getMenuProps()}>
          {isOpen && items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.imageTitle.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
          {isOpen && !items.length && !loading && (
            <DropDownItem>Sorry, no items found for {inputValue}</DropDownItem>
          )}
        </DropDown>
      </div>
    </SearchStyles>
  )
}