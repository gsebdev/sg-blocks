import React, { useEffect } from "react";

/**
 * Wordpress dependencies
 */
import {
  BlockControls,
  RichText,
  useBlockProps,
  // @ts-ignore
  HeadingLevelDropdown,
  InspectorControls
} from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, TextareaControl } from "@wordpress/components";


const Edit = ({ attributes, setAttributes }) => {

  const { title, subtitle, titleLevel, ctaText, form_id, successMsg, errorMsg, iconCode } = attributes

  useEffect(() => {
    if (!form_id) {
      setAttributes({ form_id: `sg-form-${Math.random().toString(36).substring(5, 12)}` })
    }
  }, []);
  
  return (
    <>
    <InspectorControls>
      <PanelBody>
        <TextareaControl
          label={__('Message après envoi réussi')}
          value={successMsg}
          onChange={(value) => setAttributes({ successMsg: value })}
          placeholder="Message envoyé avec succès, nous allons en prendre connaissance"
          />
          <TextareaControl
          label={__('Message après erreur')}
          value={errorMsg}
          onChange={(value) => setAttributes({ errorMsg: value })}
          placeholder="Une erreur s'est produite dans l'envoi du message, merci de réessayer"
          />
          <TextControl
          label={__('Code icône')}
          value={iconCode}
          onChange={(value) => setAttributes({ iconCode: value })}
          placeholder="e902"
          />
      </PanelBody>
    </InspectorControls>
      <BlockControls>
        <HeadingLevelDropdown
          value={titleLevel}
          onChange={(newLevel) =>
            setAttributes({ titleLevel: newLevel })
          }
        />

      </BlockControls>

      <div {...useBlockProps({ className: "sg-contact-form txt-ctr"})}>
        <RichText
          tagName={('h' + titleLevel) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
          value={title}
          onChange={(value) => { setAttributes({ title: value }) }}
          placeholder="Titre du formulaire"
        />
        <RichText
          tagName="p"
          value={subtitle}
          onChange={(value) => setAttributes({ subtitle: value })}
          placeholder="Sous-titre du formulaire"
        />
        <form method="post">


          <div className="i-grp">
            <label htmlFor="name">{__('Nom')}</label>
            <input disabled type="text" placeholder={__('Votre nom et prénom...')} name="lastname" id="name" />
          </div>

          <div className="i-grp" data-test="true">
            <label htmlFor="firstname">{__('Prénom')}</label>
            <input disabled tabIndex={-1} type="text" placeholder={__('Votre prénom ici...')} name="firstname" id="firstname" />
          </div>

          <div className="i-grp">
            <label htmlFor="email">{__('Email')}</label>
            <input disabled type="text" name="email" placeholder={__('exemple@email.com')} id="email" />
          </div>

          <div className="i-grp">
            <label htmlFor="subject">{__('Sujet')}</label>
            <input disabled type="text" placeholder={__('Titre de votre message')} name="subject" id="subject" />
          </div>

          <div className="i-grp">
            <label htmlFor="message">{__('Message')}</label>
            <textarea disabled name="message" placeholder={__('Écrivez votre message...')} rows={4} id="message" />
          </div>

          <RichText
            tagName="button"
            className="cta cta--arrow-right cta--with-border"
            value={ctaText}
            onChange={(value) => setAttributes({ ctaText: value })}
            placeholder="Texte du bouton"
          />

        </form>
        <div className="sg-icon-cancel" />
      </div>
    </>
  )
};

export default Edit;
