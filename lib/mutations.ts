import fetcher from "./fetchers";

const auth = (mode: 'signin' | 'signup', body: { email: string, password: string }) => {
    return fetcher(`/${mode}`, body);
}

export default auth;