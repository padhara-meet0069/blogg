import { Button, Switch, TextField } from "@mui/material"
import { Editor } from "@tinymce/tinymce-react"
import { useState } from "react";

export default function AddPostScreen() {

    const [BlogDetails, setBlogDetails] = useState({
        title:"",
        alias:"",
        product:'0',
        content:"",
        headerScript:"",
        bodyScript:"",
        metaTage:"",
        views:5000,
        fetureImage:"",
        isPublished:true
    })



    return <>
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h3>Add Post</h3>
            <div className="d-flex gap-2">
                <div>
                    <label htmlFor="publish">{BlogDetails.isPublished ? "Publish" : "Unpublish"}</label>
                    <Switch id="publish" onChange={()=> setBlogDetails({...BlogDetails,isPublished:!BlogDetails.isPublished})} checked={BlogDetails.isPublished} />
                </div>
                <Button variant="outlined">Create Post</Button>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-12 col-md-4 mb-2">
                <label htmlFor="title" className="text-muted fw-bold">Title</label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name='title'
                    type="text"
                    fullWidth
                    onChange={(e) => setBlogDetails({...BlogDetails,title:e.target.value})}
                    variant="outlined"
                />
            </div>
            <div className="col-12 col-md-4 mb-2">
                <label htmlFor="alias" className="text-muted fw-bold">Alias</label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="alias"
                    name='alias'
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setBlogDetails({...BlogDetails,alias:e.target.value})}
                />
            </div>
            <div className="col-12 col-md-4 mb-2">
                <label htmlFor="product" className="text-muted fw-bold mb-2">Product</label>
                <select onChange={(e) => setBlogDetails({...BlogDetails,product:e.target.value})} name="product" id="product">
                    <option value="0">--select product--</option>
                </select>
            </div>
            <div className="col-12 mb-2">
                <div className="row">
                    <div className="col-12 col-md-8 mb-2">
                        <label htmlFor="content" className="text-muted fw-bold mb-2">Content</label>
                        <Editor
                            onKeyUp={(e,editor) => {
                               setBlogDetails({...BlogDetails, content:editor.getContent()})
                            }}
                            apiKey="0br1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                            init={{
                                selector: 'textarea',
                                height: 620,
                                mobile: {
                                    theme: 'mobile',
                                    plugins: 'autosave lists autolink',
                                    toolbar: 'undo bold italic styleselect'
                                },
                                menubar: true,
                                plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row">
                            <div className="col-12 mb-2 d-flex flex-column gap-2">
                                <label className="text-muted fw-bold mb-2">Feture Image</label>
                                <div style={{ height: "250px", border: "2px solid #1976d2", width: "100%" }}>
                                </div>
                                <Button variant="contained" fullWidth>Select Feture Image</Button>
                            </div>
                            <div className="col-12 mb-2">
                                <label htmlFor="views" className="text-muted fw-bold">Views</label>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="views"
                                    name='views'
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setBlogDetails({...BlogDetails,views:Number(e.target.value)})}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label htmlFor="metaTage" className="text-muted fw-bold mb-2">Meta Tages</label>
                                <textarea id="metaTage" onChange={(e) => setBlogDetails({...BlogDetails,metaTage:e.target.value})} rows={6} cols={3} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                        <label htmlFor="headerScript" className="text-muted fw-bold mb-2">Header Script</label>
                        <textarea id="headerScript" onChange={(e) => setBlogDetails({...BlogDetails,headerScript:e.target.value})} rows={6} cols={3} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="bodyScript" className="text-muted fw-bold mb-2">Body Script</label>
                        <textarea id="bodyScript" onChange={(e) => setBlogDetails({...BlogDetails,bodyScript:e.target.value})} rows={6} cols={3} />
                    </div>
                </div>
            </div>
        </div>

    </>
}