import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { UserModel } from "../../features/users/userModel";
import { ReportState, ReportStateArabic, ReportType, ReportTypeArabic } from "../../utils/enum/reporttype";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";

export const userColumns: GridColDef[] = [
    { field: 'id', headerName: Strings.id, width: 70 },
    // { field: 'firstName', headerName: Strings.firstName.toString(), width: 130 },
    // { field: 'lastName', headerName: Strings.lastName.toString(), width: 130 },
    {
      field: 'fullName',
      headerName: Strings.fullName,
      width: 200
    },
    { field: 'email', headerName: Strings.email.toString(), width: 200 },
    { field: 'isActive', headerName: Strings.isActive.toString(), width: 130 , 
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isActive ? 'مفعل' : 'غير مفعل'}`,
  },
    { field: 'role', headerName: Strings.permission.toString(), width: 130 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.role == Role.Admin ? Strings.admin : Strings.normalUser}`,
  },
  ];


  
export const DepartmentColumns: GridColDef[] = [
  { field: 'id', headerName: Strings.id, width: 70 },
  { field: 'dep_code', headerName: Strings.dep_code.toString(), width: 300 },
  { field: 'dep_name', headerName: Strings.dep_name.toString(), width: 300 },
];


