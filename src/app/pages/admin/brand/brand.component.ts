import {Component, OnInit} from '@angular/core';
import {TableAction, TableColumns} from "../../../shared/table/table.component";
import {BrandService} from "../service/brand.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{

  constructor(
    private brandService: BrandService
  ) {
  }

  ngOnInit(): void {
    this.getBrand();
  }

  tableColumns: TableColumns[] = [
    {
      fieldName:"name",
      headerText:"Name"
    },
    {
      fieldName:"createDate",
      headerText:"Name"
    },
  ]; // Tên cột trùng key của object trong data
  tableData = [];

  tableActions: TableAction[] = [
    { label: 'Sửa', class: 'bx bxs-edit', action: 'edit' },
    { label: 'Xóa', class: 'bx bxs-trash', action: 'delete' }
  ];
  // Xử lý khi click vào dòng
  onRowSelected(row: any) {
    console.log('Dòng được chọn:', row);
  }

  // Hàm xử lý khi click nút
  onActionClick(event: { action: string, row: any }) {
    const { action, row } = event;
    switch (action) {
      case 'edit':
        console.log('Sửa dòng:', row);
        alert(`Sửa: ${JSON.stringify(row)}`);
        break;
      case 'delete':
        console.log('Xóa dòng:', row);
        alert(`Xóa: ${row.name}`);
        break;
      default:
        console.log('Hành động không xác định:', action);
    }
  }

  getBrand() {
    const params = {
      method: "GET",
    };
    this.brandService.getAllBrand(params)
      .then((res) => {
        this.tableData = res.result;
      })
      .catch((err) => {
        this.tableData = []
      });
  }
}
