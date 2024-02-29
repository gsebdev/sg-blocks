import metadata from "./block.json";
// @ts-ignore
import { registerBlockType } from "@wordpress/blocks";

const dynamicRegisterBlockType = async () => {
  const { default: Edit } = await import("./edit");

  registerBlockType(metadata.name, {
    title: metadata.title,
    edit: Edit,
    save: () => null,
  });
};

dynamicRegisterBlockType();
