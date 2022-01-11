import * as React from "react";
import * as ReactDOM from "react-dom";
import { IH5PWrapper } from "../../H5P";
import App from "../App";
import { Params } from "../types/H5P/Params";
import { H5P, addAbsolutePathToFiles } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher implements IH5PWrapper {
  private wrapper: HTMLElement;

  constructor(params: Params, contentId: string, extras?: unknown) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    console.info({ params, contentId, extras });

    const updatedTopMapItems = addAbsolutePathToFiles(
      params.topicMap.topicMapItems,
      contentId,
    );

    ReactDOM.render(<App items={updatedTopMapItems ?? []} />, this.wrapper);
  }

  attach([containerElement]: JQuery<HTMLElement>): void {
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-topic-map");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
