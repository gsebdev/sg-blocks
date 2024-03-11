import React, { useEffect, useMemo } from "react"
import { MediaUploadProps } from "./ImageControl"
declare global {
    interface Window {
        wp: any
    }
}



const { wp } = window

const CustomMediaUploader: React.FC<MediaUploadProps> = (props) => {
    const { value, render, onSelect, allowedTypes, multiple } = props;

    const mediaUpload = useMemo(() => {

        const m = wp.media({
            multiple,
            library: {
                type: allowedTypes
            }
        });
        console.log(m)
        return m;
    }, [multiple, allowedTypes]);

    useEffect(() => {
        mediaUpload?.on('select', () => {
            const selection = mediaUpload.state().get('selection');
            const result = multiple ? selection.toJSON() : selection.first().toJSON();
            onSelect(result);
        });
    }, [onSelect, multiple]);


    const open = () => {
        console.log(mediaUpload)
        mediaUpload.open(value);
    }

    return (
        <>
            {render({ open })}
        </>
    );
}
export default CustomMediaUploader;