interface DecodedToken {
  exp: string;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  };
  lat: number;
}
