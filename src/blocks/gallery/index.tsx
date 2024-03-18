import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/Edit";
import Save from "./components/Save";

registerBlockType(metadata.name, {
    title: metadata.title,
    edit: Edit,
    save: Save
} as any);


