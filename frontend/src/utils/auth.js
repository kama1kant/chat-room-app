import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function isSignIn(){
    return cookies.get('userId') != null
}