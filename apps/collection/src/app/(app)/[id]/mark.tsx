import { CollectionLoan, Section } from '@creditwave/ui';
import { router } from 'expo-router';
import React from 'react';
import { useCollection } from '../../../contexts';

export default function Page() {
  const collection = useCollection();

  if (!collection) return null;
  return (
    <Section>
      {(collection.mark || []).map((item, index) => (
        <CollectionLoan
          key={index}
          {...item}
          onPress={(item) => router.push('/' + item.loanNumber)}
        />
      ))}
    </Section>
  );
}
