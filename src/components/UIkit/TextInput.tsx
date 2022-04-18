import React from "react";
import {TextField, TextFieldProps} from "@material-ui/core";

type TextInputPropsType = Omit<TextFieldProps, 'margin' | 'autoComplete'>;

export const TextInput: React.FC<TextInputPropsType> = (
  {
    fullWidth = true,
    multiline = false,
    required = true,
    rows = 1,
    type = "text",
    ...others
  }) => {
  return (
    <TextField
      autoComplete="off"
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      required={required}
      type={type}
      margin="dense"
      {...others}
    />
  )
}