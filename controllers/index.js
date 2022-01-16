// Bài 1 Thêm vào các món ăn trong quán ăn

let mangFood = [];
let kiemTra = new Validation();

// Click vào nút thêm món ăn
document.querySelector('#btnThemMonAn').onclick = () => {
  // khởi tạo ra danh sách các món ăn qua models

  let eating = new Food();

  // Lấy thông tin người dùng nhập vào mảng
  eating.maMonAn = document.querySelector('#maMonAn').value;
  eating.tenMonAn = document.querySelector('#tenMonAn').value;
  eating.giaTien = document.querySelector('#giaTien').value;
  eating.anhMonAn = document.querySelector('#linkAnh').value;

  // Kỹ thuật đặt cờ hiệu
  // kiểm tra input người dùng nhập vào có bị rỗng hay không

  let valid = true;

  // Kiểm tra các input của người dùng nhập vào có để trống hay không
  valid &=
    kiemTra.kiemTraRong(eating.maMonAn, '#spanMaMonAn') &
    kiemTra.kiemTraRong(eating.tenMonAn, '#spanTenMonAn') &
    kiemTra.kiemTraRong(eating.giaTien, '#spanGiaMonAn') &
    kiemTra.kiemTraRong(eating.anhMonAn, '#spanAnhMonAn');

  // Kiểm tra tất cả là kí tự
  valid &= kiemTra.kiemTraTatCaKyTu(
    eating.tenMonAn,
    '#error_allLetter_tenMonAn'
  );

  // Kiểm tra tất cả là số
  valid &= kiemTra.kiemTraTatCaLaSo(eating.giaTien, '#error_isNumber_giaMonAn');

  // Kiểm tra giá trị truyền hợp lệ hay không
  valid &= kiemTra.kiemTraGiaTri(
    eating.giaTien,
    '#error_minMaxValue_giaMonAn',
    20000,
    150000
  );

  // Kiểm tra độ dài mã món ăn
  valid &= kiemTra.kiemTraDoDai(
    eating.maMonAn,
    '#error_minMaxLength_maMonAn',
    1,
    3
  );

  if (!valid) {
    // Nếu valid không phải là true=> false => dừng chương trình lại
    return;
  }

  // Lưu thông tin món ăn vào mảng
  mangFood.push(eating);

  // Lưu dữ liệu sinh viên trong mảng vào storage()
  saveStorage();

  //  Render mảng món ăn ra table giao diện người dùng
  renderTable(mangFood);

  // Sau khi render ra table thì clearInput người dùng đi
  clearInput();
};

// Xây dựng hàm render ra giao diện table cho người dùng
const renderTable = (arrMonAn) => {
  // Lặp qua để lấy ra từng phần tử của món ăn sau đó cho hiện ra giao diện
  let ketQua = ''; // lưu các giá trị của món ăn ra table khi return lại
  for (let food of arrMonAn) {
    // Lặp qua các phần tử trong mảng sau đó render table trong giao diện người dùng
    // Phải lấy ra các thuộc tính đã được định nghĩa sẵn trong class SinhVien
    // Khai báo lớp đối tượng sau đó truyền vào parameter trong lớp đối tượng
    // Vừa khởi tạo vừa truyền giá trị cho nó luôn, để mắc công mỗi lần phải gán giá trị cho mỗi thuộc tính của class

    let eating = new Food(
      food.maMonAn,
      food.tenMonAn,
      food.giaTien,
      food.anhMonAn
    );

    // Gọi ra từng thuộc tinh của models
    ketQua += `
    <tr>
      <td>${eating.maMonAn}</td>
      <td>${eating.tenMonAn}</td>
      <td>${eating.giaTien}</td>
      <td>
        <img style="width: 100px; height: 100px" src="${eating.anhMonAn}"/>
      </td>
      <td>
        <button class="btn btn-primary" onclick="chinhSuaMonAn('${food.maMonAn}')">Sửa</button>
        <button class="btn btn-danger" onclick="xoaMonAn('${food.maMonAn}')">Xóa</button>
      </td>
    </tr>`;
  }

  // Sau khi lặp xong cho hiện ra table giao diện
  // Cuối cùng là cho return lại kết quả
  document.querySelector('tbody').innerHTML = ketQua;
  return ketQua;
};

// Xây dựng hàm lưu vào local Storage
function saveStorage() {
  //Biến đổi mảng món ăn thành chuỗi [] => '[]'
  var sMangMonAn = JSON.stringify(mangFood); // []
  //Lưu vào localstorage
  localStorage.setItem('mangMonAn', sMangMonAn);
}

// Xây dựng hàm lấy dữ liệu từ localStorage ra table
function getStorage() {
  //Trước khi lấy kiểm tra

  //  Nếu mà có cái kho lưu trữ này thì làm gì tiếp theo
  if (localStorage.getItem('mangMonAn')) {
    //Lấy giá trị từ localstorage ra => chuỗi
    var sMangMonAn = localStorage.getItem('mangMonAn');
    //Biến chuỗi thành mảng gán cho biến mangFood
    mangFood = JSON.parse(sMangMonAn);

    // console.log('mảng sinh viên',sMangSinhVien);
    // console.log('mảng sinh viên',mangSinhVien);

    //Gọi hàm tạo bảng từ mảng sinh viên
    renderTable(mangFood);
  }
}
// Gọi hàm lấy giá trị mảng trong kho LocalStorage
getStorage();

// Xây dựng nút xóa món ăn
const xoaMonAn = (maMonAnClick) => {
  // console.log('maMonAnClick', maMonAnClick);

  // Lặp qua cái mảng món ăn để lấy ra maMonAn cần Xóa
  for (let food of mangFood) {
    if (food.maMonAn === maMonAnClick) {
      // Nếu click trúng id trùng với id maMonAnClick
      mangFood.splice(food, 1); // Xóa luôn cái món đó và xóa 1 phần tử trong mảng
    }
  }

  // Sau khi xóa render lại cái giao diện
  renderTable(mangFood);

  // Lưu lại cái  LocalStorage
  saveStorage();
};

// Xây dựng nút chỉnh sửa món ăn
const chinhSuaMonAn = (maMonAnClick) => {
  console.log('maMonAnClick', maMonAnClick);
};

// Xây dựng hàm nhập xong thì clearInput để người dùng nhập tiếp

const clearInput = () => {
  document.querySelector('#maMonAn').value = '';
  document.querySelector('#tenMonAn').value = '';
  document.querySelector('#giaTien').value = '';
  document.querySelector('#linkAnh').value = '';
};

// Xây dựng hàm cập nhập Món ăn
const updateFood = () => {};
