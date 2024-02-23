import React from 'react';
import { GalleryAttributes, GalleryImage } from './Edit';
import Thumbs from './Thumbs';
import { getSpacingClassname } from '../../block-utilities/sg-blocks-helpers';

interface SlideshowProps {
    attributes: GalleryAttributes
    images?: GalleryImage[]
    setSelectedIndex?: (i: number) => void
    galleryRef?: React.RefObject<HTMLDivElement>
    saving?: boolean
    deleteImage?: (i: number) => void
    onSelectImages?: (value: any, position: number | "start" | "end") => void
}

const Slideshow: React.FC<SlideshowProps> = ({ attributes, images, deleteImage, onSelectImages, setSelectedIndex, galleryRef = null, saving = false }) => {
    const { draggable, thumbs, legends, lightbox, slideshowDelay } = attributes;
    return (
        <div
            className={`sg-gallery sg-gallery--slideshow ${getSpacingClassname({ padding: attributes.padding, margin: attributes.margin })}`}
            role="region"
            aria-label="Image Gallery"
            data-draggable={draggable ? true : undefined}
            data-thumbs={thumbs ? true : undefined}
            data-legends={legends ? true : undefined}
            data-lightbox={saving && lightbox ? "true" : undefined}
            data-slideshow-delay={slideshowDelay ?? undefined}
            ref={galleryRef}
            id={saving ?
                attributes.id
                    ? attributes.id
                    : `gallery-${Math.random().toString(36).substring(2, 15)}` : undefined
            }
        >
            <div className="sg-gallery__images">
                {images && images.length > 1 &&
                    <>
                        <button
                            data-direction="prev"
                            className="sg-gallery__nav"
                            aria-label="Previous Image"
                        />
                        <button
                            data-direction="next"
                            className="sg-gallery__nav"
                            aria-label="Next Image"
                        />
                    </>
                }

                <div className="sg-gallery__wrapper">
                    <>
                        {images &&
                            images.map((img: any, index: number) => {
                                return (
                                    <figure
                                        className="sg-gallery__img"
                                        key={index}
                                        onClick={!saving && setSelectedIndex ? () => {
                                            setSelectedIndex(index);
                                        } : undefined}
                                        data-loaded={saving ? "false" : undefined}
                                    >
                                        <img
                                            draggable="false"
                                            data-src={saving ? img.url : undefined}
                                            data-srcset={saving ? img.srcset : undefined}
                                            src={!saving ? img.url : undefined}
                                            srcSet={!saving ? img.srcset : undefined}
                                            height={img.height}
                                            width={img.width}
                                            sizes="(max-width: 320px) 320px, (max-width: 820px) 720px, (max-width: 1440px), 800px"
                                            alt={img.alt}
                                            style={{
                                                objectPosition: img.objectPosition
                                                    ? `${Math.round(img.objectPosition.x * 100)}% ${Math.round(
                                                        img.objectPosition.y * 100
                                                    )}%`
                                                    : undefined,
                                            }}
                                        />
                                        {legends && img.legend && (
                                            <figcaption className={saving && lightbox ? "pswp-caption-content" : undefined}>
                                                {img.legend}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            })}
                    </>
                </div>
            </div>

            {attributes.thumbs &&
                <Thumbs
                    images={images as GalleryImage[]}
                    saving={saving}
                    onSelectImages={onSelectImages}
                    setSelectedIndex={setSelectedIndex}
                    deleteImage={deleteImage}

                />
            }

        </div>
    )
}

export default Slideshow