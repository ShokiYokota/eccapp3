import {InputLabel, MenuItem, FormControl, Select, makeStyles} from "@material-ui/core";


type SelectTypeProps = {
  label: string;
  required: boolean;
  value: string;
  select: (value: string) => void;
  options: {id: string; name: string}[];
}

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%'
  }
})

export const SelectBox = (props: SelectTypeProps): JSX.Element => {

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
      required={props.required}
      value={props.value}
      onChange={(event) => props.select(event.target.value as string)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}