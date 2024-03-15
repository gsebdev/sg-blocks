import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
// @ts-ignore
import { PanelBody, TextControl, SelectControl, Modal, __experimentalNumberControl as NumberControl, Button } from "@wordpress/components";
// @ts-ignore
import { select } from '@wordpress/data';
// @ts-ignore
import { __ } from '@wordpress/i18n';
import usePostMeta from '../block-components/usePostMeta';
import { getMinPrice } from '../block-utilities/sg-blocks-helpers';


interface Price {
  name: string;
  description: string;
  amount: number;
  currency: string;
}
interface EditProps {
  isSelected: boolean;
  attributes: { className: string, text_before: string };
  setAttributes: (attributes: any) => void;
}

const Edit: React.FC<EditProps> = ({ isSelected, attributes, setAttributes }) => {
  const { text_before } = attributes;
  const postId = select('core/editor').getEditedPostAttribute('id')
  const postType = select('core/editor').getEditedPostAttribute('type')

  const [prices] = usePostMeta(postType, postId, 'price') as [Price[]];

  const blockProps = useBlockProps({
    className: "sg-mini-price"
  });


  return (
    <>
      <InspectorControls>
        <PanelBody title="Options">
          <TextControl
            label={__("Modifier le texte avant le prix")}
            value={text_before}
            onChange={(newVal) => setAttributes({ text_before: newVal })}
          />
        </PanelBody>
      </InspectorControls>
      <p {...blockProps}>
        {Array.isArray(prices) && prices.length > 0 ?
          <>
            {text_before + ' ' + getMinPrice(prices) + prices[0].currency}
          </> :
          <div>
            {__('Aucun prix disponible')}
          </div>
        }
      </p>
    </>
  );
};

export default Edit;
