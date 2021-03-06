/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DialogExternalResources } from "./ExternalResources";

export default {
  title: "molecules/Dialog Content/Dialog External Resources",
  component: DialogExternalResources,
} as ComponentMeta<typeof DialogExternalResources>;

const Template: ComponentStory<typeof DialogExternalResources> = args => (
  <div style={{ height: "2000px", width: "1000px" }}>
    <DialogExternalResources {...args} />
  </div>
);

export const ExternalResource = Template.bind({});

ExternalResource.args = {
  url: "https://www.ndla.no",
  label: "External example",
};
