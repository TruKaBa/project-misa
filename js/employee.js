/**
 * Họ và tên: Lê Thành Trung
 * Mã sinh viên: 20A10010009
 * Ngày sinh: 12/04/2002
 *
 * Do ở khoa khi thi thì yêu cầu
 * không dùng các framework nên trong
 * bài của em không dùng Vue ạ
 *
 *  Em viết phụ thuộc vào api của anh cung cấp
 * nên api lỗi thì em chưa khắc phục được ạ
 */
window.onload = function () {
  new EmployeePage();
};

class EmployeePage {
  ListEmployee;

  constructor() {
    this.intEvents();
    this.loadData();
  }
  /*
   * Load dữ liệu cho table
   * Author: Lê Thành Trung
   */
  loadData() {
    try {
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.ListEmployee = data;
          this.buildDataTable(data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  /*
   * Load dữ liệu cho table
   * Author: Lê Thành Trung
   */
  buildDataTable(data) {
    const pagingLeftQuantity = document.querySelector(".paging-left > b");
    let quantityEmployee = 0;

    try {
      for (const item of data) {
        const employeeCode = item.EmployeeCode;
        const employeeName = item.FullName;
        const genderName = item.GenderName;
        const dateOfBirth = item.DateOfBirth;
        const identityNumber = item.IdentityNumber;
        const positionName = item.PositionName;

        this.buildRowElement(
          employeeCode,
          employeeName,
          genderName,
          dateOfBirth,
          identityNumber,
          positionName
        );
        quantityEmployee++;
      }
      pagingLeftQuantity.textContent = quantityEmployee;
    } catch (error) {
      console.log(error);
    }
  }

  /*
   * Load dữ liệu cho table
   * Author: Lê Thành Trung
   */
  buildRowElement(
    employeeCode,
    employeeName,
    genderName,
    dateOfBirth,
    identityNumber,
    positionName
  ) {
    const table = document.querySelector(".tbEmployeeList");
    const tableBody = table.lastElementChild;
    try {
      //   const html = `

      //   <td class="text-align--left">CÔNG TY CỔ PHẦN MISA</td>
      //   <td class="text-align--left">003123</td>
      //   <td class="text-align--left">VCB</td>
      //   <td class="text-align--left">CÔNG TY CỔ PHẦN MISA</td>
      //   <td class="text-align--left">Sửa</td>
      // `;
      //   let trElement = document.createElement("tr");

      //   let tdCheckbox = document.createElement("td");
      //   let checkBox = document.createElement("input");
      //   checkBox.setAttribute("type", "checkbox");
      //   tdCheckbox.append(checkBox);

      //   let tdEmployeeCode = document.createElement("td");
      //   tdEmployeeCode.classList.add("text-align--left");
      //   tdEmployeeCode.textContent = employeeCode;

      //   let tdEmployeeName = document.createElement("td");
      //   tdEmployeeName.classList.add("text-align--left");
      //   tdEmployeeName.textContent = employeeName;

      //   let tdGenderName = document.createElement("td");
      //   tdGenderName.classList.add("text-align--left");
      //   tdGenderName.textContent = genderName;

      //   let tdDateOfBirth = document.createElement("td");
      //   tdDateOfBirth.classList.add("text-align--left");
      //   tdDateOfBirth.textContent = dateOfBirth;

      //   let tdIdentityNumber = document.createElement("td");
      //   tdIdentityNumber.classList.add("text-align--left");
      //   tdIdentityNumber.textContent = identityNumber;

      //   let tdPositionName = document.createElement("td");
      //   tdPositionName.classList.add("text-align--left");
      //   tdPositionName.textContent = positionName;

      //   trElement.append(tdCheckbox);
      //   trElement.append(tdEmployeeCode);
      //   trElement.append(tdGenderName);
      //   trElement.append(genderName);
      //   trElement.append(tdDateOfBirth);
      //   trElement.append(tdIdentityNumber);
      //   trElement.append(tdPositionName);
      //   trElement.insertAdjacentHTML("beforeend", html);
      // trElement.innerHTML += html
      const formatedDate = this.formatDate(dateOfBirth);
      const html = `<tr>
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          class="table-checkbox"
        />
      </td>
      <td class="text-align--left">${employeeCode}</td>
      <td class="text-align--left">${employeeName}</td>
      <td class="text-align--left">${genderName}</td>
      <td class="text-align--left">${formatedDate}</td>
      <td class="text-align--left">${identityNumber}</td>
      <td class="text-align--left">${positionName}</td>
      <td class="text-align--left">CÔNG TY CỔ PHẦN MISA</td>
      <td class="text-align--left">003123</td>
      <td class="text-align--left">VCB</td>
      <td class="text-align--left">CÔNG TY CỔ PHẦN MISA</td>
      <td class="text-align--left">Sửa</td>
    </tr>`;

      tableBody.insertAdjacentHTML("beforeend", html);
    } catch (error) {
      console.log(error);
    }
  }
  formatDate(date) {
    try {
      date = new Date(date);
      let dateValue = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month > 9) {
        if (dateValue > 9) {
          return `${dateValue}/${month}/${year}`;
        } else {
          return `0${dateValue}/${month}/${year}`;
        }
      } else {
        if (dateValue > 9) {
          return `${dateValue}/0${month}/${year}`;
        } else {
          return `0${dateValue}/0${month}/${year}`;
        }
      }
    } catch (error) {
      return "";
    }
  }

  intEvents() {}
}

const btnAddFrom = document.querySelector("#form-detail");
btnAddFrom.addEventListener("click", function (e) {
  document.querySelector(".popup").style.display = "block";
  document.querySelector("#txtEmployeeCode").focus();
});

const btnCloseForm = document.querySelector(".popup-button-close");
btnCloseForm.addEventListener("click", function (e) {
  document.querySelector(".popup").style.display = "none";
});

function validateFieldEmployeeEmpty() {
  try {
    const inputElement = this;
    const inputValue = inputElement.value.trim();
    const errorInfo = this.nextElementSibling;

    if (!inputValue) {
      console.log("Dữ liệu không được phép để trống");
      inputElement.classList.add("input--error");
    } else {
      console.log("Ok");
      inputElement.classList.remove("input--error");
    }
  } catch (error) {}
}

const inputRequiredElements = [...document.querySelectorAll(".input-required")];
inputRequiredElements.forEach((item) => {
  item.addEventListener("input", validateFieldEmployeeEmpty);
});

const tbody = document.querySelector("tbody");
const trArr = [...tbody.querySelectorAll("tr")].length;
const pagingLeftQuantity = document.querySelector(".paging-left > b");
pagingLeftQuantity.textContent = trArr;


