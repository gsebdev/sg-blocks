import React from "react";
import { InnerBlocks } from "@wordpress/block-editor";
import { getClassNames } from "../block-utilities/sg-blocks-helpers";

const Save = ({ attributes }) => {
  const { Tag } = attributes;
  
  let classList = [
    getClassNames(attributes),
    attributes.transition ? 'sg-transition' : '',
    attributes.className ?? ''
  ];

  classList = classList.filter(Boolean).map(item => item.trim());

  const className = classList.join(' ');

  return (
    <Tag
      className={className ? className : undefined }
      data-depth={attributes.depth}
    >
      <InnerBlocks.Content />
    </Tag>
  );
};

export default Save;
