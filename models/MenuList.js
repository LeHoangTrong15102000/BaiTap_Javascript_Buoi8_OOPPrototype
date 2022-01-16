export class MenuList {
  constructor() {
    this.mnList = [];
  }

  addMenuList(menu) {
    this.mnList.push(menu);
  }

  renderMenu() {
    // Khi innerHTML vào thì nó sẽ đè nội dung cũ nên ta thêm biến kết quả ban đầu là tên của các thành phần trong menuList
    let ketQua = `
      <div class="row">
        <div class="col-3 font-weight-bold">Mã món</div>
        <div class="col-3 font-weight-bold">Tên món</div>
        <div class="col-3 font-weight-bold">Giá tiền</div>
        <div class="col-3 font-weight-bold">
          Thao tác
        </div>
      </div>
    `;

    ketQua += this.mnList.reduce((menuContent, item, index) => {
      // Biến lưu trữ đầu ra của mảng
      menuContent += `         
          <div class="row mt-3">
            <div class="col-3">${item.maMonAn}</div>
            <div class="col-3">${item.tenMonAn}</div>
            <div class="col-3">${item.giaTien}</div>
            <div class="col-3">
              <button class="btn btn-success text-white"  data-id="${item.maMonAn}" data-count="${item.soLuong}" onclick="addFood('${item.maMonAn}')">+</button>
              <button class="btn btn-danger text-white" data-id="${item.maMonAn}" data-count="${item.soLuong}" onclick="decreaseFood('${item.maMonAn}')">-</button>
            </div>
          </div>
      `;

      return menuContent;
    }, '');

    return ketQua;
  }

  checkoutMenu() {}
}
