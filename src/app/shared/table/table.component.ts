import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface TableAction {
  label: string;           // Tên nút
  class?: string;          // Lớp CSS cho nút
  action: string;          // Tên action sẽ phát ra event
}
export interface TableColumns {
  fieldName: string;
  headerText: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: TableColumns[] = []; // Danh sách cột
  @Input() data: any[] = [];       // Dữ liệu bảng
  @Input() actions: TableAction[] = [];   // Danh sách các nút và hành động
  @Output() rowClicked = new EventEmitter<any>(); // Sự kiện khi click vào dòng

  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();

  // Hàm xử lý khi click vào một dòng
  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  // Hàm emit sự kiện khi click nút
  onActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
}
