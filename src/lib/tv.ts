import { createTV, VariantProps } from 'tailwind-variants';

export const twMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [{ text: ['body', 'caption'] }],
    },
  },
};

export type { VariantProps };

export const tv = createTV({
  twMergeConfig,
});
