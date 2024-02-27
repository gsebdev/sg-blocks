import metadata from "./block.json";
// @ts-ignore
import { registerBlockType } from "@wordpress/blocks";
// @ts-ignore
import { addFilter } from '@wordpress/hooks';
// @ts-ignore
import { useSelect, dispatch } from '@wordpress/data';


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


addFilter('editor.BlockEdit', 'sg', (BlockEdit) => (props) => {
  registerCustomEntities();
  return <BlockEdit {...props} />;
});

const registerCustomEntities = () => {
  const namespace = 'sg';

    dispatch('core').addEntities([
      {
        label: 'SG Related Posts',
        name: 'related_posts',
        kind: 'sg',
        baseURL: '/' + namespace + '/v1/related_posts',
      },
    ]);
};