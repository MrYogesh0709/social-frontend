import { IconButton, TextField, Grid, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type InputType = {
  name: string;
  label: string;
  type?: string;
  half?: boolean;
  autoFocus?: boolean;
  handleShowPassword?: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Input = ({
  name,
  half,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}: InputType) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword!}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </Grid>
  );
};

export default Input;
