import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
// @ts-ignore
import { PanelBody, TextControl, SelectControl, Modal, __experimentalNumberControl as NumberControl, Button } from "@wordpress/components";
// @ts-ignore
import { useSelect } from '@wordpress/data';
// @ts-ignore
import { __ } from '@wordpress/i18n';
import usePostMeta from '../block-components/usePostMeta';
import { getMinPrice } from '../block-utilities/sg-blocks-helpers';
// @ts-ignore
import { useEntityProp } from '@wordpress/core-data';

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
  context: any;
}

const Edit: React.FC<EditProps> = ({ attributes, setAttributes, context }) => {
  const { text_before } = attributes;
  const { postId, postType } = context;

  const [prices, setPrices] = usePostMeta(postType, postId, 'price') as [Price[], any];

  console.log(postId, postType, prices);
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
            {getMinPrice(prices) ? text_before + ' ' + getMinPrice(prices) + prices[0].currency : 'Erreur dans les prix'}
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
