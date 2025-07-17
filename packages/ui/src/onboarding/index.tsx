import React from 'react';
import { View, Pressable } from 'react-native';
import { Typography } from '../typography';

// Type des props pour le composant
interface OnboardingCarouselProps {
  onFinish: () => void;
  doneLabel?: string;
}

export const Onboarding: React.FC<OnboardingCarouselProps> = ({
  onFinish = () => console.log('Finish'),
}) => {
  const handleFinish = () => {
    onFinish();
  };

  return (
    <View>
      <Typography>Onboarding</Typography>
    </View>
  );
};
