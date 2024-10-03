import axios from "axios"

class ApiHelper{
    constructor(){
        this.baseURL ="http://localhost:5000"
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            config.headers["token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AMTIzIiwiX2lkIjoiNjU2ODg5NDUzOThlMTI5NDdjZTcwNTEzIiwiaWF0IjoxNzAxMzUwMzY3LCJleHAiOjE3MDM5NDIzNjd9.xXt-9pvC-9IGTb3OSMgS8xQulmY6JvUeUjEis5ZCAlU"
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
    }

    getCategory(){
        return axios.get(`${this.baseURL}/category`)
    }

    addCategory(data){
        return axios.post(`${this.baseURL}/category`, data)
    }

    updateCategory(data){
        return axios.put(`${this.baseURL}/category`, data)
    }

    deleteCategory(id){
        return axios.delete(`${this.baseURL}/category/${id}`)
    }

    getProduct(){
        return axios.get(`${this.baseURL}/product`)
    }

    updateProduct(data){
        return axios.put(`${this.baseURL}/product`, data)
    }

    insertProduct(data){
        return axios.post(`${this.baseURL}/product`, data)
    }

    deleteProduct(id){
        return axios.delete(`${this.baseURL}/product/${id}`)
    }

    listGallery(){
        return axios.get(`${this.baseURL}/file`)
    }

    uploadFile(file){
        return axios.post(`${this.baseURL}/file`, file)
    }

    deleteFiles(ids){
        return axios.put(`${this.baseURL}/file/delete`, {ids:ids})
    }

  
}

const apiHelper = new ApiHelper()
export default apiHelper