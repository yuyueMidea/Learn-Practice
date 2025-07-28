// SchemaViewer.jsx
import React from 'react';
import { Button } from 'antd';

const SchemaViewer = ({ schema }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="schema-viewer">
      <pre>{JSON.stringify(schema, null, 2)}</pre>
      <Button type="primary" onClick={handleCopy}>复制Schema</Button>
    </div>
  );
};

export default SchemaViewer;