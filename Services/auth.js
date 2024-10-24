export const userData = {
  email: "admin@admin.com",
  password: "admin1234",
};

export const isUserCredentialsValid = (email, password) => {
  return email === userData.email && password === userData.password;
};
