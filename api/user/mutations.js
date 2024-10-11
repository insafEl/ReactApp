export const SIGN_IN_MUTATION = `
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
`;

export const SIGN_UP_MUTATION = `
mutation SignUp($username: String!, $password: String!) {
  signUp(username: $username, password: $password)
}
`;