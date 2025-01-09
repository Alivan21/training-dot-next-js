import { signIn } from 'next-auth/react';
import { TLoginForm } from '../_entities/schema';

export const loginByCredentials = async (payload: TLoginForm) => {
  const result = await signIn('login', {
    redirect: false,
    email: payload.email,
    password: payload.password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
};

export const loginByGoogle = async () => {
  return signIn('google', {
    redirect: true,
  });
};

export const loginByGithub = async () => {
  return signIn('github', { redirect: true });
};

export const loginByGitlab = async () => {
  return signIn('gitlab', { redirect: true });
};
