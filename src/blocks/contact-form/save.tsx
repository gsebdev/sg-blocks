import React from "react";

/**
 * Wordpress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Save = ({ attributes }) => {
  const { subtitle, title, ctaText, titleLevel, className, form_id } = attributes;
  const TitleTagName = 'h' + titleLevel as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const scriptContent = `if(!window.sgContactForms){window.sgContactForms = []}window.sgContactForms.push("${form_id}");`;

  return (
    <div className={`sg-contact-form txt-ctr ${className}`}>
      {!!title &&
        <TitleTagName>
          {title}
        </TitleTagName>
      }

      {!!subtitle &&
        <p>
          {subtitle}
        </p>
      }
      <form
        id={form_id}
        method="post"
      >
        <div className="i-grp">
          <label htmlFor="name">{__('Nom')}</label>
          <input type="text" placeholder={__('Votre nom et prénom...')} name="lastname" id="name" />
        </div>

        <div className="i-grp" data-test="true">
          <label htmlFor="firstname">{__('Prénom')}</label>
          <input tabIndex={-1} type="text" placeholder={__('Votre prénom ici...')} name="firstname" id="firstname" />
        </div>

        <div className="i-grp">
          <label htmlFor="email">{__('Email')}</label>
          <input type="text" name="email" placeholder={__('exemple@email.com')} id="email" />
        </div>

        <div className="i-grp">
          <label htmlFor="subject">{__('Sujet')}</label>
          <input type="text" placeholder={__('Titre de votre message')} name="subject" id="subject" />
        </div>

        <div className="i-grp">
          <label htmlFor="message">{__('Message')}</label>
          <textarea name="message" placeholder={__('écrivez votre message...')} rows={4} id="message" />
        </div>

        <button
          className="cta cta--arrow-right cta--with-border" type="submit"
        >
          {ctaText || __('Envoyer')}
        </button>
      </form>
      <div className="sg-icon-cancel" />
      <script>{scriptContent}</script>
    </div>
  );
};

export default Save;
