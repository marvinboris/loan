import { CollectionRecord, Section } from '@creditwave/ui';
import React from 'react';
import { useCollection } from '../../../contexts';

export default function Page() {
  const collection = useCollection();

  if (!collection) return null;
  return (
    <Section bodyStyle={{ gap: 8 }}>
      {(collection.mark || []).map((item, index) => (
        <CollectionRecord key={index} {...item} />
      ))}
    </Section>
  );
}
