import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CategoryAction } from '../../Actions/CategoryActions';
import { CATEGORY_INSERT, CATEGORY_UPDATE } from '../../Commen/Constents';

export default function ManageCategory(props) {
    const {open, setOpen,dispatch, CategoryDetails, setCategoryDetails} = props


  const handleClose = () => {
    setOpen(false);
  };



  const UpdateHandeler = () => {
      if(!CategoryDetails.name) return window.alert("Required Field Name is Empty!")
      if(!CategoryDetails.alias) return window.alert("Required Field alias is Empty!")
      if(!CategoryDetails._id) return window.alert("Required Field _id is Empty!")
      dispatch(CategoryAction(CATEGORY_UPDATE,CategoryDetails))
      setOpen(false)
  }

  const InsertHandeler = () => {
    

    if(!CategoryDetails.name) return window.alert("Required Field Name is Empty!")
    if(!CategoryDetails.alias) return window.alert("Required Field alias is Empty!")

    dispatch(CategoryAction(CATEGORY_INSERT,CategoryDetails))
    setOpen(false)
  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{CategoryDetails._id ?  "Update Category" : "Add New Category"}</DialogTitle>
        <hr className='m-0'/>
        <DialogContent>
            <label htmlFor="name" className='fw-bold text-muted'>Name</label>
          <TextField
            autoFocus
            margin="dense"
            value={CategoryDetails.name}
            onChange={(e) => setCategoryDetails({...CategoryDetails, name:e.target.value})}
            id="name"
            name='name'
            type="text"
            fullWidth
            variant="outlined"
          />
            <label htmlFor="alias" className='fw-bold text-muted'>Alias</label>
          <TextField
            autoFocus
            margin="dense"
            id="alias"
            onChange={(e) => setCategoryDetails({...CategoryDetails, alias:e.target.value})}
            value={CategoryDetails.alias}
            name='alias'
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CategoryDetails._id ? UpdateHandeler : InsertHandeler}>{CategoryDetails._id ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}