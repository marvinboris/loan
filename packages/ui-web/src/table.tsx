import { cn } from '@creditwave/utils';
import React from 'react';

export type TableField = {
  key: string;
  label: string;
  width?: number;
};

export type TableProps<T extends object> = {
  data: T[];
  fields: TableField[];
  selectable?: {
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  };
  loading?: boolean;
  error?: string;
};

export function Table<T extends object>(props: TableProps<T>) {
  return (
    <div
      className={cn(
        props.loading || props.error ? 'overflow-hidden' : 'overflow-auto',
        'self-stretch flex-1 border rounded-md relative'
      )}
    >
      <table className="table-auto border-collapse border">
        <thead>
          <tr className="*:px-2.5 *:py-1.5 *:bg-primary/20 text-center text-sm *:border">
            {props.selectable && (
              <th>
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      props.selectable?.setSelected(
                        e.target.checked
                          ? props.data.map(
                              (item) => (item as { id: number }).id
                            )
                          : []
                      )
                    }
                  />
                </div>
              </th>
            )}
            {props.fields.map(({ key, label, width }) => (
              <th key={'th-' + key}>
                <div style={{ width }}>{label}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.loading
            ? null
            : props.data.map((datum, i) => {
                const id = (datum as { id: number }).id;
                return (
                  <tr
                    key={'tr-' + i}
                    className="*:px-2.5 *:py-1.5 text-center text-sm *:border"
                  >
                    {props.selectable && (
                      <th>
                        <div>
                          <input
                            value={id}
                            type="checkbox"
                            checked={props.selectable.selected.includes(id)}
                            onChange={(e) =>
                              props.selectable?.setSelected((prev) =>
                                e.target.checked
                                  ? prev.concat(id)
                                  : prev.filter((item) => item !== id)
                              )
                            }
                          />
                        </div>
                      </th>
                    )}
                    {props.fields.map(({ key }) => (
                      <td key={'td-' + i + '-' + key}>
                        {datum[key as keyof T] as React.ReactNode}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>

      {props.loading ? (
        <div className="absolute w-full flex items-center justify-center py-10">
          <div className="size-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : null}

      {props.error ? (
        <div className="absolute w-full flex items-center justify-center py-10 text-red-600">
          {props.error}
        </div>
      ) : null}
    </div>
  );
}
