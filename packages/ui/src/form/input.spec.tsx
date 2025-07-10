import { render } from '@testing-library/react';

import { FormInput } from './input';

describe('FormInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInput />);
    expect(baseElement).toBeTruthy();
  });
});
