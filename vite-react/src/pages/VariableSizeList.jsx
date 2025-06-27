/* import React from 'react';
import { VariableSizeList as List } from 'react-window';

const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const Row = ({ index, style }) => (
  <div style={style}>
    行 {index} (高度: {rowHeights[index]}px)
  </div>
);

const VariableSizeListExample = () => (
  <List
    height={400}
    itemCount={1000}
    itemSize={index => rowHeights[index]}
    width={300}
  >
    {Row}
  </List>
);

export default VariableSizeListExample; */

/* import React from 'react';
import { FixedSizeList as List } from 'react-window';

const Column = ({ index, style }) => (
  <div style={style}>
    列 {index}
  </div>
);

const HorizontalList = () => (
  <List
    height={75}
    itemCount={1000}
    itemSize={100}
    layout="horizontal"
    width={600}
  >
    {Column}
  </List>
);

export default HorizontalList; */


import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    行 {rowIndex}, 列 {columnIndex}
  </div>
);

const GridExample = () => (
  <Grid
    columnCount={10}
    columnWidth={100}
    height={400}
    rowCount={1000}
    rowHeight={50}
    width={600}
  >
    {Cell}
  </Grid>
);

export default GridExample;