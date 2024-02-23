import React from 'react';
// @ts-ignore
import { useBlockProps, InspectorControls, MediaUploadCheck, MediaUpload, RichText } from "@wordpress/block-editor";
// @ts-ignore
import { PanelBody, Button } from "@wordpress/components";
// @ts-ignore
import { select } from '@wordpress/data';
// @ts-ignore
import { __ } from '@wordpress/i18n';
import usePostMeta from '../block-components/usePostMeta';


interface Download {
  id: number;
  title: string;
}
interface File {
  id: number,
  filename: string,
  title: string
}
interface EditProps {
  isSelected: boolean;
  attributes: { className?: string, downloads?: Download[] };
  setAttributes: (attributes: any) => void;
}

const ALLOWED_MEDIA_TYPES = ['application/pdf', "application/document"];

const Edit: React.FC<EditProps> = ({ isSelected, attributes }) => {
  const postId = select('core/editor').getEditedPostAttribute('id')
  const postType = select('core/editor').getEditedPostAttribute('type')
  const [downloads, setDownloads] = usePostMeta(postType, postId, 'downloads');

  const blockProps = useBlockProps();
  blockProps.className = `${blockProps.className.replace(attributes.className, '')}${!downloads || downloads.length === 0 ? ' is-empty' : ''}`;

  const onSelectNewFile = (file) => {
    const newDownloads = downloads && Array.isArray(downloads) ? downloads : [];
    if (!newDownloads.some(item => item.id === file.id)) {
      setDownloads([...newDownloads, { id: file.id, title: file.title ? file.title : file.filename }])
    }
  }

  const removeDownload = (index: number) => {
    setDownloads([...downloads.slice(0, index), ...downloads.slice(index + 1)])
  }

  const onChangeDownloadTitle = (value: string, index: number) => {
    setDownloads([...downloads.slice(0, index), { ...downloads[index], title: value }, ...downloads.slice(index + 1)])
  }

  const onChangeFile = (file: File, index: number) => {
    setDownloads([...downloads.slice(0, index), { id: file.id, title: file.title ? file.title : file.filename }, ...downloads.slice(index + 1)])
  }
  return (
    <>
      <InspectorControls>
        <PanelBody title="Options">

        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div className={`sg-downloads${attributes.className ? ' ' + attributes.className : ''}`}>
          {!downloads || downloads.length === 0 ?
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectNewFile}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                  <Button
                    isPrimary
                    onClick={open}>
                    Ajouter un téléchargement
                  </Button>
                )}
              />
            </MediaUploadCheck> :
            <table className='sg-download__list color-primary f-s txt-ctr'>
              {downloads && downloads.map((download, i: number) => (
                <tr key={i} className='f-s'>
                  <td className='sg-icon-file-text'>{isSelected ?
                    <RichText
                      tagName="span"
                      className="sg-download__title"
                      label="Nom"
                      value={download.title}
                      onChange={(value: string) => onChangeDownloadTitle(value, i)}
                    /> :
                    <>{download.title ? download.title : ''}</>}
                  </td>
                  {isSelected &&
                    <>
                      <td>
                        <MediaUploadCheck>
                          <MediaUpload
                            onSelect={(file) => onChangeFile(file, i)}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            value={download.id}
                            render={({ open }) => (
                              <Button
                                isSecondary
                                icon="edit"
                                onClick={open} />
                            )}
                          />
                        </MediaUploadCheck>
                      </td>
                      <td>
                        <Button
                          isDestructive
                          onClick={() => removeDownload(i)}
                          icon="remove"
                        />
                      </td>
                    </>

                  }
                </tr>
              ))}
              {isSelected &&
                <tr>
                  <td colSpan={4} className='sg-download__add'>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={onSelectNewFile}
                        allowedTypes={ALLOWED_MEDIA_TYPES}
                        render={({ open }) => (
                          <Button
                            isPrimary
                            onClick={open}>
                            Ajouter un téléchargement
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>

                  </td>
                </tr>
              }
            </table>}
        </div>
      </div>
    </>
  );
};

export default Edit;
