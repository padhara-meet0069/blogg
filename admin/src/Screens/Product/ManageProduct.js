import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ProductAction } from '../../Actions/ProductActions';
import { PRODUCT_INSERT, PRODUCT_UPDATE } from '../../Commen/Constents';

export default function ManageProduct(props) {
    const { open, setOpen,category ,dispatch,ProductDetails, setProductDetails} = props


    const handleClose = () => {
        setOpen(false);
    };


    const UpdateHandler = () => {
        if(!ProductDetails.name) return window.alert("Required field name is Empty")
        if(!ProductDetails.alias) return window.alert("Required field alias is Empty")
        if(ProductDetails.category === "0") return window.alert("Please select category")

        dispatch(ProductAction(PRODUCT_UPDATE, ProductDetails))
        setOpen(false)

    }


    const InsertHandler = () => {
        if(!ProductDetails.name) return window.alert("Required field name is Empty")
        if(!ProductDetails.alias) return window.alert("Required field alias is Empty")
        if(ProductDetails.category === "0") return window.alert("Please select category")

        dispatch(ProductAction(PRODUCT_INSERT, ProductDetails))
        setOpen(false)
    }



    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{ProductDetails._id ? "Update Product" : "Add new Product"}</DialogTitle>
                <hr className='m-0'/>
                <DialogContent>
                    <label htmlFor="name" className='text-muted fw-bold'>Name</label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={ProductDetails.name}
                        onChange={(e) => setProductDetails({...ProductDetails, name:e.target.value})}
                        
                    />
                    <label htmlFor="alias" className='text-muted fw-bold'>Alias</label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="alias"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={ProductDetails.alias}
                        onChange={(e) => setProductDetails({...ProductDetails, alias:e.target.value})}
                    />
                    <label htmlFor="alias" className='text-muted fw-bold'>Categories</label>
                    <select className='mt-2' value={ProductDetails.category} onChange={(e) => setProductDetails({...ProductDetails, category:e.target.value})}>
                        <option value="0">--select category--</option>
                        {
                            category.map((x) => {
                                return <option key={x._id} value={x._id}>{x.name}</option>
                            })
                        }
                    </select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={ProductDetails._id ? UpdateHandler : InsertHandler}>{ProductDetails._id ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}