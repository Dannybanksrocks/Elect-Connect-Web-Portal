import { DataGrid } from "@mui/x-data-grid";
import "../styles/DataGrid.css";

const pageSizeOptions = [10, 20, 30, 40];
const DatagridComponent = ({ columns, rows }) => {
  return (
    <DataGrid
      density="standard"
      className="data-grid"
      columns={columns}
      rows={rows}
      disableRowSelectionOnClick
      pageSizeOptions={pageSizeOptions}
      initialState={{
        pagination: { paginationModel: { pageSize: pageSizeOptions[0] } },
      }}
    />
  );
};

export default DatagridComponent;
