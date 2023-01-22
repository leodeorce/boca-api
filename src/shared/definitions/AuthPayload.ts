interface AuthPayload {
  contestnumber: number;
  usersitenumber: number;
  usernumber: number;
  username: string;
  usertype: string;
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;
}

export { AuthPayload };
