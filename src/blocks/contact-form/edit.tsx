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
            label={__('Success message after successful submission', 'sg-blocks')}
            value={successMsg}
            onChange={(value) => setAttributes({ successMsg: value })}
            placeholder={__("Message sent successfully, we will take notice", 'sg-blocks')}
          />
          <TextareaControl
            label={__('Error message after submission failure', 'sg-blocks')}
            value={errorMsg}
            onChange={(value) => setAttributes({ errorMsg: value })}
            placeholder={__("An error occurred during message submission, please try again", 'sg-blocks')}
          />
          <TextControl
            label={__('Icon code', 'sg-blocks')}
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

      <div {...useBlockProps({ className: "sg-contact-form txt-ctr" })}>
        <RichText
          tagName={('h' + titleLevel) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
          value={title}
          onChange={(value) => { setAttributes({ title: value }) }}
          placeholder={__('Form title', 'sg-blocks')}
        />
        <RichText
          tagName="p"
          value={subtitle}
          onChange={(value) => setAttributes({ subtitle: value })}
          placeholder={__('Form subtitle', 'sg-blocks')}
        />
        <form method="post">


          <div className="i-grp">
            <label htmlFor="name">{__('Last name', 'sg-blocks')}</label>
            <input disabled type="text" placeholder={__('Your name and first name...', 'sg-blocks')} name="lastname" id="name" />
          </div>

          <div className="i-grp" data-test="true">
            <label htmlFor="firstname">{__('First name', 'sg-blocks')}</label>
            <input disabled tabIndex={-1} type="text" placeholder={__('Your first name here...', 'sg-blocks')} name="firstname" id="firstname" />
          </div>

          <div className="i-grp">
            <label htmlFor="email">{__('Email', 'sg-blocks')}</label>
            <input disabled type="text" name="email" placeholder={__('example@email.com', 'sg-blocks')} id="email" />
          </div>

          <div className="i-grp">
            <label htmlFor="subject">{__('Subject', 'sg-blocks')}</label>
            <input disabled type="text" placeholder={__('Message title', 'sg-blocks')} name="subject" id="subject" />
          </div>

          <div className="i-grp">
            <label htmlFor="message">{__('Message', 'sg-blocks')}</label>
            <textarea disabled name="message" placeholder={__('Write your message...', 'sg-blocks')} rows={4} id="message" />
          </div>
          <RichText
            tagName="button"
            className="cta cta--primary"
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
