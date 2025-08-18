import { Request } from 'express';

export const filter = (query: Request['query']) => {
  const { _page, _show } = query;

  const page = +((_page as string) || '1');
  const show = +((_show as string) || '100');

  const from = (page - 1) * show;
  const to = from + show - 1;

  return [from, to];
};
