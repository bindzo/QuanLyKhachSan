//File tương tác dữ liệu với backend
const ThueService = function(){
    this.add = function (newThue){
        return axios({
            url:"http://localhost:3000/thue", //url đường dẫn đến file lấy dữ liệu ở backend
            method:'POST',//Phương thức trao đổi dữ liệu với backend
            data: newThue
        })
    }
    this.delete = function(id){
        return axios({
            url:'http://localhost:3000/thue/'+id,
            method:"DELETE"
        })
    }
}
