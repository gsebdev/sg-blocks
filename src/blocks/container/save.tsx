import React from "react";
import { InnerBlocks } from "@wordpress/block-editor";
import { getClassNames } from "../block-utilities/sg-blocks-helpers";

const Save = ({ attributes }) => {
  const { Tag } = attributes;
  
  let classList = [
    getClassNames(attributes),
    attributes.transition && !attributes.isParallaxActive ? 'sg-transition' : '',
    attributes.isParallaxActive ? 'sg-parallax-container' : '',
    attributes.className ?? ''
  ];

  classList = classList.filter(Boolean).map(item => item.trim());

  const className = classList.join(' ');

  return (
    <Tag
      className={className ? className : undefined }
      data-speed={ attributes.speed }
    >
      <InnerBlocks.Content />
    </Tag>
  );
};

export default Save;
