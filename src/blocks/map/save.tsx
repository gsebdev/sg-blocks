import React from "react";
const Save = ({ attributes }) => {

    if (!!attributes.meta_meeting_point) {
        return (
            <div className={`sg-map${attributes.className ? " " + attributes.className : ""}`}>
                <div className="sg-map__container" />
            </div>)
    } else {
        const scriptContent = `window.sgMaps = Object.assign({}, window.sgMaps, { '${attributes.id}':{lat: ${attributes.lat}, lng: ${attributes.lng}, zoom: ${attributes.zoom}, address: '${attributes.address.replace(/'/g, "\\'")}'}});`;
        return (
            <div id={attributes.id} className={`sg-map${attributes.className ? " " + attributes.className : ""}`}>
                <div className="sg-map__container" />
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: scriptContent }} />
            </div>
        )
    }

}

export default Save;