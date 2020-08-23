//File tương tác dữ liệu với backend
const PhongService = function(){
    this.add = function (newPhong){
        return axios({
            url:"http://localhost:3000/phong", //url đường dẫn đến file lấy dữ liệu ở backend
            method:'POST',//Phương thức trao đổi dữ liệu với backend
            data: newPhong
        })
    }
    this.update = function(id,phongUpdate){
        return axios({
            url:"http://localhost:3000/phong/"+id,
            method: 'PUT',
            data:phongUpdate
        })
    }
    this.delete = function(id){
        return axios({
            url:'http://localhost:3000/phong/'+id,
            method:"DELETE"
        })
    }
    this.getAll = function(){
        return axios({
            url:'http://localhost:3000/phong',
            method:"GET"
        })
    }
}
