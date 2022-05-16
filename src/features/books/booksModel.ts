import { Role } from "../../utils/enum/role.enum";
import { BookStateType } from "./bookType";

// --------------------------------------------------- //
// user model require field
export interface BookModel {
    id: number;  
    bookName: string,
    bookPublishDate: string,
    authorName: string,
    bookPages: number,
    bookPublisher: string,
    bookDescription: string,
    state: BookStateType.STAYED,
    bookFilePath: string,
    fileType: string,
    returnDate: string  
}
// --------------------------------------------------- //
// return user from redux state
export interface BookState {
  books: BookModel[] | [];
  singleBook : Partial<BookModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
  count : number;
}

// --------------------------------------------------- //
// user all fields
export interface BooksModel {
  id: number;  
  bookName: string,
  bookPublishDate: string,
  authorName: string,
  bookPages: number,
  bookPublisher: string,
  bookDescription: string,
  state: BookStateType.STAYED,
  bookFilePath: string,
  fileType: string,
  returnDate: string 
  createdAt?: Date;
  updateAt?: Date;
}
// --------------------------------------------------- //
