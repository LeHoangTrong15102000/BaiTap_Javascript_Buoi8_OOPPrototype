export class InvoiceList {
  constructor() {
    // Chứa danh sách các món trong hóa đơn
    this.invoiceList = []; // chứa mảng các thuộc tính của hóa đơn
    this.totalMoney = []; // Chứa mảng các con số của thuộc tính thành tiền
  }

  // Hàm thêm món ăn vào mảng các thuộc tính của hóa đơn
  addInvoice(invoice) {
    this.invoiceList.push(invoice);
  }

  // Hàm thêm số tiền ở các món vào một mảng riêng
  addMoney(money) {
    this.totalMoney.push(money);
  }

  renderTotalMoney() {}
  // Phải lấy ra được cái mảng chứa giá tiền các món trong hóa đơn
  // Xong rồi mới lập qua cái mảng đó tính tổng rồi mới để hiện ra UI

  // Phương thức tính tổng tiền
}
