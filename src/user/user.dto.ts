export interface UserDTO {
  email: string;
}

export interface CreateUserDTO extends UserDTO {
  authId: string;
}
