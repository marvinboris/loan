import { useSearchParams } from 'react-router-dom';

export function Uploads() {
  const [search] = useSearchParams();
  const path = search.get('path');

  return (
    <img
      src={import.meta.env.VITE_API_URL + '../' + path}
      alt={'Pic: ' + path}
    />
  );
}
