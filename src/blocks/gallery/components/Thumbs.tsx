import React from "react";
// @ts-ignore
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
// @ts-ignore
import { Icon } from "@wordpress/components";
import { GalleryImage } from "./Edit";
interface ThumbsProps {
    images: GalleryImage[];
    onSelectImages?: (value: any, position: number | "start" | "end") => void;
    setSelectedIndex?: (i: number) => void;
    deleteImage?: (i: number) => void;
    saving?: boolean;
}
const Thumbs: React.FC<ThumbsProps> = ({ images, onSelectImages, setSelectedIndex, deleteImage, saving = false }) => {
    return (
        <div className="sg-gallery__thumbs">
            <div className="sg-gallery__wrapper">
                {!saving && onSelectImages && <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(val) => onSelectImages(val, "start")}
                        allowedTypes={"image"}
                        multiple
                        value={images}
                        render={({ open }) => (
                            <button
                                className="add-new add-new--thumb"
                                onClick={open}
                            >
                                Ajouter des images
                            </button>
                        )}
                    />
                </MediaUploadCheck>}
                {images && images.map((img: any, index: number) => {
                    const objPos = img.objectPosition ?? null;
                    return (
                        <div
                            key={index}
                            className="sg-gallery__thumb"
                            data-loaded={saving ? "false" : undefined}
                            onClick={!saving && setSelectedIndex ? () => { setSelectedIndex(index) } : undefined}
                        >
                            <img
                                draggable="false"
                                data-src={saving ? img.url : undefined}
                                data-srcset={saving ? img.srcset : undefined}
                                src={!saving ? img.url : undefined}
                                srcSet={!saving ? img.srcset : undefined}
                                sizes="150px"
                                alt={img.alt}
                                style={{
                                    objectPosition: objPos
                                        ? `${Math.round(objPos.x * 100)}% ${Math.round(
                                            objPos.y * 100
                                        )}%`
                                        : undefined,
                                }}
                            />
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
                                            allowedTypes={"image"}
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

                        </div>
                    );
                })}
                {!saving && onSelectImages &&
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(val) => onSelectImages(val, "end")}
                            allowedTypes={"image"}
                            multiple
                            render={({ open }) => (
                                <button
                                    className="add-new add-new--thumb"
                                    onClick={open}
                                >
                                    Ajouter des images
                                </button>
                            )}
                        />
                    </MediaUploadCheck>
                }

            </div>
        </div>
    )
}

export default Thumbs