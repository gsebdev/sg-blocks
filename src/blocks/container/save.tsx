import React from "react";
import { InnerBlocks } from "@wordpress/block-editor";
import { getClassNames } from "../block-utilities/sg-blocks-helpers";

const Save = ({ attributes }) => {
  const { Tag } = attributes;
  const className = getClassNames(attributes);
  
  return (
    <Tag
      className={
        className || attributes.className
          ? `${className}${
              attributes?.className ? " " + attributes.className : ""
            }`
          : undefined
      }
    >
      <InnerBlocks.Content />
    </Tag>
  );
};

export default Save;
