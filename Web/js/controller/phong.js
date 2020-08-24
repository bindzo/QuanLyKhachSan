var phongService = new PhongService();
var phongList = [];

const addPhong = function () {
  const ten = document.getElementById("ten").value;
  const makh = document.getElementById("makh").value.trim();
  const loaikh = document.getElementById("loaikh").value;
  const cmnd = document.getElementById("cmnd").value;
  const diachi = document.getElementById("diachi").value;
  const mathue = document.getElementById("mathue").value;

  var isAdd = true;

  for (var i = 0; i < phongList.length; i++) {
    if (makh === phongList[i].makh) {
      alert(" Mã Khách hàng đã được sử dụng");
      isAdd = false;
    }
  }
  var phong = new Phong(makh, ten, loaikh, cmnd, diachi, mathue);
  if (isAdd) {
    var promise = phongService.add(phong);
    promise
      .then(function (res) {
        getPhongData();
        renderPhongs();
      })
      .catch(function (err) {
        console.log("error", err);
      });
  }
};

const renderPhongs = function (arr) {
  var htmlContent = "";
  arr = arr || phongList;

  for (var i = 0; i < arr.length; i++) {
    htmlContent += `
		<tr>
			<td>${i + 1}</td>
      <td>${arr[i].maphong}</td>
      <td>${arr[i].loai}</td>
			<td>${arr[i].gia}</td>
			<td>${arr[i].tinhtrang}</td>
			<td>${arr[i].ghichu}</td>
			<td>
			
        <button class='btn btn-danger' onclick="deletePhong('${
          arr[i].maphong
        }')">Xóa</button>
        <button class='btn btn-danger' onclick="payPhong('${
          arr[i].maphong
        }')">Xóa</button>
			</td>
		</tr>`;
  }
  const bodyPhong = document.getElementById("tbodyPhong");
  if(bodyPhong!== null)
  {
    bodyPhong.innerHTML = htmlContent;
  }
};
const deletePhong = function (id) {
  const index = parseInt(findByIdPhong(id));
  if (index !== -1) {
    phongService
      .delete(id)
      .then(function (res) {
        getPhongData();
        renderPhongs();
        console.log("Xóa thành công!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
const getUpdatePhong = function (id) {
  document.getElementById(`roomInput-${id}`).style.display = "block";
  document.getElementById(`roomConfirm-${id}`).style.display = "block";
  const btnChooser = document.getElementsByClassName("btnChooser");
  const index = findByIdPhong(id);
  btnChooser[index].style.display = "none";
};
const updatePhong = function (id) {
  const index = parseInt(findByIdPhong(id));
  console.log(phongList);
  const phongUpdate = phongList[index];
  phongUpdate['tinhtrang'] = 'sudung';
  console.log(phongUpdate);
  if (index !== -1) {
    phongService
      .update(id, phongUpdate)
      .then(function (res) {
        getPhongData();
        renderPhongs();
        console.log("thành công!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
const checkPhong = function (id) {
  for (let i = 0; i < phongList.length; i++) {
    if (phongList[i]["maphong"]=== id &&phongList[i]["tinhtrang"] === "trong") {
      return true;
    }
  }
  return false;

};

const findByIdPhong = function (id) {
  for (var i = 0; i < phongList.length; i++) {
    if (id === phongList[i].maphong) {
      return i;
    }
  }
  return -1;
};

const getPhongData = function () {
  phongList = [];
  var promise = phongService.getAll();
  promise
    .then(function (res) {
      for (var i = 0; i < res.data.length; i++) {
        const currentPhong = res.data[i];
        const newPhong = new Phong(
          currentPhong.maphong,
          currentPhong.loai,
          currentPhong.ghichu,
          currentPhong.tinhtrang
        );
        phongList.push(newPhong);
      }
      renderPhongs();
    })
    .catch(function (err) {
      console.log("error", err);
    });
  return phongList;
};

getPhongData();
