import { cn } from '@creditwave/utils';
import { Formik } from 'formik';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Select } from './form';
import { Button } from './buttons';
import { ArrowsUpDownIcon, PlusIcon } from '@heroicons/react/24/outline';

export type FilterFieldSelect = {
  type: 'select';
  options: Record<string, string>;
};

export type FilterFieldInput = {
  type: 'date' | 'text' | 'number' | 'email';
};

export type FilterField = (FilterFieldSelect | FilterFieldInput) & {
  key: string;
  label: string;
  span?: number;
};

export type FilterProps = {
  onAdd?: () => void;
  exportable?: boolean;
  className?: string;
  fields: (FilterField | null)[];
};

export function Filter({ className, exportable, fields, onAdd }: FilterProps) {
  const [params, setParams] = useSearchParams();
  const [collapsed, setCollapsed] = React.useState(true);

  const initialValues = React.useMemo(() => {
    const record: Record<string, string | string[]> = {};

    params.forEach((value, key) => {
      if (record[key]) {
        if (Array.isArray(record[key])) {
          (record[key] as string[]).push(value);
        } else {
          record[key] = [record[key] as string, value];
        }
      } else {
        record[key] = value;
      }
    });

    return record;
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => {
        setParams(data);
      }}
    >
      {({ handleChange, handleSubmit, resetForm, values }) => (
        <div className="relative">
          <div
            className="cursor-pointer z-50 absolute right-0 rounded-full bg-gray-200 size-10 flex items-center justify-center"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <ArrowsUpDownIcon className="size-5" />
          </div>
          <form
            className={cn(
              'grid *:p-2.5 gap-2.5 transition-all',
              { 'opacity-0 h-0 overflow-hidden': collapsed },
              className
            )}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {fields.map((field, i) => {
              if (field === null) return <div key={'filter-' + i} />;

              return (
                <div
                  className={cn(field.span && 'col-span-2')}
                  key={'filter-' + field.key + '-' + i}
                >
                  {field.type === 'select' ? (
                    <Select
                      inline
                      id={field.key}
                      name={field.key}
                      options={field.options}
                      label={field.label + ':'}
                      value={values[field.key]}
                      labelClassName="w-1/3 text-right"
                      onChange={handleChange(field.key)}
                    />
                  ) : (
                    <Input
                      inline
                      id={field.key}
                      name={field.key}
                      type={field.type}
                      label={field.label + ':'}
                      value={values[field.key]}
                      labelClassName="w-1/3 text-right"
                      onChange={handleChange(field.key)}
                    />
                  )}
                </div>
              );
            })}

            <div className="flex justify-end self-center gap-2.5">
              <Button type="submit">Query</Button>

              <Button
                type="button"
                variant="outline"
                color="black"
                onClick={() => {
                  resetForm();
                  setParams({});
                }}
              >
                Reset
              </Button>

              {exportable ? (
                <Button type="button" color="disabled" className="text-red-600">
                  Export
                </Button>
              ) : null}

              {onAdd ? (
                <Button
                  type="button"
                  icon={PlusIcon}
                  onClick={onAdd}
                  color="disabled"
                  className="text-red-600"
                >
                  Create
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}
