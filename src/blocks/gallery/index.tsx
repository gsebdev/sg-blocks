import metadata from "./block.json";
// @ts-ignore
import { registerBlockType } from "@wordpress/blocks";

const dynamicRegisterBlockType = async () => {
    const { default: Edit } = await import('./components/Edit');
    const { default: Save } = await import('./components/Save');

    registerBlockType(metadata.name, {
        title: metadata.title,
        edit: Edit,
        save: Save
      } as any);
}

dynamicRegisterBlockType();
