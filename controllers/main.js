// Bài 2

// Render giao diện menu cho món ăn
let arrMonAn = [
  { maMonAn: 1, tenMonAn: 'Nước lẩu haidilao', giaTien: 100 },
  { maMonAn: 2, tenMonAn: 'Mì cay thành đô', giaTien: 200 },
  { maMonAn: 3, tenMonAn: 'Mực bạch ngọc', giaTien: 300 },
];

let invoiceList = []; // tạo mảng chứa các đối tượng món ăn

// Import các lớp đối tượng của Menu vào main
import { Menu } from '../models/Menu.js';
import { MenuList } from '../models/MenuList.js';

// Import các đối tượng của hóa đơn vào main
import { Invoice } from '../models/Invoice.js';
import { InvoiceList } from '../models/InvoiceList.js';

// Khai báo thể hiện mảng của lớp đối tượng menu
const menuList = new MenuList();

// Khai báo thể hiện mảng của lớp đối tượng invoice
const invList = new InvoiceList();

// Hàm DOM tới id, class
const getElementId = (id) => {
  return document.querySelector(id);
};

// Hàm hiển thị danh sách menu món
const showMenuList = () => {
  let divMenuList = getElementId('.card-body');

  // Tạo những đối tượng menu(menu) sau đó add từng đối tượng menu vào trong danh sách menu(MenuList)
  // Duyệt mảng data của chúng ta
  arrMonAn.map((item, index) => {
    // Hàm map() duyệt qua một mảng thực hiện yêu cầu nào đó rồi trả lại mảng mới
    let menu = new Menu(
      item.maMonAn,
      item.tenMonAn,
      item.soLuong,
      item.giaTien
    );

    // Sau khi đã tạo ra rồi thì chúng ta add nó vào lớp đối tượng danh sách menu
    menuList.addMenuList(menu); // add đối tượng menu vào trong mảng Menu
  });

  divMenuList.innerHTML = menuList.renderMenu();
  console.log(menuList.mnList); // hiện thử các đối tượng bên trong mảng
};
showMenuList(); // Gọi hàm show ra giao diện

// Đầu tiên sẽ xây dựng hàm showInvoice, sau đó click vào thì mới cho nó hiện ra
// Xây dựng sự kiện cho nút nhấn Increase, show món ăn trong menu lên hóa đơn(Hàm render hóa đơn)
const showInfoInvoice = (arrInvoice) => {
  let divInvoiceList = getElementId('tbody'); // Thêm thuộc tính hóa đơn vào đây

  let ketQua = '';
  for (let invoice of arrInvoice) {
    ketQua += `
      <tr>
        <td>${invoice.maMonAn}</td>
        <td>${invoice.tenMonAn}</td>
        <td>${invoice.soLuong}</td>
        <td>${invoice.giaTien}</td>
      </tr>
    `;
  }
  divInvoiceList.innerHTML = ketQua;
  return ketQua;
};

// Xây dụng hàm check món ăn
const checkArrInvoice = (invoiceList, monAn) => {
  const findMonAn = (obj) => obj.maMonAn === monAn.maMonAn; // mã món ăn trong hóa đơn trùng với mã món ăn chuẩn bị click
  let result = invoiceList.some(findMonAn); // Kiểm tra xem trong hóa đơn đã có món này chưa

  return result;
};

// Xây dựng hàm Thêm món ăn vào hóa đơn
const addFood = (maMonAnClick) => {
  for (let monAn of menuList.mnList) {
    if (monAn.maMonAn === Number(maMonAnClick)) {
      let resultInvoice = checkArrInvoice(invoiceList, monAn);

      // let inv = new Invoice();
      // inv.maMonAn = monAn.maMonAn;
      // inv.tenMonAn = monAn.tenMonAn;
      // inv.soLuong = monAn.soLuong;
      // inv.giaTien = monAn.giaTien;

      if (resultInvoice === false) {
        // Nếu trong hóa đơn chưa có món ăn đó

        // Tạo đối tượng hóa đơn
        let invoice = new Invoice();

        invoice.maMonAn = monAn.maMonAn;
        invoice.tenMonAn = monAn.tenMonAn;
        invoice.soLuong = 1; // Gán cho số lượng 1 nếu món ăn lần đầu được thêm vào
        invoice.giaTien = monAn.giaTien;

        invoiceList.push(invoice); // Thêm đối tượng invoice vào mảng
      } else {
        // Ngược lại nếu đã có món ăn tồn tại
        let invIndex = invoiceList.findIndex(
          (obj) => obj.maMonAn === monAn.maMonAn
        );
        invoiceList[invIndex].soLuong += 1; // tăng số lượng mỗi lần click
        invoiceList[invIndex].giaTien =
          Number(invoiceList[invIndex].soLuong) * monAn.giaTien; // tăng giá tiền theo số lượng món ăn
      }
    }
  }

  // render hóa đơn ra giao diện
  showInfoInvoice(invoiceList);

  // Render ra tổng số tiền
  showTotalMoney(invoiceList);
};
console.log(invoiceList);

window.addFood = addFood;

// Xây dựng hàm tính tổng

// Xây dựng hàm tính tổng số tiền
const showTotalMoney = (moneyList) => {
  let divTotalMoney = getElementId('tfoot'); // thêm giá trị của thuộc tính thành tiền vào đây

  // Biến kết quả
  let ketQua = `
    <tr>
      <td></td>
      <td></td>
      <td class="font-weight-bold">Thành tiền: </td>
      <td></td>
    </tr>
  `;

  ketQua += moneyList.reduce((moneyTotal, item, index) => {
    // Tạo đối tượng invoice
    let invoice = new Invoice(
      item.maMonAn,
      item.tenMonAn,
      item.soLuong,
      item.giaTien
    );

    moneyTotal += Number(invoice.giaTien);

    return moneyTotal;
  }, 0);

  divTotalMoney.innerHTML = ketQua;
  return ketQua;
};

// Xây dựng hàm giảm số lượng món ăn trong hóa đơn
const decreaseFood = (event) => {
  // Khi nhấn vào Decrease
  let invoiceId = event.target.getAttribute('data-id'); // lấy ra Id của món ăn trong menu
};

window.decreaseFood = decreaseFood;
