
import * as React from 'react';
import Box from '@mui/material/Box';
import {
  GridRowModes,
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function DataGridTable({col, rowData, selectionRow,selectedRowData, dissableMultipleRowSelection}) {

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rowData}
        columns={col}
        checkboxSelection={selectionRow}
        onRowSelectionModelChange={selectedRowData}
        disableMultipleRowSelection={dissableMultipleRowSelection}
      />
    </Box>
  );
}



export default DataGridTable;
