import React from 'react';
import { generateImagesSizes, getClassNames } from '../block-utilities/sg-blocks-helpers';

const Save = ({ attributes }) => {
    const {
        aspectRatio,
        sizes,
        lightbox,
        lightboxTransition,
        src,
        srcSet,
        alt,
        height,
        width,
        imagePosition,
        image_id,
        className,
        align
    } = attributes;
    
    const classNames = `${getClassNames(attributes)}${className ? ' ' + className : ''}${align === 'center' ? ' txt-ctr' : ''}`;

    const ImageWrapper = ({ children, active }) => (
        <>
            {active ?
                <a
                    data-pswp-height={height}
                    data-pswp-width={width}
                    href={src}
                    target='_blank'
                    data-cropped={true}
                    rel='noopener noreferrer'
                >
                    {children}
                </a> :
                <>{children}</>
            }
        </>

    );
    return (
        <div className={classNames ? classNames : undefined}>
            <figure
                className={`sg-image sg-lazy-image${lightbox ? " sg-lightbox-image" : ""}`}
                data-transition={lightbox ? lightboxTransition ?? "none" : undefined}
                id={'sg-image-' + image_id.toString(36)}
                data-loaded="false"
            >
                <ImageWrapper active={lightbox}>
                    <img
                        data-src={src}
                        width={width}
                        height={height}
                        sizes={generateImagesSizes(sizes)}
                        data-srcset={srcSet}
                        alt={alt}
                        style={{ aspectRatio: aspectRatio, objectPosition: imagePosition ? `${imagePosition.x * 100}% ${imagePosition.y * 100}%` : undefined }}
                    />
                </ImageWrapper>
            </figure>
        </div>
    );
};

export default Save;