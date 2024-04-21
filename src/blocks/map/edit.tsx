import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
// @ts-ignore
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
// @ts-ignore
import {
  PanelBody,
  TextControl,
  ToggleControl,
  // @ts-ignore
  __experimentalNumberControl as NumberControl,
  Button,
} from "@wordpress/components";
// @ts-ignore
import { select, useSelect } from "@wordpress/data";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import { __ } from "@wordpress/i18n";
import usePostMeta from "../block-components/usePostMeta";
import L from "leaflet";

export interface MapData {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

interface EditProps {
  isSelected: boolean;
  attributes: {
    className: string;
    id?: string;
    meta_meeting_point?: boolean;
    address?: string;
    lat?: number;
    lng?: number;
    zoom?: number;
  };
  setAttributes: (attributes: any) => void;
}

/**
 *
 * Component to handle map events
 * and update view of it
 *
 *
 *
 *
 *
 */
interface MapCentreProps {
  onMouseDown?: (map: L.Map) => void;
  onDrag?: (map: L.Map) => void;
  onDragEnd?: (map: L.Map) => void;
  onClick?: (map: L.Map, e: L.LeafletMouseEvent) => void;
  onInit?: (map: L.Map) => void;
  onRefresh?: (map: L.Map) => void;
  onZoomEnd?: (map: L.Map) => void;
  onChange?: (map: L.Map) => void;
  center: { lat: number; lng: number };
  zoom: number;
  address: string;
}

const MapHandler = React.memo<MapCentreProps>(
  ({
    onMouseDown,
    onDrag,
    onDragEnd,
    onClick,
    onInit,
    onRefresh,
    onZoomEnd,
    center,
    zoom,
    address
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const markerRef = useRef<null | L.Marker>(null);

    // Define the map icon
    const mapIcon = useSelect((select) => {
      const { url } = (select("core") as any).getEntityRecord("root", "site");
      return url
        ? new L.Icon({
          iconUrl: `${url}/wp-content/plugins/sg-blocks/dist/blocks/map/icons/marker-icon.png`,
          shadowUrl: `${url}/wp-content/plugins/sg-blocks/dist/blocks/map/icons/marker-shadow.png`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        })
        : undefined;
    }, []);

    const map = useMapEvents({
      mousedown: () => {
        if (onMouseDown) onMouseDown(map);
        setIsDragging(true);
      },
      dragend: () => {
        if (onDragEnd) onDragEnd(map);
      },
      click: (e) => {
        if (onClick) onClick(map, e);
      },
      drag: () => {
        if (onDrag) onDrag(map);
      },
      zoomend: () => {
        if (onZoomEnd) onZoomEnd(map);
      },
    });

    useEffect(() => {
      markerRef.current?.setLatLng(center);
      markerRef.current?.setPopupContent(`<span class="color-primary f-s">${address}</span><br/><span class="f-xxs color-grey-2 marker-coordinates">Lat: ${center.lat}, Lng: ${center.lng}</span>`);
      map.setView(center, zoom, { animate: true });
    }, [center.lat, center.lng, address]);
    
    useEffect(() => {
      map.setZoom(zoom);
    }, [zoom]);

    useEffect(() => {
      markerRef.current = L.marker(center, { icon: mapIcon, draggable: false }).addTo(map)
      const popupContent = `<span class="color-primary f-s">${address}</span><br/><span class="f-xxs color-grey-2 marker-coordinates">Lat: ${center.lat}, Lng: ${center.lng}</span>`;
      markerRef.current.bindPopup(popupContent).openPopup();
      if (onInit) onInit(map);
    }, []);


    useEffect(() => {
      if (onRefresh) onRefresh(map);
      map.invalidateSize();
    });

    useEffect(() => {
      const handleMouseUp = () => {
        //@ts-ignore
        map.dragging._draggable.finishDrag();
        setIsDragging(false);
      };
      if (isDragging) {
        map
          .getContainer()
          .closest("body")
          ?.addEventListener("mouseup", handleMouseUp, { once: true });
      }
    }, [isDragging]);

    return null;
  }
);

const Edit: React.FC<EditProps> = ({ attributes, setAttributes, isSelected }) => {
  const { id, meta_meeting_point } = attributes;
  const postId = select("core/editor").getEditedPostAttribute("id");
  const postType = select("core/editor").getEditedPostAttribute("type");
  const [meetingPoint, setMeetingPoint] = usePostMeta(
    postType,
    postId,
    "meeting_point"
  );
  const [isSelectingPoint, setIsSelectingPoint] = useState(false);



  const setMap = useMemo(
    () =>
      meta_meeting_point
        ? (val) => setMeetingPoint({ ...meetingPoint, ...val })
        : setAttributes,
    [setAttributes, setMeetingPoint, meta_meeting_point]
  );

  const {
    lat = 48.5,
    lng = 2.3,
    address = "",
  } = meta_meeting_point ? meetingPoint : attributes;

  const { zoom = 5 } = attributes;

  const provider = useMemo(() => new OpenStreetMapProvider(), []);

  const onSearchClick = () => {
    provider.search({ query: address ?? "" }).then((results) => {
      if (results.length > 0) {
        const roundedLat = parseFloat(results[0].y.toFixed(7));
        const roundedLng = parseFloat(results[0].x.toFixed(7));
        setMap({ lat: roundedLat, lng: roundedLng });
      }
    });
  };

  const onClick = useMemo(
    () => (map: L.Map, e: L.LeafletMouseEvent) => {
      if (!isSelectingPoint) return;

      const newLat = parseFloat(e.latlng.lat.toFixed(7));
      const newLng = parseFloat(e.latlng.lng.toFixed(7));

      setMap({ lat: newLat, lng: newLng });
    },
    [setMap, isSelectingPoint]
  );

  const onZoomEnd = useMemo(
    () => (map: L.Map) => {
      if (!isSelectingPoint) return;
      setAttributes({ zoom: map.getZoom() });
    },
    [setAttributes, isSelectingPoint]
  );

  useEffect(() => {
    if (!isSelected) setIsSelectingPoint(false);
  }, [isSelected]);


  useEffect(() => {
    if (meta_meeting_point) {
      setAttributes({
        lat: undefined,
        lng: undefined,
        address: undefined,
        id: undefined
      });
    }
    //set initial id if not on meta
    if (!id && !meta_meeting_point) {
      setAttributes({
        id: "sg-map-" + Math.random().toString(36).substring(2, 9),
        lat: lat,
        lng: lng,
        address: address,
        zoom: zoom
      });
    }
  }, [meta_meeting_point]);

  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <PanelBody title="Options">
          <ToggleControl
            label={__(
              "Configurer le point de rendez vous de l'activité",
              "sg-blocks"
            )}
            checked={meta_meeting_point}
            onChange={(value: boolean) =>
              setAttributes({ meta_meeting_point: value })
            }
          />
          <TextControl
            label={__("Saisie Adresse", "sg-blocks")}
            value={address ?? ""}
            onChange={(value) => setMap({ address: value })}
          />
          <Button icon="search" onClick={onSearchClick}>
            Rechercher les coordonnées de l'adresse
          </Button>
          <NumberControl
            label={__("Latitude", "sg-blocks")}
            value={lat}
            onChange={(lat: number) => {
              lat = Math.max(-90, Math.min(parseFloat((+lat).toFixed(7)), 90));
              setMap({ lat });
            }}
          />
          <NumberControl
            label={__("Longitude", "sg-blocks")}
            value={lng}
            onChange={(lng: number) => {
              lng = Math.max(
                -180,
                Math.min(parseFloat((+lng).toFixed(7)), 180)
              );
              setMap({ lng });
            }}
          />
          <NumberControl
            label={__("Zoom", "sg-blocks")}
            value={zoom}
            spinControls="custom"
            min={1}
            step={1}
            max={20}
            onChange={(val: number) => setAttributes({ zoom: val ? val : 5 })}
          />
          <Button
            icon={isSelectingPoint ? "no" : "location"}
            onClick={() => { setIsSelectingPoint(!isSelectingPoint) }}
            variant={isSelectingPoint ? "secondary" : "primary"}
          >
            {isSelectingPoint ? "Arrêter la sélection" : "Sélectionner un point sur la carte"}
          </Button>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <MapContainer closePopupOnClick={false}>
          <MapHandler
            onClick={onClick}
            onZoomEnd={onZoomEnd}
            center={{ lat: lat, lng: lng }}
            zoom={zoom}
            address={address}
          />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </>
  );
};

export default Edit;
