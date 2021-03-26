import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Recipes from '../../components/Recipes';

export default function RecipePage() {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <>
      <Pagination page={page || 1} />
      <Recipes page={page || 1} />
    </>
  );
}