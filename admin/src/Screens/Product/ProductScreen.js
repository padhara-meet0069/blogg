import { Button, IconButton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProductAction } from "../../Actions/ProductActions"
import { CATEGORY_LIST, PRODUCT_DELETE, PRODUCT_LIST } from "../../Commen/Constents"
import { Delete, Edit } from "@mui/icons-material"
import ManageProduct from "./ManageProduct"
import { CategoryAction } from "../../Actions/CategoryActions"

export default function ProductScreen() {
    const [open, setopen] = useState(false)
    const initProductDetails = {
        name:"",
        alias:'',
        category:"0",
    }
    const [ProductDetails, setProductDetails] = useState(initProductDetails)
    const dispatch = useDispatch()
    const Product = useSelector(state => state.Product)
    const Category = useSelector(state => state.Category)
    const {category} = Category
    const { products, loading } = Product


    useEffect(() => {
        dispatch(ProductAction(PRODUCT_LIST))
        dispatch(CategoryAction(CATEGORY_LIST))
    }, [dispatch])


    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "alias", headerName: "Alias", width: 150 },
        {
            field: "category", headerName: "category", width: 150, renderCell: (cell) => {
                return cell.row.category.name
            }
        },
        {
            field: "actions", headerName: "Actions", flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color="primary" onClick={() => {
                        setProductDetails({
                            name:cell.row.name,
                            alias:cell.row.alias,
                            category:cell.row.category._id,
                            _id:cell.row._id
                        })
                        setopen(true)
                    }}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={async() => {
                        if(!window.confirm("Are you sure to Remove this product?")) return
                        dispatch(ProductAction(PRODUCT_DELETE, cell.row._id))
                    }}>
                        <Delete />
                    </IconButton>
                </>
            }
        },

    ]


    return <>
    <ManageProduct dispatch={dispatch} ProductDetails={ProductDetails} setProductDetails={setProductDetails} category={category} open={open} setOpen={setopen} />
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Product</h3>
            <Button variant="outlined" onClick={() => {
                setProductDetails(initProductDetails)
                setopen(true)
            }}>Add Product</Button>
        </div>
        <div className="row">
            <div className="col-12">
                <DataGrid
                    rows={[...products]}
                    loading={loading}
                    getRowId={(e) => e._id}
                    columns={[...columns]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    autoHeight={true}
                />
            </div>
        </div>
    </>
}