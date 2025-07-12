import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Example/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'card-clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Card',
    children: 'This is a default card with some content. It demonstrates the basic card functionality.',
  },
};

export const WithoutTitle: Story = {
  args: {
    children: 'This card doesn\'t have a title. Just content in a styled container.',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Card',
    size: 'small',
    children: 'This is a small card with compact spacing.',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Card',
    size: 'large',
    children: 'This is a large card with more generous spacing and larger text.',
  },
};

export const NoShadow: Story = {
  args: {
    title: 'No Shadow Card',
    shadow: false,
    children: 'This card doesn\'t have a shadow effect.',
  },
};

export const NoBorder: Story = {
  args: {
    title: 'No Border Card',
    bordered: false,
    children: 'This card doesn\'t have a border.',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    children: 'This card is clickable. Try clicking on it!',
    onClick: action('card-clicked'),
  },
};

export const WithButton: Story = {
  args: {
    title: 'Card with Button',
    children: (
      <div>
        <p>This card contains a button component inside it.</p>
        <Button label="Click me!" onClick={action('button-in-card-clicked')} />
      </div>
    ),
  },
};

export const RichContent: Story = {
  args: {
    title: 'Rich Content Card',
    size: 'large',
    children: (
      <div>
        <p>This card demonstrates rich content capabilities:</p>
        <ul>
          <li>Lists</li>
          <li>Multiple paragraphs</li>
          <li>Interactive elements</li>
        </ul>
        <p>You can put any React content inside a card!</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button label="Primary" primary onClick={action('primary-clicked')} />
          <Button label="Secondary" onClick={action('secondary-clicked')} />
        </div>
      </div>
    ),
  },
};