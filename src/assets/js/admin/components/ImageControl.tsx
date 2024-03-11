import React, { useEffect, useMemo, useState } from "react";
import { useSelect } from "@wordpress/data";
import { MediaUpload as WpMediaUpload } from "@wordpress/block-editor";

import "./sg-image-control.scss";

interface ImageControlProps {
  label?: string;
  description?: string;
  id?: string;
  value?: string | number;
  onChange: (value: any) => void;
  isRoot?: boolean;
  customImageUploader?: React.FC<MediaUploadProps>;
}

export interface MediaUploadProps {
  value?: number;
  render: (props: { open: () => void }) => JSX.Element;
  onSelect: (media: Media) => void;
  allowedTypes: string[];
  multiple?: boolean;
}

interface Media {
  id: number;
  [key: string]: any;
}
const ImageControl: React.FC<ImageControlProps> = (props) => {
  const {
    label,
    description,
    id,
    value,
    onChange,
    isRoot,
    customImageUploader,
  } = props;
  const [media, setMedia] = useState<Media | undefined>(undefined);

  const MediaUpload = useMemo(
    () => customImageUploader || WpMediaUpload,
    [customImageUploader]
  );

  const initImageObject = useSelect(
    (select) => {
      if (!value) return undefined;
      const mediaInitial = (select("core") as any).getMedia(value);

      return mediaInitial
        ? {
            id: mediaInitial?.id,
            url: mediaInitial?.source_url,
            sizes: {
              large: {
                url: mediaInitial?.media_details?.sizes?.large?.source_url,
              },
            },
          }
        : undefined;
    },
    [value]
  );

  useEffect(() => {
    if (!initImageObject && !!media) {
      setMedia(undefined);
    } else if (initImageObject && initImageObject.id !== media?.id) {
      setMedia(initImageObject);
    }
  }, [initImageObject]);

  const deleteImage = () => {
    onChange("");
    if (isRoot) {
      setMedia(undefined);
    }
  };

  return (
    <div>
      <MediaUpload
        onSelect={(media) => {
          onChange(media.id);
          if (isRoot) setMedia(media);
        }}
        allowedTypes={["image"]}
        value={media?.id ?? undefined}
        render={({ open }) => (
          <div className="sg-custom-field-wrapper">
            {!!label && <label>{label}</label>}
            {!!description && (
              <p id={id ? `${id}-description` : ""}>{description}</p>
            )}
            <div
              id={id ? `${id}-box` : undefined}
              className={`sg-image-control`}
            >
              {!!media ? (
                <div className="sg-image-control__container">
                  <img
                    src={media?.sizes?.large?.url || media?.url}
                    alt=""
                    onClick={open}
                  />
                  <span
                    className="dashicons dashicons-no"
                    onClick={deleteImage}
                  />
                  <span className="dashicons dashicons-edit" onClick={open} />
                </div>
              ) : (
                <div className="sg-image-control-add" onClick={open}>
                  <span className="dashicons dashicons-upload" />
                  <p>Sélectionnez une image</p>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};
export default ImageControl;
