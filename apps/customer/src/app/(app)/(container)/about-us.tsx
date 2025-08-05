import { useTitle } from '@creditwave/hooks';
import { Info, Section } from '@creditwave/ui';

export default function Page() {
  useTitle('About us');

  return (
    <Section>
      {Object.entries({
        'First information':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Second information':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Third information':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Fourth information':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Fifth information':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
      }).map(([title, description], index) => (
        <Info key={index} flat title={title} description={description} />
      ))}
    </Section>
  );
}
