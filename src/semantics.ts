import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";
import { itemDialog, itemPosition } from "./utils/semantics.util";

export const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "Topic map editor",
    name: "topicMap",
    type: H5PFieldType.Group,
    widget: "topicMap",
    importance: "high",
    fields: [
      {
        label: "Topic map items",
        name: "topicMapItems",
        type: H5PFieldType.List,
        entity: "Topic map item",
        importance: "low",
        field: {
          label: "Item",
          name: "topicMapItem",
          importance: "low",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "id",
              label: "Id",
              type: H5PFieldType.Text,
              widget: "none",
            },

            ...itemPosition,

            {
              label: "Index",
              description: "The label is shown on top of the background image",
              name: "label",
              type: H5PFieldType.Number,
              optional: true,
            },
            {
              label: "Label",
              description: "The label is shown on top of the background image",
              name: "label",
              type: H5PFieldType.Text,
            },
            {
              label: "Description",
              description:
                "The description is shown on top of the background image, below the label",
              name: "description",
              type: H5PFieldType.Text,
              optional: true,
            },
            {
              label: "Background image",
              name: "backgroundImage",
              type: H5PFieldType.Image,
            },

            ...itemDialog,
          ],
        },
      },
      {
        label: "Arrows",
        name: "arrows",
        type: H5PFieldType.List,
        entity: "arrowItem",
        field: {
          label: "Arrow",
          name: "arrow",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "id",
              label: "Id",
              type: H5PFieldType.Text,
              widget: "none",
            },

            ...itemPosition,

            {
              label: "Index",
              description: "The label is shown on top of the background image",
              name: "label",
              type: H5PFieldType.Number,
              optional: true,
            },
            {
              label: "Show start arrow-head",
              name: "showStartHead",
              type: H5PFieldType.Boolean,
              widget: "none",
              default: false,
            },
            {
              label: "Show end arrow-head",
              name: "showEndHead",
              type: H5PFieldType.Boolean,
              widget: "none",
              default: true,
            },

            ...itemDialog,
          ],
        },
      },
    ],
  },
  {
    name: "behaviour",
    type: H5PFieldType.Group,
    label: "Behavioral settings",
    importance: "low",
    fields: [],
  },
  {
    name: "l10n",
    type: H5PFieldType.Group,
    common: true,
    label: "Localize",
    fields: [],
  },
];
