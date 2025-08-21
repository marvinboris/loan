import { Picture, Section, TextLine } from '@creditwave/ui';
import React from 'react';
import { View } from 'react-native';
import { useCollection } from '../../../contexts';

export default function Page() {
  const collection = useCollection();

  const uploadsUrl = React.useMemo(
    () => (process.env.EXPO_PUBLIC_API_URL as string).replace('/api', '/'),
    []
  );

  if (!collection) return null;
  return (
    <Section borderless={false} style={{ paddingVertical: 16 }}>
      <TextLine
        label="Name"
        value={[collection.kyc.first_name, collection.kyc.last_name]
          .filter(Boolean)
          .join(' ')}
      />
      {/* <TextLine label="ID number" value={collection.kyc.documentId} /> */}
      {/* <TextLine label="Document type" value={collection.kyc.documentType} /> */}
      {/* <TextLine label="Marital status" value={collection.kyc.maritalStatus} /> */}
      <TextLine label="Address" value={collection.kyc.location} />
      <TextLine label="Birthdate" value={collection.kyc.birthdate} />
      <TextLine
        label="Emergency number #1"
        value={collection.kyc.emergency_number_1}
      />
      {collection.kyc.emergency_number_2 ? (
        <TextLine
          label="Emergency number #2"
          value={collection.kyc.emergency_number_2}
        />
      ) : null}

      <View style={{ gap: 8 }}>
        <Picture title="Selfie" uri={uploadsUrl + collection.kyc.selfie} />
        <Picture
          title="Front photo"
          uri={uploadsUrl + collection.kyc.front_photo}
        />
        <Picture
          title="Back photo"
          uri={uploadsUrl + collection.kyc.back_photo}
        />
      </View>
    </Section>
  );
}
