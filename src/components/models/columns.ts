import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { BookStateType } from "../../features/books/bookType";
import { MemberType } from "../../features/members/memberType.enum";
import { UserModel } from "../../features/users/userModel";
import { ReportState, ReportStateArabic, ReportType, ReportTypeArabic } from "../../utils/enum/reporttype";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";
import Button from "@mui/material/Button";
import { BarrowState, BarrowStateArabiceTranslate } from "../../features/barrows/barrowType.enum";

export const userColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70   , 
    // // renderCell: (params: any) => {
    // //   let currentId;
    // //   return (
    // //     currentId++
    // //   );},
    // },
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
    // { field: 'id', headerName: Strings.id, width: 70 },
    { field: 'dep_code', headerName: Strings.dep_code.toString(), width: 300 },
    { field: 'dep_name', headerName: Strings.dep_name.toString(), width: 300 },
  ];

  
  export const AuthorColumns: GridColDef[] = [
    { field: 'full_name', headerName: Strings.fullName.toString(), width: 300 },
  ];

  
  export const MembersColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70 },
    {
      field: 'fullName',
      headerName: Strings.fullName,
      width: 200
    },
    {
      field: 'dep_name',
      headerName: Strings.dep_name,
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.department.dep_name }`,
    },
    // { field: 'username', headerName: Strings.userName.toString(), width: 120 },
    { field: 'email', headerName: Strings.email.toString(), width: 200 },
    { field: 'isActive', headerName: Strings.isActive.toString(), width: 130 , 
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isActive ? 'مفعل' : 'غير مفعل'}`,
  },
    { field: 'memberType', headerName: Strings.memberType.toString(), width: 130 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.memberType == MemberType.Teacher ? Strings.teacher : Strings.student}`,
  },
  ];
    

  export const BookColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70 },
    {
      field: 'bookName',
      headerName: Strings.bookName,
      width: 100
    },
    {
      field: 'bookPublishDate',
      headerName: Strings.bookPublishDate,
      width: 100
    },
    {
      field: 'author',
      headerName: Strings.authorName,
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.author.full_name}`,
    },
    {
      field: 'bookPages',
      headerName: Strings.bookPages,
      width: 80
    },
    // {
    //   field: 'bookCount',
    //   headerName: Strings.bookCount,
    //   width: 80
    // },
    {
      field: 'isbn',
      headerName: Strings.isbn,
      width: 80
    },
    {
      field: 'bookPublisher',
      headerName: Strings.bookPublisher,
      width: 150
    },
    {
      field: 'bookDescription',
      headerName: Strings.bookDescription,
      width: 200
    },
    { field: 'state', headerName: Strings.state.toString(), width: 80 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.state == BookStateType.STAYED ? Strings.stayed : Strings.barrowed}`,
  },
  ];

  // Barrows Column
  
  export const BarrowsColumns: GridColDef[] = [
    // { field: 'id', headerName: Strings.id, width: 70 },
    { field: 'fullName', headerName: Strings.barrow.toString(), width: 200 , 
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.member.fullName}`,
  },
    { field: 'bookName', headerName: Strings.bookName.toString(), width: 130 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.book.bookName}`,
  },
  
  { field: 'returnDate', headerName: Strings.returnDate, width: 100 },
  { field: 'remainDate',headerName : 'الوقت المتبقي',  width: 150,
  valueGetter: (params: GridValueGetterParams)=> {
    function addDays(originalDate : any, days: any){
      var cloneDate = new Date(originalDate.valueOf());
      cloneDate.setDate(cloneDate.getDate() + days);
      return cloneDate;
    }
    var day1 : any = new Date(); 
    var day2 : any = new Date(params.row.returnDate);
    if(params.row.member.memberType == MemberType.Student){
      day2 = addDays(day2, 7);
    } else if(params.row.member.memberType == MemberType.Teacher){
      day2 = addDays(day2, 15);
    }
    var difference= Math.abs(day2-day1);
    var days = difference/(1000 * 3600 * 24)

    if(day1 >= day2){
      return ' انتهت مدة االاعارة '
    } else {
      return   Math.floor(days) == 0 ? 'تبيقى يوم واحد' : Math.floor(days) + ' يوم '
    }
  }
  },
  { field: 'state', headerName: Strings.barrowState, width: 100 ,

  valueGetter: (params: GridValueGetterParams) => {
    switch(params.row.state){
      case BarrowState.PENDING:
      return BarrowStateArabiceTranslate.PENDING
      case BarrowState.REJECTED:
      return BarrowStateArabiceTranslate.REJECTED
      case BarrowState.ACCEPTED:
      return BarrowStateArabiceTranslate.ACCEPTED
    }
  }
  
},
];

