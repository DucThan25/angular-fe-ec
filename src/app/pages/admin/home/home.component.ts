import { Component } from '@angular/core';
import {TableAction, TableColumns} from "../../../shared/table/table.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Cấu hình cột và dữ liệu động
  tableColumns: TableColumns[] = [
    {
      fieldName:"name",
      headerText:"Name"
    },
    {
      fieldName:"date",
      headerText:"Name"
    },
    {
      fieldName:"status",
      headerText:"Name"
    },
  ]; // Tên cột trùng key của object trong data
  tableData = [
    { name: 'John Doe', date: '01-10-2021', status: 'Completed' },
    { name: 'Jane Smith', date: '02-10-2021', status: 'Pending' },
    { name: 'Alice', date: '03-10-2021', status: 'Process' },
    { name: 'Bob', date: '04-10-2021', status: 'Completed' }
  ];

  // Danh sách các nút
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

}
