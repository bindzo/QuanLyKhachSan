//File tương tác dữ liệu với backend
const HoaDonService = function(){
    this.add = function (newHoaDon){
        return axios({
            url:"http://localhost:3000/hoadon", //url đường dẫn đến file lấy dữ liệu ở backend
            method:'POST',//Phương thức trao đổi dữ liệu với backend
            data: newHoaDon
        })
    }
    
}
