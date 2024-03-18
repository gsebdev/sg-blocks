import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";

registerBlockType(metadata.name, {
  title: metadata.title,
  edit: Edit,
  save: () => null,
});

