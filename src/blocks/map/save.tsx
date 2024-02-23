import React from "react";
const Save = ({ attributes }) => {
    const scriptContent = `window.sgMaps = Object.assign({}, window.sgMaps, { '${attributes.id}':{lat: ${attributes.lat}, lng: ${attributes.lng}, zoom: ${attributes.zoom}, address: '${attributes.address}'}});`;
    return (
        <>
            <div id={attributes.id} className={`sg-map${attributes.className ? " " + attributes.className : ""}`}>
                <div className="sg-map__container"/>
            </div>
            {!attributes.meta_meeting_point &&
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: scriptContent }} />
            }
        </>

    )
}

export default Save;