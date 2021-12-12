import { useEffect, useRef } from 'react';

export const useCheckUpdate = (props: Record<string, any>) => {
  const prev = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((acc: Record<string, any>, [key, value]) => {
      if (prev.current[key] !== value) {
        acc[key] = [prev.current[key], value];
      }

      return acc;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
};
