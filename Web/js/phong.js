//Tạo đối tượng service để thực hiện các phương thức GET,POST, PUT, DELETE
var empService = new EmployeeService()
// Xây dựng lớp đối tượng
function Employee(lastName, firstName, id, birthday, position) {
  this.lastName = lastName;
  this.firstName = firstName;

  this.id = id;

  this.birthday = birthday;

  this.position = position;
  this.calcSalary = function () {
    //position = "Sếp"
    //position = "Trưởng phòng"
    //position = "Nhân viên"
    switch (this.position) {
      case "Sếp":
        return 5000;
        break;
      case "Trưởng phòng":
        return 3000;
        break;
      case "Nhân viên":
        return 1000;
        break;
    }
  };
}

var employeeList = [];

//function 1: Thêm nhân viên
const addEmployee = function () {
  const lastName = document.getElementById("ho").value.trim();
  const firstName = document.getElementById("ten").value;
  const id = document.getElementById("msnv").value;
  const birthday = document.getElementById("datepicker").value;
  const position = document.getElementById("chucvu").value;
  var isValid =true;

  //Kiểm tra dữ liệu
// checkRequired(lastName, "lastNameError", "*Vui lòng nhập họ") &&
//     checkString(
//       lastName,
//       "lastNameError",
//       "*Vui lòng không nhập kí tự đặc biệt"
//     );

//   checkRequired(firstName, "firstNameError", "*Vui lòng nhập tên") &&
//     checkLength(
//       firstName,
//       "firstNameError",
//       "*Độ dài tên không phù hợp",
//       0,
//       10
//     );

  var isAdd = true;

  for (var i = 0; i < employeeList.length; i++) {
    if (id === employeeList[i].id) {
      alert(" ID've already been taken");
      isAdd = false;
    }
  }
  var employee = new Employee(lastName, firstName, id, birthday, position);
  if (isAdd) {
    var promise = empService.add(employee);

  promise.then(function(res){
    console.log("data",res.data);
    getData();
    renderEmployees();
  }
  ).catch(function(err){
    console.log('error',error)
  })
  }
  //Gọi api lưu vào server
  
  saveData();
};

//function 2: tạo giao diện bảng nhân viên
const renderEmployees = function (arr) {
  var htmlContent = "";
  arr = arr || employeeList;
  for (var i = 0; i < arr.length; i++) {
    htmlContent += `
		<tr>
			<td>${i + 1}</td>
			<td>${arr[i].lastName + " " + arr[i].firstName}</td>
			<td>${arr[i].id}</td>
			<td>${arr[i].birthday}</td>
			<td>${arr[i].position}</td>
			<td>${arr[i].calcSalary()}</td>
			<td>
				<button class='btn btn-danger' onclick="deleteEmployee('${
          arr[i].id
        }')">Xóa</button>
				<button class='btn btn-primary' onclick="getUpdateEmployee('${
          arr[i].id
        }')">Thanh toán</button>
			</td>
		</tr>`;
  }
  document.getElementById("tbodyEmployees").innerHTML = htmlContent;
};

//function 3: xóa nhân viên khỏi danh sách
const deleteEmployee = function (id) {
  //input: mã nhân viên
  //process: tìm vị trí => xóa =>render giao diện
  const index = parseInt(findById(id));
  if (index !== -1) {
    empService.delete(id).then(function(res){
      getData();
      renderEmployees();
      console.log('Xóa thành công!');
    }).catch(function(error){
      console.log(error);
    })
  }
};

//function 4:Cập nhật thông tin nhân viên
const getUpdateEmployee = function (id) {
  const index = parseInt(findById(id));
  if (index !== -1) {
    const updateUser = employeeList[index];
    //show thông tin lên form
    document.getElementById("ho").value = updateUser.lastName;
    document.getElementById("ten").value = updateUser.firstName;
    document.getElementById("msnv").value = updateUser.id;
    document.getElementById("datepicker").value = updateUser.birthday;
    document.getElementById("chucvu").value = updateUser.position;
    //disable: ô msnv
    document.getElementById("msnv").setAttribute("disabled", true);

    // ẩn nút thêm và hiện nút update
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
  }
};
const updateEmployee = function () {
  const lastName = document.getElementById("ho").value;
  const firstName = document.getElementById("ten").value;
  const id = document.getElementById("msnv").value;
  const birthday = document.getElementById("datepicker").value;
  const position = document.getElementById("chucvu").value;
  var updatedEmployee = new Employee(
    lastName,
    firstName,
    id,
    birthday,
    position
  );

  var promise = empService.update(updatedEmployee.id,updatedEmployee);
  promise.then(function(res){
    console.log("data",res.data);

        //xóa disable ô mã nhân viên
        document.getElementById("msnv").removeAttribute("disabled");

        //ẩn hiện nút
        document.getElementById("btnAdd").style.display = "block";
        document.getElementById("btnUpdate").style.display = "none";
    
        //clear form
        document.getElementById("btnReset").click();
        getData();
        renderEmployees();
  }
  ).catch(function(err){
    console.log('error',error)
  })
  //dựa vào id không đổi, tìm nhân viên củ nàm đâu trong mảng
  //đè nhân viên mới vào
  
};
const findEmployee = function () {
  const results = [];

  //1.lấy keyword
  const keyword = document.getElementById("txtSearch").value;

  for (var i = 0; i < employeeList.length; i++) {
    const currentEmployee = employeeList[i];
    const fullname = currentEmployee.lastName + " " + currentEmployee.firstName;
    const convertedFullName = nonAccentVietnamese(fullname.toLowerCase());
    const convertedKeyword = nonAccentVietnamese(keyword.toLowerCase().trim());
    if (keyword === currentEmployee.id) {
      results.push(currentEmployee);
      break;
    } else if (convertedFullName.indexOf(convertedKeyword) !== -1) {
      results.push(currentEmployee);
    }
  }
  console.log(results);
  renderEmployees(results);
};
//function: tìm vị trí theo id
const findById = function (id) {
  for (var i = 0; i < employeeList.length; i++) {
    if (id === employeeList[i].id) {
      return i;
    }
  }
  return -1;
};
//function: save data to local storage
const saveData = function () {
  //chuyển sang chuỗi JSON
  const employeeListJSON = JSON.stringify(employeeList);
  console.log(employeeListJSON);
  localStorage.setItem("employees", employeeListJSON);
};

const getData = function () {

  //Dùng axios để call lên api của backend lấy ds nhân viên có sẵn
  const fetchEmplPromise = axios({
    url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee",
    method: "GET",

  })

  const resolver = function(res){
    for (var i = 0; i < res.data.length; i++) {
      const currentEmp =  res.data[i];
      const newEmployee = new Employee(
        currentEmp.lastName,
        currentEmp.firstName,
        currentEmp.id,
        currentEmp.birthday,
        currentEmp.position
      );
      employeeList.push(newEmployee);
    }
    renderEmployees();
  }

  const rejecter = function(err){
    console.log(err);
  }
  fetchEmplPromise.then(resolver).catch(rejecter);
};

getData();

