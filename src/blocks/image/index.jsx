import metadata from "./block.json";
// @ts-ignore
import { registerBlockType } from "@wordpress/blocks";

const dynamicRegisterBlockType = async () => {
  const { default: Edit } = await import("./edit");
  const { default: Save } = await import("./save");

  registerBlockType(metadata.name, {
    title: metadata.title,
    edit: Edit,
    save: Save,
  });
};

dynamicRegisterBlockType();
