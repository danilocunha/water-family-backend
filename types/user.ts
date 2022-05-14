export interface BasicUser {
    id: number,
  }
  
  export interface User extends BasicUser {
    name: string,
    email?: string,
    password?: string
  }