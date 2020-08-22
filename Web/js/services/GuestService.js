//File tương tác dữ liệu với backend
const GuestService = function(){
    this.add = function (newGuest){
        return axios({
            url:"http://localhost:3000/guest", //url đường dẫn đến file lấy dữ liệu ở backend
            method:'POST',//Phương thức trao đổi dữ liệu với backend
            data: newGuest
        })
    }
    this.update = function(id,employeeUpdate){
        return axios({
            url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee/"+id,
            method: 'PUT',
            data:employeeUpdate
        })
    }
    this.delete = function(id){
        return axios({
            url:'http://localhost:3000/guest/'+id,
            method:"DELETE"
        })
    }
    this.getAll = function(){
        return axios({
            url:'http://localhost:3000/guest',
            method:"GET"
        })
    }
}
export default GuestService;