import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { GalleryAction } from '../../Actions/GalleryActions';
import { GALLARY_DELETE } from '../../Commen/Constents';

export default function ContextMenu(props) {
  const { id, url } = props
  const dispatch = useDispatch()

  console.log(url);


  const RemoveHandeler = async () => {
    try {
      let ids = [id]
      if (!window.confirm("Are you sure to delete this media's?")) {
        return
      }
      dispatch(GalleryAction(GALLARY_DELETE, ids))
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <Paper sx={{ width: 340, maxWidth: '100%', position: "absolute", top: "1rem", left: "3rem", zIndex: "1" }}>
      <MenuList>
        <MenuItem onClick={RemoveHandeler}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigator.clipboard.writeText(url)}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Image Address</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
