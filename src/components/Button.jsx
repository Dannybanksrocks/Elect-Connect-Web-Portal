import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

const ButtonComponent = (props) => {
  const Button = styled(LoadingButton)({
    textTransform: "capitalize",
  });

  return (
    <Button disableElevation {...props}>
      {props.label}
    </Button>
  );
};

export default ButtonComponent;
