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


interface Price {
  name: string;
  description: string;
  amount: number;
  currency: string;
}
interface EditProps {
  isSelected: boolean;
  attributes: { className: string };
}

const Edit: React.FC<EditProps> = ({ isSelected, attributes }) => {
  const postId = select('core/editor').getEditedPostAttribute('id')
  const postType = select('core/editor').getEditedPostAttribute('type')

  const [prices, setPrices] = usePostMeta(postType, postId, 'price');
  const [currency, setCurrency] = useState<string>('€');
  const [priceDataError, setPriceDataError] = useState(false);
  useEffect(() => {
    // try to convert old prices
    if (prices && Array.isArray(prices[0])) {
      const convertedPrices = prices.map(price => {
        if (Array.isArray(price)) {
          return { name: price[0], amount: parseInt(price[1]), currency: '€' }
        }
        return null;
      })
      setPrices(convertedPrices.filter(price => price !== null))
    }
  }, [])

  const handleChangePrices = (id: number, key: string, value: string | number) => {
    setPrices(prices.map((price, i) => (i === id ? { ...price, [key]: value } : price)))

  }

  const handleChangeCurrency = (value: string) => {
    setCurrency(value);
    setPrices(prices.map(price => ({ ...price, currency: value })))

  }
  const addNewPrice = () => {
    setPrices((prices || []).concat({ name: '', amount: 0, currency: currency }))
  }

  const removePrice = (i: number) => {
    setPrices(prices.filter((p, index) => index !== i))
  }

  const blockProps = useBlockProps();
  blockProps.className = blockProps.className.replace(attributes.className, '');


  return (
    <>
      <InspectorControls>
        <PanelBody title="Options">
          <SelectControl
            label="Devise"
            value={currency}
            onChange={handleChangeCurrency}
            options={[
              { label: '€ - Euro', value: '€' },
              { label: '$ - Dollar', value: '$' },
            ]}
          />
        </PanelBody>
      </InspectorControls>
      {priceDataError &&

        <Modal title="Erreur prix" onRequestClose={() => setPriceDataError(false)}>
          <p>Problème de récupération des prix sur le serveur</p>
        </Modal>
      }

      <div {...blockProps}>

        <div className={`sg-price${attributes.className ? ' ' + attributes.className : ''}`}>
          <h4>Prix</h4>
          <table className='sg-price__list color-primary f-s txt-ctr'>
            {prices && prices.map((price, i: number) => (
              <tr key={i} className='f-s'>
                <td>{isSelected ?
                  <TextControl
                    className="sg-price__input sg-price__name"
                    label="Nom"
                    value={price.name}
                    onChange={(name) => { handleChangePrices(i, 'name', name) }}
                  /> :
                  <>{price.name ? price.name : ''}</>}
                </td>
                <td className='f-sb'>
                  {isSelected ?
                    <NumberControl
                      className="sg-price__input sg-price__amount"
                      label={"Montant en " + currency}
                      value={price.amount}
                      min={0}
                      required={true}
                      spinControls='custom'
                      onChange={(amount) => { handleChangePrices(i, 'amount', amount) }}
                    /> :
                    <>
                      {price.amount}{price.currency}
                    </>
                  }
                </td>
                <td className='f-xxs'>
                  {isSelected ?
                    <TextControl
                      className="sg-price__input sg-price__description"
                      label="Commentaires"
                      value={price.description}
                      onChange={(description) => { handleChangePrices(i, 'description', description) }}
                    /> :
                    <>{price.description}</>
                  }
                </td>
                {isSelected &&
                  <td>
                    <Button
                      isDestructive
                      onClick={() => removePrice(i)}
                      icon="trash"
                    />
                  </td>
                }
              </tr>
            ))}
            {isSelected &&
              <tr>
                <td  colSpan={4} className='sg-price__add'>
                <Button
                    isPrimary
                    onClick={addNewPrice}>
                    Ajouter un tarif
                  </Button>
                </td>
              </tr>
            }
          </table>
        </div>
      </div>
    </>
  );
};

export default Edit;
