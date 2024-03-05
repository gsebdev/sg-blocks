import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";

const dynamicRegisterBlockType = async () => {
  const { default: Edit } = await import("./edit");
  const { default: Save } = await import("./save");

  registerBlockType(metadata.name, {
    title: metadata.title,
    edit: Edit,
    save: Save,
  } as any);
};

dynamicRegisterBlockType();
