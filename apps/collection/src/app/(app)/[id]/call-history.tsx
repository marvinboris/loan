import { Section, TextLine } from '@creditwave/ui';
import React from 'react';
import { useCollection } from '../../../contexts';

export default function Page() {
  const collection = useCollection();

  if (!collection) return null;
  return (
    <Section>
      {(collection.callHistory || []).map((item, index) => (
        <TextLine key={index} {...item} />
      ))}
    </Section>
  );
}
