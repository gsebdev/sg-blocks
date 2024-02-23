// @ts-ignore
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useMemo, useState } from 'react';

const usePostMeta = (postType: string, postId: number, metaKey: string) => {
    const metaStore = useSelect(select => select('core/editor').getEditedPostAttribute('meta'), [postType, postId]);
    const [metaEntry, setHookState] = useState(metaStore[metaKey]);

    const isEqual = useMemo(() => (a, b) => {
        if (a === b) {
            return true;
          }
        
          if (typeof a !== 'object' || a === null ||
              typeof b !== 'object' || b === null) {
            return false;
          }
        
          const keys1 = Object.keys(a);
          const keys2 = Object.keys(b);
        
          if (keys1.length !== keys2.length) {
            return false;
          }
        
          for (let key of keys1) {
            if (!keys2.includes(key) || !isEqual(a[key], b[key])) {
              return false;
            }
          }
          return true;
    }, []);

    useEffect(() => {
        if(!isEqual(metaEntry, metaStore[metaKey])) {
            setHookState(metaStore[metaKey]);
        }      
    }, [metaStore]);

    const setMetaEntry = (editedMetaEntry: any) => {
        setHookState(editedMetaEntry);
        dispatch('core').editEntityRecord('postType', postType, postId, { meta: { [metaKey]: editedMetaEntry } })
        .catch((error) => {
            console.error(error);
            setHookState(metaStore[metaKey]);
        });
    };
    
    return [metaEntry, setMetaEntry]
}

export default usePostMeta