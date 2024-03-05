import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
// @ts-ignore
import { PanelBody, TextControl, SelectControl, TextareaControl, Modal, Button } from "@wordpress/components";
// @ts-ignore
import { useSelect, select } from '@wordpress/data';
import { ProviderName, generateReservationSrc, getMinPrice } from '../block-utilities/sg-blocks-helpers';
// @ts-ignore
import { __ } from '@wordpress/i18n';
import usePostMeta from '../block-components/usePostMeta';

interface EditProps {
  attributes: {
    reservationData: string;
    reservationSrc: string;
    provider: ProviderName;
    buttonText: string;
    phone: string;
    customPrice: string;
    className?: string;
  };


  setAttributes: (attributes: any) => void;
  context: {
    postType: string;
    postId: number;
  };
}

const Edit: React.FC<EditProps> = ({
  attributes: { provider, buttonText, phone, customPrice, className = '' },
  setAttributes
}) => {

  const postId = select('core/editor').getEditedPostAttribute('id')
  const postType = select('core/editor').getEditedPostAttribute('type')
  const [isOpen, setOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [booking, setBooking] = usePostMeta(postType, postId, 'booking');
  const [price] = usePostMeta(postType, postId, 'price');
  const [reservationData, setReservationData] = useState('');
  const [reservationDataError, setReservationDataError] = useState(false);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);

  useEffect(() => {
    if (booking !== null && booking !== undefined) {
      setReservationData(booking)
    }
    if (price) {
      setLowestPrice(getMinPrice(price))
    }

  }, [booking, price])

  const openModal = () => {
    setOpen(true)
    setModalLoading(true)
  };
  const closeModal = () => setOpen(false);
  const setSrc = (data: string, providerName: ProviderName) => {
    const src = generateReservationSrc(data, providerName)
    if (src || src === '') {
      setBooking(src);
    } else {
      setReservationDataError(true)
    }
  }

  const blockProps = useBlockProps();
  blockProps.className = blockProps.className.replace(className, '');


  const site = useSelect((select: (storeKey: string) => any) => {
    return select('core').getEntityRecord('root', 'site', undefined);
  }, []);

  let displayText = buttonText;
  const displayPhone = !phone ? site?.phone_number : phone

  if (!displayText) {

    if (!booking) {
      displayText = displayPhone ?? 'Entrez votre n° de Telephone...';
    } else {
      displayText = 'Réservez';
    }
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Options">

          <TextControl
            label="Texte personnalisé du bouton"
            type="text"
            placeholder={displayText}
            value={buttonText}
            onChange={(value: string) => setAttributes({ buttonText: value })}
          />
          <TextControl
            label="Numéro de téléphone personnalisé"
            type="text"
            placeholder={'+33 (0) 00 00 00 00'}
            value={phone}
            onChange={(value: string) => setAttributes({ phone: value })}
          />
          <TextControl
            label="Prix Mini personnalisé"
            type="text"
            placeholder={lowestPrice?.toString() ?? '0'}
            value={customPrice}
            onChange={(value: string) => setAttributes({ customPrice: value })}
          />
          <SelectControl
            label="Fournisseur de réservation"
            value={provider}
            onChange={(value: string) => {
              setAttributes({ provider: value })
              setSrc('', value as ProviderName);
            }}
            options={[
              { label: 'Activiteez', value: 'activiteez' },
              { label: 'Autre', value: 'other' },
            ]}
          />
          <TextareaControl
            label="Réservation"
            help={`Mettez le lien d'integration de la réservation ou le tag <iframe>${provider === 'activiteez' ? ' ou le nom exact de l\'activité sur activiteez' : ''}`}
            value={reservationData}
            onChange={(value: string) => setReservationData(value)}
            onBlur={() => {
              setSrc(reservationData, provider);

            }}
          />
          <Button variant="secondary" size={'small' as any} onClick={openModal}>
            Tester le lien
          </Button>
        </PanelBody>
      </InspectorControls>
      {isOpen && (
        <Modal title="Aperçu de réservation" onRequestClose={closeModal}>
          <div className={`preview-modal-reservation${modalLoading ? ' loading' : ''}`}>
            {modalLoading && <span className='loader' />}
            <iframe
              src={booking}
              className='loading'
              onLoad={() => { setModalLoading(false) }}
              width="100%"
              height="500"
            />
          </div>
        </Modal>
      )}
      {reservationDataError &&
        <Modal title="Erreur réservation" onRequestClose={() => setReservationDataError(false)}>
          <p>Le lien n'est pas valide</p>
        </Modal>}
      <div {...blockProps}>
        <div className={`sg-reservation p-3 my-2 txt-ctr ${className ?? ''}`}>
          <p className='f-s f-sb'>{!booking ? __('Envie de réserver ?') : __('Réservez directement en ligne !')}</p>
          <div className='py-2 f-xs color-secondary f-up'>à partir de <span className='f-sm f-sb'>{customPrice ? customPrice : lowestPrice ?? ''}€</span></div>
          <button className={`cta`}>
            {displayText}
          </button>
          {booking &&
            <>
              <div className='separator py-3 txt-ctr f-up f-xs color-grey-1'><span className='bg-color-bg px-2'>Ou</span></div>
              <p className='f-s'>{__('Appelez-nous')}</p>
              <p className='py-2 f-s f-sb'><span className='icon-phone no-deco color-secondary'>{displayPhone}</span></p>
            </>
          }
        </div>
      </div>

    </>
  );
};

export default Edit;
