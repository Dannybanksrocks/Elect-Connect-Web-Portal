import { TextField } from "@mui/material";

const TextFieldComponent = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      size="small"
      InputProps={{ sx: { background: "white" } }}
    />
  );
};

export default TextFieldComponent;
