import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from './buttons';
import { Select } from './form';

export type PaginationProps = {
  total?: number;
};

export function Pagination({ total: totalItems = 0 }: PaginationProps) {
  const [params, setParams] = useSearchParams();

  const page = +(params.get('_page') || '1');
  const show = +(params.get('_show') || '100');

  const total = totalItems ? Math.ceil(totalItems / show) : 1;

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
      <div>Displaying {page === total ? totalItems % show : show} of</div>

      <Select
        value={show}
        onChange={(e) =>
          setParams((prev) => {
            prev.set('_show', e.target.value);
            return prev;
          })
        }
        options={{ 10: '10', 25: '25', 50: '50', 100: '100', 500: '500' }}
      />

      <div>{totalItems || 0} items</div>

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

      {total >= 2 ? <PageBtn to={2} /> : null}

      {total >= 3 ? <PageBtn to={3} /> : null}

      {total > 4 ? <Dots /> : null}

      {page > 4 && page < total - 3 ? <PageBtn to={page} /> : null}

      {total >= 7 && page < total - 3 ? <Dots /> : null}

      {total >= 6 ? <PageBtn to={total - 1} /> : null}

      {total >= 7 ? <PageBtn to={total} /> : null}

      <Button
        iconRight
        color="black"
        variant="clear"
        icon={ArrowRightIcon}
        disabled={page === total}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
