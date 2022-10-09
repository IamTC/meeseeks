import AuthForm from "../components/authForm";

const signUp = () => {
  return <AuthForm mode="signup"></AuthForm>;
};

signUp.authPage = true;
export default signUp;
