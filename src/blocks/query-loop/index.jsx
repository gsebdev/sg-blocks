import metadata from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import { dispatch } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import Edit from "./edit";
import Save from "./save";

registerBlockType(metadata.name, {
  title: metadata.title,
  edit: Edit,
  save: Save,
});



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