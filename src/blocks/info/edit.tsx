import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useBlockProps, InspectorControls, RichText, HeadingLevelDropdown, BlockControls } from "@wordpress/block-editor";
// @ts-ignore
import { SelectControl, Button, PanelBody, PanelRow, TextControl } from "@wordpress/components";
// @ts-ignore
import { select, subscribe } from '@wordpress/data';
// @ts-ignore
import { __ } from '@wordpress/i18n';
import usePostMeta from '../block-components/usePostMeta';
interface InfoEntry {
  id?: string;
  title?: string;
  content?: {
    text?: string;
    icon?: string;
  };
}

interface EditProps {
  isSelected: boolean;
  attributes: { className?: string, info_id?: string, level?: number };
  setAttributes: (attributes: any) => void;
  clientId: string;
}

const Edit: React.FC<EditProps> = ({ isSelected, attributes, setAttributes, clientId }) => {
  const { info_id, level } = attributes;
  const [ contentIdSelected, setContentIdSelected ] = useState<number|null>(null);
  const postId = select('core/editor').getEditedPostAttribute('id');
  const postType = select('core/editor').getEditedPostAttribute('type');
  // set the working entry state
  const [info, setInfo] = usePostMeta(postType, postId, 'info');
  let currentEntryIndex = info?.findIndex((entry: InfoEntry) => entry.id === info_id) ?? null;
  currentEntryIndex = currentEntryIndex === -1 ? null : currentEntryIndex;
  const { title = '', content = ''} = currentEntryIndex !== null ? info[currentEntryIndex] ?? {} : {};


  // create the info if it doesn't exists
  useEffect(() => {
    if (info_id && currentEntryIndex === null) {
      if(info && Array.isArray(info)) {
        setInfo([...info, { id: info_id }]);
      } else {
        setInfo([{ id: info_id }]);
      }
      
    }
  }, [info_id]);


  //delete info if block is deleted and info is empty
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      const block = select('core/block-editor').getBlock(clientId);
      if (!block && !title && !content) {
        removeInfo();
      }
    })
    return () => {
      unsubscribe();
    }
  }, [clientId, info]);

  const titleTagName = `h${level}`;

  const blockProps = useBlockProps();
  blockProps.className = `${blockProps.className.replace(attributes.className ?? '', '')}${!info_id || currentEntryIndex === null ? ' is-empty' : ''}`;

  const onTitleChange = (value: string) => {
    if (currentEntryIndex === null) return;
    setInfo([...info.slice(0, currentEntryIndex), { ...info[currentEntryIndex], title: value }, ...info.slice(currentEntryIndex + 1)]);
  };
  const onContentItemChange = (value: string, index: number, property: string) => {
    if (currentEntryIndex === null) return;
    const newContent = [
      ...content.slice(0, index), 
      {...content[index], [property]: value }, 
      ...content.slice(index + 1)
    ];
    setInfo([...info.slice(0, currentEntryIndex), { ...info[currentEntryIndex], content: newContent }, ...info.slice(currentEntryIndex + 1)]);
  };

  const addNewContentItem = () => {
    if (currentEntryIndex === null) return;
    setInfo([...info.slice(0, currentEntryIndex), { ...info[currentEntryIndex], content: [...content, ''] }, ...info.slice(currentEntryIndex + 1)]);
  };
  const removeContentItem = (index: number) => {
    if (currentEntryIndex === null) return;
    const newContent = [...content.slice(0, index), ...content.slice(index + 1)];
    setInfo([...info.slice(0, currentEntryIndex), { ...info[currentEntryIndex], content: newContent }, ...info.slice(currentEntryIndex + 1)]);
  };

  const removeInfo = (remove_id?: string) => {
    const deleteIndex = info.findIndex(entry => entry.id === (remove_id ?? info_id));
    if (deleteIndex !== -1) setInfo([...info.slice(0, deleteIndex), ...info.slice(deleteIndex + 1)]);
  }

  const onChangeInfo = (newId?) => {
    if (!title && !content) {
      removeInfo(info_id);
    }
    if (!newId) {
      newId = `info-${Math.random().toString(36).substring(2, 15)}`;
    }
    if (newId === info_id) return;
    setAttributes({ info_id: newId });
  }

  return (
    <>
      <BlockControls>
        <HeadingLevelDropdown
          value={level}
          onChange={(newLevel) =>
            setAttributes({ level: newLevel })
          }
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <p><strong>ID : </strong>{info_id}</p>
          </PanelRow>
          <PanelRow>
            <p><strong>Nom : </strong>{title}</p>
          </PanelRow>
          <PanelRow>
            <Button
              variant='primary'
              icon="welcome-add-page"
              onClick={() => onChangeInfo()}>
              Nouvelle info
            </Button>
          </PanelRow>
          <PanelRow>
            <SelectControl
              label={__('Sélectionner une info existante')}
              value={currentEntryIndex !== null ? info_id : ''}
              options={[{ label: '', value: '' }, ...info?.map((entry: InfoEntry) => ({ value: entry.id, label: entry.title ?? '<Nouvelle info>' })) ?? []]}
              onChange={onChangeInfo}
            />
          </PanelRow>
          {info_id && currentEntryIndex !== null &&
            <>
              <PanelRow>
                <Button
                  isDestructive
                  icon="trash"
                  onClick={() => removeInfo()}>
                  Efface cette info
                </Button>
              </PanelRow>
             { contentIdSelected !== null &&
               <PanelRow>
               <TextControl
                 label={__('Icone personnalisée de l\'info')}
                 value={content[contentIdSelected]?.['icon'] ?? ''}
                 onChange={(value) => onContentItemChange(value, contentIdSelected, 'icon')}
                 placeholder={__('nom de l\'icone (ex: plus-circled)')}
               />
             </PanelRow>
             }
            </>

          }
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        {info_id && currentEntryIndex !== null ? <div className={`sg-info${attributes.className ? ' ' + attributes.className : ''}`}>
          <table>
            <tr>
              <td colSpan={2}>
                <RichText
                  tagName={titleTagName as any}
                  value={title}
                  onChange={onTitleChange}
                  onSelect={() => setContentIdSelected(null)}
                  placeholder={__('Titre de l\'info')}
                />
              </td>
            </tr>
            {
              content && content.map((item: { text?: string, icon?: string }, index: number) => (
                <tr key={index}>
                  <td>
                    <div className={`sg-info__list-item ${item['icon'] ? 'icon-' + item['icon'] : 'icon-ok'} flx gx-3`}>
                      <RichText
                        className='my-0'
                        tagName={'p'}
                        value={item['text'] ?? ''}
                        onChange={(value: string) => onContentItemChange(value, index, 'text')}
                        onSelect={() => setContentIdSelected(index)}
                        placeholder={__('Contenu de l\'info')}
                      />
                    </div>

                  </td>
                  {isSelected && <td>
                    <Button
                      isDestructive
                      icon="remove"
                      onClick={() => removeContentItem(index)}
                    />
                  </td>}
                </tr>
              ))
            }
            {isSelected && <tr>
              <td>
                <Button
                  variant='primary'
                  icon="plus"
                  onClick={addNewContentItem}>
                  Ajouter un element
                </Button>
                <Button
                  isDestructive
                  icon="trash"
                  onClick={() => removeInfo()}>
                  Effacer cette info
                </Button>
              </td>
            </tr>}
          </table>
        </div> :
          <div>
            <Button
              variant='primary'
              icon="welcome-add-page"
              onClick={() => onChangeInfo()}>
              Nouvelle info
            </Button>
            <p className='f-up f-sb f-xxs color-grey-2'>ou</p>
            <p className='f-up f-sb f-xxs'>{__('Sélectionne une info existante')}</p>
            <SelectControl
              value={currentEntryIndex !== null ? info_id : ''}
              options={[{ label: '', value: '' }, ...info?.map((entry: InfoEntry) => ({ value: entry.id, label: entry.title ?? '<Nouvelle info>' })) ?? []]}
              onChange={onChangeInfo}
            />
          </div>

        }
      </div>
    </>
  );
};

export default Edit;
