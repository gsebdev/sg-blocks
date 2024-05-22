import React from "react";

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

const Save = ({ attributes }) => {
  const { subtitle, title, ctaText, titleLevel, className, form_id } = attributes;
  const TitleTagName = 'h' + titleLevel as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const scriptContent = `if(!window.sgContactForms){window.sgContactForms = []}window.sgContactForms.push("${form_id}");`;
  const containerClassName = [
    'sg-contact-form txt-ctr',
    className ?? ''
  ].filter(Boolean);

  const successMsg = attributes.successMsg && attributes.successMsg.length ? attributes.successMsg : __("Message sent successfully, we will take notice", 'sg-blocks-post-locale');
  const errorMsg = attributes.errorMsg && attributes.errorMsg.length ? attributes.errorMsg : __("An error occurred during message submission, please try again", 'sg-blocks-post-locale');
  const iconCode = attributes.iconCode && attributes.iconCode.length ? attributes.iconCode : "e902";

  return (
    <div className={containerClassName.join(' ')}>
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
        data-submit-error={errorMsg}
        data-submit-success={successMsg}
        data-submit-icon={String.fromCharCode(parseInt(iconCode.replace('\\', ''), 16))}
      >
        <div className="i-grp">
          <label htmlFor="name">{__('Last name', 'sg-blocks-post-locale')}</label>
          <input type="text" placeholder={__('Your name and first name...', 'sg-blocks-post-locale')} name="lastname" id="name" />
        </div>

        <div className="i-grp" data-test="true">
          <label htmlFor="firstname">{__('First name', 'sg-blocks-post-locale')}</label>
          <input tabIndex={-1} type="text" placeholder={__('Your first name here...', 'sg-blocks-post-locale')} name="firstname" id="firstname" />
        </div>

        <div className="i-grp">
          <label htmlFor="email">{__('Email', 'sg-blocks-post-locale')}</label>
          <input type="text" name="email" placeholder={__('example@email.com', 'sg-blocks-post-locale')} id="email" />
        </div>

        <div className="i-grp">
          <label htmlFor="subject">{__('Subject', 'sg-blocks-post-locale')}</label>
          <input type="text" placeholder={__('Title of your message', 'sg-blocks-post-locale')} name="subject" id="subject" />
        </div>

        <div className="i-grp">
          <label htmlFor="message">{__('Message', 'sg-blocks-post-locale')}</label>
          <textarea name="message" placeholder={__('write your message...', 'sg-blocks-post-locale')} rows={4} id="message" />
        </div>

        <button
          className="cta cta--primary" type="submit"
        >
          {ctaText || __('Submit', 'sg-blocks-post-locale')}
        </button>
      </form>
      <div className="sg-icon-cancel" />
      <script>{scriptContent}</script>
    </div>
  );
};

export default Save;
