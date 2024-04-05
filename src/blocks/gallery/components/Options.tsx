import React from "react"
// @ts-ignore
import {
    PanelBody,
    // @ts-ignore
    __experimentalNumberControl as NumberControl, Button, FocalPointPicker, RangeControl, PanelHeader,
    // @ts-ignore
    __experimentalDivider as Divider,
    CheckboxControl,
} from "@wordpress/components";
// @ts-ignore
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import SpacingPanel from "../../block-components/SpacingPanel";
import BreakpointTabs from "../../block-components/BreakpointTabs";

const Options = ({ setAttributes, attributes, onSelectImages, images, selectedIndex, deleteImage, setImages, saveImages }) => {
    const { imagesOptions, columns, slideshowBreakpoint, slideshowDelay, lightbox, draggable, thumbs, legends } = attributes;
    const spacingsOptions = [
        {
            title: "Marges internes",
            attribute: "padding",
        },
        {
            title: "Marges Externes",
            attribute: "margin",
        }
    ];

    spacingsOptions.push(
        ...(!(attributes.slideshow && !slideshowBreakpoint) ? [{ title: "gap", attribute: "gap" }] : [])
    );


    const setGridPosition = (key: string, value: number): void => {
        const newImages = [...images];
        if (selectedIndex !== null) {
            const { gridPosition } = newImages[selectedIndex];
            newImages[selectedIndex]['gridPosition'] = {
                ...gridPosition,
                [key]: value,
            };
            saveImages(newImages);
        }
    };
    const resetGridPosition = (): void => {
        const newImages = [...images];
        if (selectedIndex !== null) {
            newImages[selectedIndex].gridPosition = undefined;
            saveImages(newImages);
        }
    };
    /**
     * Set the focal point for the image at the selected index.
     *
     * @param {{ x: number; y: number }} value - the new focal point coordinates
     * @return {void} 
     */
    const setFocalPoint = (value: { x: number; y: number }): void => {
        const newImages = [...images];
        if (selectedIndex !== null) {
            newImages[selectedIndex].objectPosition = value;
            setImages(newImages);
        }
    };
    /**
     * Function to change the focal point.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    const changeFocalPoint = () => {
        saveImages([...images]);
    };


    return (
        <>
            <PanelBody>
                <h3>Options de la gallerie :</h3>

                <CheckboxControl
                    label="Diaporama"
                    checked={attributes.slideshow}
                    onChange={(value: boolean) => {
                        setAttributes({
                            slideshow: value,
                        })
                        if (!value) {
                            setAttributes({
                                slideshowDelay: undefined,
                                draggable: undefined,
                                thumbs: undefined,
                                imagesOptions: imagesOptions.map((img) => ({
                                    id: img.id,
                                    objectPosition: img.objectPosition
                                })),
                            })
                        }

                    }

                    }
                />
                {attributes.slideshow && (
                    <>
                        <NumberControl
                            label="Duree du diaporama (millisecondes)"
                            min={1000}
                            value={Number(slideshowDelay) ?? undefined}
                            onChange={(value) => setAttributes({ slideshowDelay: value })}
                        />
                        <RangeControl
                            label="Taille d'écran en px pour activer le diaporama"
                            value={Number(slideshowBreakpoint) ?? undefined}
                            onChange={val => setAttributes({ slideshowBreakpoint: val })}
                            min={0}
                            max={2048}
                        />
                        <CheckboxControl
                            label="Diaporama draggable ?"
                            checked={draggable ?? false}
                            onChange={(value) => setAttributes({ draggable: value })}
                        />
                        <CheckboxControl
                            label="Miniatures"
                            checked={thumbs ?? false}
                            onChange={(value) => setAttributes({ thumbs: value })}
                        />
                    </>
                )}
                <CheckboxControl
                    label="Afficher les légendes"
                    checked={legends}
                    onChange={() => setAttributes({ legends: !legends })}
                />
                <CheckboxControl
                    label="Agrandir les images au click ?"
                    checked={lightbox}
                    onChange={(value) => setAttributes({ lightbox: value })}
                />

                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(val) => onSelectImages(val, "end")}
                        allowedTypes={["image"]}
                        multiple
                        value={images}
                        render={({ open }) => (
                            <button className="add-new" onClick={open}>
                                Ajouter des images
                            </button>
                        )}
                    />
                </MediaUploadCheck>
            </PanelBody>
            <PanelBody>
                <RangeControl
                    label="Colonnes"
                    value={columns?.default ?? 0}
                    onChange={(value: number) => {
                        setAttributes({
                            columns: { ...columns, default: value },
                        });
                    }}
                    min={1}
                    max={5}
                />
            </PanelBody>

            <SpacingPanel
                attributes={attributes}
                setAttributes={setAttributes}
                spacingsOptions={spacingsOptions}
            />
            <Divider />
            <PanelHeader label="Responsive Design" />
            <BreakpointTabs>
                {(tab) => {
                    return (
                        <div>
                            <PanelBody>
                                <RangeControl
                                    label={`Colonnes ${tab.name}`}
                                    value={columns[tab.name] ?? 0}
                                    onChange={(value: number) => {
                                        setAttributes({
                                            columns: { ...columns, [tab.name]: value },
                                        });
                                    }}
                                    min={1}
                                    max={6}
                                />
                            </PanelBody>
                            <SpacingPanel
                                breakpoint={tab.name}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                spacingsOptions={spacingsOptions}
                            />
                        </div>
                    );
                }}
            </BreakpointTabs>
            {selectedIndex !== null && images[selectedIndex] && (
                <>
                    <PanelBody>
                        <h3>Image sélectionnée :</h3>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(val) => onSelectImages(val, selectedIndex)}
                                value={imagesOptions[selectedIndex].id}
                                allowedTypes={["image"]}
                                render={({ open }) => (
                                    <Button
                                        style={{ marginBottom: "1rem" }}
                                        variant="primary"
                                        icon="edit"
                                        onClick={open}
                                    >
                                        Modifier l'image
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <br />
                        <Button
                            isDestructive
                            icon="trash"
                            onClick={() => {
                                deleteImage(selectedIndex);
                            }}
                        >
                            Supprimer
                        </Button>
                    </PanelBody>
                    <PanelBody>
                        <h3>Modifier le point de focus :</h3>
                        <FocalPointPicker
                            url={images[selectedIndex]?.url ?? undefined}
                            onChange={changeFocalPoint}
                            value={
                                images[selectedIndex]?.objectPosition
                                    ? images[selectedIndex].objectPosition
                                    : undefined
                            }
                            // @ts-ignore
                            onDrag={setFocalPoint}
                        />
                    </PanelBody>
                    <PanelBody>
                        <h3>Modifier le placement et la taille :</h3>
                        <Button
                            size={"small" as any}
                            variant="primary"
                            onClick={() => {
                                resetGridPosition();
                            }}
                        >
                            Reset
                        </Button>
                        <NumberControl
                            label='Positionnement rangée'
                            labelPosition='side'
                            spinControls='custom'
                            min={1}
                            isShiftStepEnabled={true}
                            onChange={(value: number) => { setGridPosition("top", value) }}
                            step={1}
                            value={images[selectedIndex]?.gridPosition?.top ?? undefined}
                        />
                        <NumberControl
                            label='Nombre de rangées'
                            labelPosition='side'
                            spinControls='custom'
                            min={1}
                            isShiftStepEnabled={true}
                            onChange={(value: number) => { setGridPosition("height", value) }}
                            step={1}
                            value={images[selectedIndex]?.gridPosition?.height ?? undefined}
                        />
                        <NumberControl
                            label='Positionnement colonne'
                            labelPosition='side'
                            spinControls='custom'
                            min={1}
                            isShiftStepEnabled={true}
                            onChange={(value: number) => { setGridPosition("left", value) }}
                            step={1}
                            value={images[selectedIndex]?.gridPosition?.left ?? undefined}
                        />
                        <NumberControl
                            label='Nombre de colonnes'
                            labelPosition='side'
                            spinControls='custom'
                            min={1}
                            isShiftStepEnabled={true}
                            onChange={(value: number) => { setGridPosition("width", value) }}
                            step={1}
                            value={images[selectedIndex]?.gridPosition?.width ?? undefined}
                        />
                    </PanelBody>

                </>
            )}
        </>
    )
}

export default Options