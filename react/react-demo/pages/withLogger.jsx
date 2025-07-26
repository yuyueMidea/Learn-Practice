// withLogger.jsx
import React, { useEffect } from 'react';

const withLogger = (WrappedComponent, name = 'Component') => {
  return (props) => {
    useEffect(() => {
      console.log(`[${name}] mounted`);
      return () => console.log(`[${name}] unmounted`);
    }, []);

    useEffect(() => {
      console.log(`[${name}] props changed:`, props);
    }, [props]);

    return <WrappedComponent {...props} />;
  };
};

export default withLogger;
