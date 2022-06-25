// --------------------------------------------------- //
// user model require field
export interface AuthorModel {
  id?: number;
  full_name: string;
}

// --------------------------------------------------- //
// return user from redux state
export interface AuthortState {
  Authors: AuthorModel[] | [];
  singleAuthor : Partial<AuthorModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
}
