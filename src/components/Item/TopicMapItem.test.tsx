import { render } from "@testing-library/react";
import * as React from "react";
import { TopicMapItem } from "./TopicMapItem";

describe(TopicMapItem.name, () => {
  it("should render", () => {
    const topicMapItem = render(
      <TopicMapItem
        backgroundImage={{ url: "", alt: "", aspectRatio: 1 }}
        title="Title"
        editAction={() => {
          /* Intentionally left empty */
        }}
      />,
    ).container;

    expect(topicMapItem.querySelector("button")).toBeTruthy();
  });
});
