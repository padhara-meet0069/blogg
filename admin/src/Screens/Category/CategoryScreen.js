import { useDispatch, useSelector } from "react-redux"
import { CategoryAction } from "../../Actions/CategoryActions"
import { CATEGORY_DELETE, CATEGORY_LIST } from "../../Commen/Constents"
import { useEffect, useState } from "react"
import { Button, IconButton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Delete, Edit } from "@mui/icons-material"
import ManageCategory from "./ManageCategory"

export default function CategoryScreen() {
    const [open, setopen] = useState(false)
    const initCategoryDetails = {
        name:"",
        alias:''
    }
    const [CategoryDetails, setCategoryDetails] = useState(initCategoryDetails)
    const dispatch = useDispatch()
    const CategoryList = useSelector(state => state.Category)

    const { CATEGORY_LOADING, category } = CategoryList




    useEffect(() => {
        dispatch(CategoryAction(CATEGORY_LIST))
    }, [dispatch])



    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Name", width: 100 },
        { field: "alias", headerName: "Alias", width: 100 },
        {
            field: "actions", headerName: "Actions", flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color="primary" onClick={() => {
                        setCategoryDetails({name:cell.row.name, alias:cell.row.alias, _id:cell.row._id})
                        setopen(true)
                    }}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => {
                        if(!window.confirm("Are you sure to remove this category?")){
                            return
                        }

                        dispatch(CategoryAction(CATEGORY_DELETE, cell.row._id))

                    }}>
                        <Delete />
                    </IconButton>
                </>
            }
        },
    ]

    return <>
        <ManageCategory dispatch={dispatch} CategoryDetails={CategoryDetails} setCategoryDetails={setCategoryDetails} open={open} setOpen={setopen} />
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Catetgory</h3>
            <Button variant="outlined" onClick={() => {
                setCategoryDetails(initCategoryDetails)
                setopen(true)
            }} >Add Category</Button>
        </div>
        <div className="row">
            <div className="col-12">
                <DataGrid
                    rows={[...category]}
                    CATEGORY_LOADING={CATEGORY_LOADING}
                    getRowId={(e) => e._id}
                    columns={columns}
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