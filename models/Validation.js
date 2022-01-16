// Xây dựng lớp đối tượng class(prototype) Validation
function Validation() {
  this.kiemTraRong = function (value, selectorError) {
    if (value.trim() === '') {
      document.querySelector(selectorError).innerHTML = 'Không được bỏ trống!';

      return false;
    }

    // Đây là cú pháp viết tắt nếu như chỉ có một lệnh if
    // Ngược lại thì return lại true
    document.querySelector(selectorError).innerHTML = '';
    return true;
  };

  // Hàm kiểm tra tất cả dữ liệu là chữ
  this.kiemTraTatCaKyTu = function (value, selectorError) {
    let regexLetter = /^[A-Z a-z]+$/;

    // Nếu kiểm tra hợp lệ thì trả về true
    if (regexLetter.test(value)) {
      document.querySelector(selectorError).innerHTML = '';

      return true;
    }

    // Còn không thì trả về false
    document.querySelector(selectorError).innerHTML = 'Tất cả phải là ký tự!!';
    return false;
  };

  // Kiểm tra tính hợp lệ của trường dữ liệu

  // Hàm kiểm tra tất cả dữ liệu là số
  this.kiemTraTatCaLaSo = function (value, selectorError) {
    let regexNumber = /^[0-9]+$/;

    if (regexNumber.test(value)) {
      document.querySelector(selectorError).innerHTML = '';
      return true;
    }

    document.querySelector(selectorError).innerHTML =
      'Yêu cầu nhập vào số tiền!';
    return false;
  };

  // Kiểm tra giá trị đầu vào của các môn học
  // Kiểm tra giá trị thì nó bao luôn là kt là số rồi
  this.kiemTraGiaTri = function (value, selectorError, minValue, maxValue) {
    if (Number(value) > maxValue || Number(value) < minValue) {
      document.querySelector(selectorError).innerHTML =
        'Yêu cầu nhập vào giá tiền từ ' + minValue + '-' + maxValue;
      return false;
    }

    document.querySelector(selectorError).innerHTML = '';
    return true;
  };

  // Kiểm tra độ dài của một chuỗi
  this.kiemTraDoDai = function (value, selectorError, minLength, maxLength) {
    if (value.length < minLength || value.length > maxLength) {
      document.querySelector(selectorError).innerHTML =
        'Yêu cầu nhập giá tiền ' + minLength + '-' + maxLength;
      return false;
    }

    document.querySelector(selectorError).innerHTML = '';
    return true;
  };
}
