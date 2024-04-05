import React, { useRef, useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
// @ts-ignore
import { PanelBody, TextControl, ToggleControl, __experimentalNumberControl as NumberControl, Button } from "@wordpress/components";
// @ts-ignore
import { select, useSelect } from '@wordpress/data';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import { __ } from '@wordpress/i18n';
import L from 'leaflet';
import usePostMeta from '../block-components/usePostMeta';




export interface MapData {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

interface EditProps {
  isSelected: boolean;
  attributes: { className: string, id?: string, meta_meeting_point?: boolean, address?: string, lat?: number, lng?: number, zoom?: number };
  setAttributes: (attributes: any) => void;
}

const Edit: React.FC<EditProps> = ({ attributes, setAttributes }) => {
  const { className, id, meta_meeting_point } = attributes;
  const postId = select('core/editor').getEditedPostAttribute('id');
  const postType = select('core/editor').getEditedPostAttribute('type');
  const [meetingPoint, setMeetingPoint] = usePostMeta(postType, postId, 'meeting_point');
  const [lat, setLat] = useState<number | undefined>(meta_meeting_point ? meetingPoint?.lat : attributes?.lat);
  const [lng, setLng] = useState<number | undefined>(meta_meeting_point ? meetingPoint?.lng : attributes?.lng);
  const [zoom, setZoom] = useState<number | undefined>(meta_meeting_point ? meetingPoint?.zoom : attributes?.zoom);
  const [address, setAddress] = useState<string | undefined>(meta_meeting_point ? meetingPoint?.address : attributes?.address);
  // Define the map icon
  const mapIcon = useSelect((select) => {
    const { url } = (select('core') as any).getEntityRecord('root', 'site');
    return url ? new L.Icon({
      iconUrl: `${url}/wp-content/plugins/sg-blocks/dist/blocks/map/icons/marker-icon.png`,
      shadowUrl: `${url}/wp-content/plugins/sg-blocks/dist/blocks/map/icons/marker-shadow.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28]
    }) : undefined;
  }, []);

  useEffect(() => {
    if (meta_meeting_point) {
      setMeetingPoint({ address, lat, lng, zoom });
    } else {
      setAttributes({ address, lat, lng, zoom });
    }
  }, [address, lat, lng, zoom]);

  useEffect(() => {
    if (meta_meeting_point) {
      if (lat !== meetingPoint?.lat) setLat(meetingPoint?.lat)
      if (lng !== meetingPoint?.lng) setLng(meetingPoint?.lng)
      if (zoom !== meetingPoint?.zoom) setZoom(meetingPoint?.zoom)
      if (address !== meetingPoint?.address) setAddress(meetingPoint?.address)
    }
  }, [meetingPoint]);

  const markerRef = useRef<null | L.Marker>(null);

  const provider = useMemo(() => new OpenStreetMapProvider(), []);

  const onSearchClick = () => {
    provider.search({ query: address ?? '' }).then((results) => {

      if (results.length > 0) {
        const roundedLat = parseFloat(results[0].y.toFixed(7));
        const roundedLng = parseFloat(results[0].x.toFixed(7));
        setLat(roundedLat);
        setLng(roundedLng);
        setZoom(14);
      }
    })
  }

  useEffect(() => {
    //set initial meeting point based on meta value
    if (meta_meeting_point === true) {
      setAttributes({ id: undefined, address: undefined, lat: undefined, lng: undefined, zoom: undefined });
      setAddress(meetingPoint?.address);
      setLat(meetingPoint?.lat);
      setLng(meetingPoint?.lng);
      setZoom(meetingPoint?.zoom);
    }

    //set initial id if not on meta
    if (!id && !meta_meeting_point) {
      setAttributes({ id: 'sg-map-' + Math.random().toString(36).substring(2, 9) });
    }

  }, [meta_meeting_point]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [markerRef.current])

  const blockProps = useBlockProps();

  const UpdateMapCentre = useMemo(() => ({ lat, lng, zoom }) => {
    const marker = markerRef.current;
    if (marker != null) {
      marker.openPopup();
    }

    const map = useMapEvents({
      dragend: () => {
        if (marker != null) {
          setLat(parseFloat(marker.getLatLng().lat.toFixed(7)));
          setLng(parseFloat(marker.getLatLng().lng.toFixed(7)));
          marker.openPopup();
        }
      },
      mouseup: () => {
        //@ts-ignore
        if (map.dragging.moving()) map.dragging._draggable.finishDrag();
      },
      mouseout: () => {
        //@ts-ignore
        if (map.dragging.moving()) map.dragging._draggable.finishDrag();
      },
      drag: () => {
        if (marker != null) {
          marker.closePopup();
          marker.setLatLng([parseFloat(map.getCenter().lat.toFixed(7)), parseFloat(map.getCenter().lng.toFixed(7))]);
        }
      },

      zoomend: () => {
        setZoom(map.getZoom());
        if (marker !== null) {
          marker.openPopup();
        }
      },

    });

    if (lat && lng && zoom) {
      map.setView([lat, lng], zoom);

    }
    map.invalidateSize();
    return null;
  }, [lat, lng, zoom]);

  return (
    <>
      <InspectorControls>
        <PanelBody title="Options">
          <ToggleControl
            label={__("Configurer le point de rendez vous de l'activité", "sg-blocks")}
            checked={meta_meeting_point}
            onChange={(value: boolean) => setAttributes({ meta_meeting_point: value })}
          />
          <TextControl
            label={__("Saisie Adresse", "sg-blocks")}
            value={address ?? ''}
            onChange={(value) => setAddress(value)}
          />
          <Button
            icon="search"
            onClick={onSearchClick}>Rechercher les coordonnées de l'adresse</Button>
          <NumberControl
            label={__('Latitude', 'sg-blocks')}
            value={lat}
            onChange={(lat: number) => setLat(lat ? parseFloat((+lat).toFixed(7)) : undefined)}
          />
          <NumberControl
            label={__('Longitude', 'sg-blocks')}
            value={lng}
            onChange={(lng: number) => setLng(lng ? parseFloat((+lng).toFixed(7)) : undefined)}
          />
          <NumberControl
            label={__('Zoom', 'sg-blocks')}
            value={zoom}
            spinControls='custom'
            min={1}
            step={1}
            max={20}
            onChange={(val: number) => setZoom(val)}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <MapContainer center={{ lat: lat ?? 48.6, lng: lng ?? 2.3 }} zoom={zoom ?? 5} scrollWheelZoom={false}>
          <UpdateMapCentre lat={lat} lng={lng} zoom={zoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat && lng &&
            <Marker
              position={{ lat: lat ?? 48.6, lng: lng ?? 2.3 }}
              icon={mapIcon}
              ref={markerRef}
              draggable={false}
            >
              {address &&
                <Popup className='color-primary'>
                  <span className='color-primary f-s'>{address}</span>
                  <br />
                  <span className='f-xxs color-grey-2 marker-coordinates'>{`Lat: ${markerRef.current?.getLatLng().lat}, Lng: ${markerRef.current?.getLatLng().lng}`}</span>
                </Popup>
              }
            </Marker>
          }
        </MapContainer>
      </div>
    </>
  );
};

export default Edit;
