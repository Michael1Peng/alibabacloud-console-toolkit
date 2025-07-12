import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    onClick: action('button-click'),
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    onClick: action('button-click'),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
    onClick: action('button-click'),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
    onClick: action('button-click'),
  },
};

export const Disabled: Story = {
  args: {
    primary: true,
    label: 'Button',
    disabled: true,
    onClick: action('button-click'),
  },
};

export const CustomBackground: Story = {
  args: {
    primary: true,
    label: 'Button',
    backgroundColor: '#ff6b6b',
    onClick: action('button-click'),
  },
};