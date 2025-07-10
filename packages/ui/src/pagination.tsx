import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from './buttons';

export type PaginationProps = {
  totalPages?: number;
};

export function Pagination({ totalPages = 1 }: PaginationProps) {
  const [params, setParams] = useSearchParams();

  const page = +(params.get('_page') || '1');

  const setPage = (page: number) =>
    setParams((params) => {
      params.set('_page', page.toString());
      return params;
    });

  const PageBtn = ({ to }: { to: number }) => {
    const isActive = to === page;

    return (
      <Button
        color="black"
        type="button"
        onClick={() => setPage(to)}
        variant={isActive ? 'solid' : 'clear'}
        className={isActive ? 'px-4' : undefined}
      >
        {to}
      </Button>
    );
  };

  const Dots = () => (
    <Button color="black" variant="clear" type="button">
      ...
    </Button>
  );

  return (
    <div className="flex gap-2 items-center">
      <Button
        color="black"
        variant="clear"
        icon={ArrowLeftIcon}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>

      <PageBtn to={1} />

      {totalPages >= 2 ? <PageBtn to={2} /> : null}

      {totalPages >= 3 ? <PageBtn to={3} /> : null}

      {totalPages > 4 ? <Dots /> : null}

      {page > 4 && page < totalPages - 3 ? <PageBtn to={page} /> : null}

      {totalPages >= 7 && page < totalPages - 3 ? <Dots /> : null}

      {totalPages >= 6 ? <PageBtn to={totalPages - 1} /> : null}

      {totalPages >= 7 ? <PageBtn to={totalPages} /> : null}

      <Button
        iconRight
        color="black"
        variant="clear"
        icon={ArrowRightIcon}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
