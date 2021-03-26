import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';

export default function Recipe({ recipe }) {
  return (
    <ItemStyles>
      <Link href={`/recipe/${recipe.id}`}>
        <img
          src={recipe?.imageTitle?.image?.publicUrlTransformed}
          alt={recipe.name}
        />
      </Link>
    </ItemStyles>
  )
};