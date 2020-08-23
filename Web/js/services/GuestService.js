//File tương tác dữ liệu với backend
const GuestService = function(){
    this.add = function (newGuest){
        return axios({
            url:"http://localhost:3000/guest", //url đường dẫn đến file lấy dữ liệu ở backend
            method:'POST',//Phương thức trao đổi dữ liệu với backend
            data: newGuest
        })
    }
    this.update = function(id,guestUpdate){
        return axios({
            url:"http://localhost:3000/guest/"+id,
            method: 'PUT',
            data:guestUpdate
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
