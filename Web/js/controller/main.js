var guestService = new GuestService();
var thueService = new ThueService();
var guestList = [];

const addGuest = function () {
  const ten = document.getElementById("ten").value;
  const makh = document.getElementById("makh").value.trim();
  const loaikh = document.getElementById("loaikh").value;
  const cmnd = document.getElementById("cmnd").value;
  const diachi = document.getElementById("diachi").value;
  const mathue = document.getElementById("mathue").value;

  var isAdd = true;

  for (var i = 0; i < guestList.length; i++) {
    if (makh === guestList[i].makh) {
      alert(" Mã Khách hàng đã được sử dụng");
      isAdd = false;
    }
  }
  var guest = new Guest(makh, ten, loaikh, cmnd, diachi, mathue);
  if (isAdd) {
    var promise = guestService.add(guest);
    promise
      .then(function (res) {
        getData();
        renderGuests();
      })
      .catch(function (err) {
        console.log("error", err);
      });
  }
};

const renderGuests = function (arr) {
  var htmlContent = "";
  arr = arr || guestList;

  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].mathue);
    htmlContent += `
		<tr>
			<td>${i + 1}</td>
      <td>${arr[i].makh}</td>
      <td>${arr[i].ten}</td>
			<td>${arr[i].loai}</td>
			<td>${arr[i].cmnd}</td>
			<td>${arr[i].diachi}</td>
			<td>
				<span>${arr[i].mathue}</span>
				<button class='btn btn-primary btnChooser' onclick="getUpdateGuest('${
          arr[i].makh
        }')">Thuê phòng</button>
        <input type="text" class='hiddenForm' id='roomInput-${
          arr[i].makh
        }' placeholder="Mã phòng" />
        <button class='btn btn-primary hiddenForm' id='roomConfirm-${
          arr[i].makh
        }' onclick="updateGuest('${arr[i].makh}')">Thuê</button>
        <button class='btn btn-danger' onclick="deleteGuest('${
          arr[i].makh
        }')">Xóa</button>
			</td>
		</tr>`;
  }
  document.getElementById("tbodyGuests").innerHTML = htmlContent;
};

const deleteGuest = function (id) {
  const index = parseInt(findById(id));
  if (index !== -1) {
    guestService
      .delete(id)
      .then(function (res) {
        getData();
        renderGuests();
        console.log("Xóa thành công!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
const getUpdateGuest = function (id) {
  document.getElementById(`roomInput-${id}`).style.display = "block";
  document.getElementById(`roomConfirm-${id}`).style.display = "block";
  const btnChooser = document.getElementsByClassName("btnChooser");
  const index = findById(id);
  btnChooser[index].style.display = "none";
};
const addThue = function (thue) {
  var promise = thueService.add(thue);
  promise
    .then(function (res) {
      console.log("rent success");
    })
    .catch(function (err) {
      console.log("error", err);
    });
};
const updateGuest = function (id) {
  const index = parseInt(findById(id));
  const guestUpdate = guestList[index];
  const input = document.getElementById(`roomInput-${id}`).value;
  const newThue = new Thue(input);
  
  guestUpdate.mathue = input + "-t";
  console.log(guestUpdate);
  if (index !== -1) {
    guestService
      .update(id, guestUpdate)
      .then(function (res) {
        getData();
        renderGuests();
        console.log("Thuê thành công!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addThue(newThue);
};

const findById = function (id) {
  for (var i = 0; i < guestList.length; i++) {
    if (id === guestList[i].makh) {
      return i;
    }
  }
  return -1;
};

const getData = function () {
  guestList=[];
  var promise = guestService.getAll();
  promise
    .then(function (res) {
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        const currentGuest = res.data[i];
        const newGuest = new Guest(
          currentGuest.makh,
          currentGuest.ten,
          currentGuest.loai,
          currentGuest.cmnd,
          currentGuest.diachi,
          currentGuest.mathue
        );
        guestList.push(newGuest);
      }
      renderGuests();
    })
    .catch(function (err) {
      console.log("error", err);
    });
};

getData();
