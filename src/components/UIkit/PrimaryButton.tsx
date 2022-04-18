import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

type PrimaryButtonPropsType = Omit<ButtonProps,'variant' >& {
  label: string
}

const useStyles = makeStyles({
  "button":{
    backgroundColor: "#4dd0e1",
    color: "#333",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256
  }
})
export const PrimaryButton: React.FC<PrimaryButtonPropsType> = (
  {
    label,
    ...others
  }) => {

  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" {...others}>
      {label}
    </Button>
  )
}

