import React from 'react';
import { GalleryImage } from './Edit';
// @ts-ignore
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
// @ts-ignore
import { Icon } from "@wordpress/components";
import { getColumnsClassname, getSpacingClassname } from '../../block-utilities/sg-blocks-helpers';

interface GalleryProps {
    attributes: any
    images?: GalleryImage[]
    setSelectedIndex?: (i: number) => void
    galleryRef?: React.RefObject<HTMLDivElement>
    saving?: boolean
    selectedIndex?: number | null
    deleteImage?: (i: number) => void
    onSelectImages?: (value: any, position: number | "start" | "end") => void
}

const ImageWrapper = ({ children, condition, height, width, src, srcset }) => (
    <>
        {
            condition ?
                <a
                    data-pswp-srcset={srcset}
                    data-pswp-height={height}
                    data-pswp-width={width}
                    data-cropped="true"
                    href={src}
                >{children}</a> :
                <>{children}</>
        }
    </>
);

const Gallery: React.FC<GalleryProps> = ({ attributes, images, setSelectedIndex, deleteImage, onSelectImages, selectedIndex, galleryRef = null, saving = false }) => {
    const { legends, lightbox, padding, margin } = attributes;

    const galleryClassName = [
        'sg-gallery',
        getSpacingClassname({ padding: padding, margin: margin }).trim(),
        attributes.className,
    ];
    return (
        <div
            className={galleryClassName.join(' ')}
            data-legends={legends ? "true" : undefined}
            data-lightbox={saving && lightbox ? "true" : undefined}
            ref={galleryRef}
            id={saving ?
                attributes.id
                    ? attributes.id
                    : `gallery-${Math.random().toString(36).substring(2, 15)}`
                : undefined
            }
        >
            <div className={`sg-gallery__images grid ${getColumnsClassname(attributes.columns)} ${getSpacingClassname({gap: attributes.gap})}`}>
                {images &&
                    images.map((img: any, index: number) => {
                        const { url, alt, legend, srcset, width, height, objectPosition: objPos, gridPosition } = img;
                        return (
                            <figure
                                className={`sg-gallery__img${!saving && selectedIndex === index ? ' is-selected' : ''}`}
                                key={index}
                                onClick={!saving && setSelectedIndex ? () => {
                                    setSelectedIndex(index);
                                } : undefined}
                                data-loaded={saving ? "false" : undefined}
                                style={{
                                    gridRow: gridPosition?.height || gridPosition?.top
                                        ? `${gridPosition?.top ?? ''}${gridPosition?.height && gridPosition?.top ? ' / ' : ''}${gridPosition?.height ? 'span ' + gridPosition?.height : ''}`
                                        : undefined,
                                    gridColumn: gridPosition?.width || gridPosition?.left
                                        ? `${gridPosition?.left ?? ''}${gridPosition?.width && gridPosition?.left ? ' / ' : ''}${gridPosition?.width ? 'span ' + gridPosition?.width : ''}`
                                        : undefined,
                                }}
                            >
                                <ImageWrapper
                                    condition={lightbox && saving}
                                    height={height}
                                    width={width}
                                    src={url}
                                    srcset={srcset}
                                >
                                    <img
                                        draggable="false"
                                        data-src={saving ? url : undefined}
                                        data-srcset={saving ? srcset : undefined}
                                        src={!saving ? url : undefined}
                                        srcSet={!saving ? srcset : undefined}
                                        width={width}
                                        height={height}
                                        sizes="(max-width: 380px) 300px ,(max-width: 576px) 320px, (max-width: 1440px) 500px, 768px"
                                        alt={alt}
                                        style={{
                                            objectPosition: objPos
                                                ? `${Math.round(objPos.x * 100)}% ${Math.round(
                                                    objPos.y * 100
                                                )}%`
                                                : undefined,
                                        }}
                                    /></ImageWrapper>
                                {legends && legend && legend.length > 0 && (
                                    <figcaption className={lightbox ? "pswp-caption-content" : undefined}>
                                        {legend}
                                    </figcaption>
                                )}
                                 {!saving && deleteImage && onSelectImages &&
                                <>
                                    <Icon
                                        className="delete"
                                        icon="trash"
                                        onClick={() => {
                                            deleteImage(index);
                                        }}
                                    />
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(val) => onSelectImages(val, index)}
                                            allowedTypes={["image"]}
                                            value={images[index].id}
                                            render={({ open }) => (
                                                <Icon
                                                    className="edit"
                                                    icon="edit"
                                                    onClick={open}
                                                />
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </>}
                            </figure>
                        );
                    })}
            </div>
        </div>
    )
}

export default Gallery