import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GalleryAction } from "../../Actions/GalleryActions";
import { GALLARY_DELETE, GALLARY_INSERT, GALLARY_LIST } from "../../Commen/Constents";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ContextMenu from "./ContextMenu";

export default function MediaScreen() {
    const dispatch = useDispatch()
    const [selectedMedia, setselectedMedia] = useState({})
    const Gallery = useSelector(state => state.Gallery)
    const [ContextOpen, setContextOpen] = useState("")
    // eslint-disable-next-line 
    const { loading, error, gallery } = Gallery




    useEffect(() => {
        dispatch(GalleryAction(GALLARY_LIST))
    }, [dispatch])



    const UploadHandeler = (e) => {
        let file = e.target.files
        const formData = new FormData()
        let i =0
        while (i < file.length) {
            formData.append("file", file[i])
            i++
        }
        dispatch(GalleryAction(GALLARY_INSERT, formData))
    }





    const selecthandeler = (fileDetails) => {
        const data = { ...selectedMedia }
        if (data[fileDetails._id]) {
            delete data[fileDetails._id]
        } else {
            data[fileDetails._id] = fileDetails
        }
        setselectedMedia({ ...data })
    }


    const RemoveHandeler = async () => {
        try {
            let ids = Object.keys(selectedMedia)
            if (ids.length <= 0) {
                return window.alert("Please select a Image !")
            }

            if (!window.confirm("Are you sure to delete this media's?")) {
                return
            }

            dispatch(GalleryAction(GALLARY_DELETE, ids))
            setselectedMedia({})
        } catch (error) {
            console.log(error);
        } 
    }


    // document.body.addEventListener("click", () => {
    //     setContextOpen("")
    // })

    // document.addEventListener()


    window.addEventListener("click", () => {
        setContextOpen("")
    })



    return <>
        <div className="d-flex justify-content-between align-items-center">
            <h3>Blog Gallery</h3>
            <Button onClick={RemoveHandeler} variant="outlined" color="error">Delete</Button>
        </div>
        <hr />

        <div className="row">
            <div className="col-12 col-md-4 col-lg-3 mb-3">
                <IconButton color="primary" style={{ width: "100%", height: "250px", borderRadius: 0, border: "3px dashed #1976d2" }}>
                    <label htmlFor="file" className="d-flex justify-content-center align-items-center" style={{ width: "100%", display: "block", height: "100%" }}>
                        <AddAPhotoIcon style={{ fontSize: "3rem" }} />
                        <input onChange={UploadHandeler} multiple={true} type="file" id="file" hidden={true} />
                    </label>
                </IconButton>
            </div>
            {
                gallery.map((x) => {
                    return <div style={{position:'relative', top:0,left:0}} key={x._id} className="col-12 col-md-4 col-lg-3 mb-3">
                       {
                        ContextOpen === x._id ? <ContextMenu id={x._id} url={x.url} /> : ""
                       }
                        <img
                        onContextMenu={(e) => {
                            e.preventDefault()
                            setContextOpen(x._id)
                        }}
                         style={{ border: selectedMedia[x._id] ? "2px solid #1976d2" : "none" }} 
                         onClick={() => selecthandeler(x)} src={x.url} alt={x.name} width={"100%"} height={"250px"} />
                    </div>
                })
            }


        </div>
    </>
}