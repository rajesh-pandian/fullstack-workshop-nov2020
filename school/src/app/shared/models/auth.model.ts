export class LoginData {
  username: string;
  password: string;
}
export class SignupData extends LoginData {
  password2: string;
}

export class AuthData {
  token: string;
  expiresIn: number;
  id: number;
}
