import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import logo from '../../assets/img/icons/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../reducks/store/store'
import { getIsSignedIn } from '../../reducks/users/selectors'
import { push } from 'connected-react-router'
import {HeaderMenus} from './HeaderMenus'
import {ClosableDrawer} from './ClosableDrawer'
import { useCallback } from 'react'

const [open,setOpen] = useState(false);
const handleDrawerToggle = useCallback((event:React.KeyboardEvent<HTMLInputElement>)=>{
  if (event.type === 'keydown' && (event.key ==='Tab' || event.key === 'Shift')){
    return;
  }
  setOpen(!open)
},[setOpen,open]);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolbar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
})


export const Header = () => {
  const classes = useStyles();
  const selectror = useSelector((state:AppState)=>state)
  const isSignedIn = getIsSignedIn(selectror)
  const dispatch = useDispatch();

  return(
    <div className={classes.root}>
    <AppBar position="fixed" className={classes.menuBar}>
      <Toolbar className={classes.toolbar}>
        <img src={logo} alt="Torahack" width="128px" onClick={() => dispatch(push('/'))} />
        {isSignedIn && (
          <div className={classes.iconButtons}>
            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
          </div>
        )}
      </Toolbar>
    </AppBar>
    <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}