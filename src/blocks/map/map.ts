import { SgLazyLoadElement, lazyLoad } from '../block-utilities/sg-lazyload';
import 'leaflet/dist/leaflet.css';

declare global {
    interface Window {
        sgMaps: {
            [key: string]: {
                address: string;
                lat: number;
                lng: number;
                zoom: number;
            }
        }
    }
}
const mapLoadCallback = async (container: HTMLElement | SgLazyLoadElement | undefined, mapId?: string) => {
    if (container) {
        // load ressources
        const { default: L } = await import('leaflet');

        const { lat, lng, address } = mapId ? window.sgMaps[mapId] : window.sgMaps['meeting_point'];
        const zoom = mapId ? window.sgMaps[mapId].zoom : (Number(container.dataset.zoom) || 14);
        console.log(zoom)
        const icon = L.icon({
            iconUrl: '/wp-content/plugins/sg-blocks/dist/blocks/map/icons/marker-icon-violet.png',
            shadowUrl: '/wp-content/plugins/sg-blocks/dist/blocks/map/icons/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28]
        })
        const map = L.map(container, { scrollWheelZoom: false }).setView([lat, lng], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([lat, lng], { icon: icon }).addTo(map);
        L.popup({ offset: [0, -42] })
            .setLatLng([lat, lng])
            .setContent('<span class="f-xs color-accent">' + address + '</span><br><span class="f-xs color-text-light">Lat: ' + lat + ', Lng: ' + lng + '</span>')
            .openOn(map);

        container.classList.remove('loading');
    }
}


const init = () => {
    if (window.sgMaps) {
        const mapBlocks = document.querySelectorAll('.sg-map');
        mapBlocks.forEach(block => {
            const container = block.querySelector('.sg-map__container');
            if (container && container instanceof HTMLElement) {
                container.classList.add('loading');
                lazyLoad(container, (el) => { mapLoadCallback(el, block.id) });
            }
        });
    }
}

export default init;

