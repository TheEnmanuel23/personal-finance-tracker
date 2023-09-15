import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = () => {
  return (
    <div>
      <Typography as="h1">Typography h1</Typography>
      <Typography as="h2">Typography h2</Typography>
      <Typography as="h3">Typography h3</Typography>
      <Typography as="h4">Typography h4</Typography>
      <Typography as="h5">Typography h5</Typography>
      <Typography as="h6">Typography h6</Typography>
      <Typography>Paragraph</Typography>
    </div>
  );
};
