import AuthForm from "../components/authForm";

const signIn = () => {
  return <AuthForm mode="signin"></AuthForm>;
};

signIn.authPage = true;

export default signIn;
