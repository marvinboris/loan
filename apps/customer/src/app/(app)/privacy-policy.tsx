import { useTitle } from '@creditwave/hooks';
import { Info, Section } from '@creditwave/ui';

export default function Page() {
  useTitle('Privacy policy');

  return (
    <Section borderless={false}>
      {Object.entries({
        'First condition':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Second condition':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Third condition':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Fourth condition':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
        'Fifth condition':
          'This is a very detailed description of the first condition of the privacy policy so that the user knows what to except from the platform and what the platform expects from them.',
      }).map(([title, description], index) => (
        <Info key={index} title={title} description={description} />
      ))}
    </Section>
  );
}
