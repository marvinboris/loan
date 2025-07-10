import { cn } from '@creditwave/utils';
import { Formik } from 'formik';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Select } from './form';
import { Button } from './buttons';
import { PlusIcon } from '@heroicons/react/24/outline';

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
  const [, setParams] = useSearchParams();

  const initialValues: Record<string, string> = {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => {
        setParams(data);
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <form
          className={cn('grid *:p-2.5 gap-2.5', className)}
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
                    labelClassName="w-1/3 text-right"
                  />
                ) : (
                  <Input
                    inline
                    id={field.key}
                    name={field.key}
                    type={field.type}
                    label={field.label + ':'}
                    labelClassName="w-1/3 text-right"
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
      )}
    </Formik>
  );
}
