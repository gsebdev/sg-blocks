import React from 'react';
// @ts-ignore
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
// @ts-ignore
import { select } from '@wordpress/data';
import usePostMeta from '../block-components/usePostMeta';

interface EditProps {
  isSelected: boolean
  attributes: any
  setAttributes: any
  clientId: string
}

const Edit: React.FC<EditProps> = () => {
  const postId = select('core/editor').getEditedPostAttribute('id');
  const postType = select('core/editor').getEditedPostAttribute('type');
  // set the working entry state
  const [info, setInfo] = usePostMeta(postType, postId, 'info');
  const blockProps = useBlockProps();
  return (
    <>
      <div {...blockProps}>
        <InnerBlocks
          template={
            [
              [
                'sg/container',
                {
                  columns: { default: 2 },
                  layout: 'grid',
                  gap: { default: 2 }
                },
                  info.map((entry: any) => {
                    return ['sg/info', {info_id: entry.id}];
                  })
              ]
            ]
          }
          allowedBlocks={["sg/container"]}
        />
      </div>
    </>
  );
};

export default Edit;
