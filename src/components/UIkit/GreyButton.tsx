import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

type GreyButtonPropsType = Omit<ButtonProps,'variant' >& {
  label: string;
}

const useStyles = makeStyles((theme)=> ({
  "button":{
    backgroundColor: theme.palette.grey["300"],
    color: "#000",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256
  }
}))
export const GreyButton: React.FC<GreyButtonPropsType> = (
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

