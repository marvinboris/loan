import { Picture, Section, TextLine } from '@creditwave/ui';
import React from 'react';
import { Image } from 'react-native';
import { useCollection } from '../../../contexts';

export default function Page() {
  const collection = useCollection();

  if (!collection) return null;
  return (
    <Section borderless={false} style={{ paddingVertical: 16 }}>
      <TextLine label="Name" value={collection.kyc.name} />
      <TextLine label="ID number" value={collection.kyc.documentId} />
      <TextLine label="Document type" value={collection.kyc.documentType} />
      <TextLine label="Marital status" value={collection.kyc.maritalStatus} />
      <TextLine label="Address" value={collection.kyc.address} />
      <TextLine label="Age" value={collection.kyc.birthdate} />
      <TextLine label="E-mail address" value={collection.kyc.email} />

      <Picture title="Selfie">
        {collection.kyc.selfie ? (
          <Image source={{ uri: collection.kyc.selfie }} />
        ) : null}
      </Picture>
      <Picture title="Front photo">
        {collection.kyc.frontPhoto ? (
          <Image source={{ uri: collection.kyc.frontPhoto }} />
        ) : null}
      </Picture>
      <Picture title="Back photo">
        {collection.kyc.backPhoto ? (
          <Image source={{ uri: collection.kyc.backPhoto }} />
        ) : null}
      </Picture>
    </Section>
  );
}
