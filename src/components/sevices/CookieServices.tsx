import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieServices {
  getCookie(name:string) {
    return cookies.get(name);
  }
  setCookie(name:string, value:string, options?:object) {
    cookies.set(name, value, options);
  }
  removeCookie(name:string, options?:object) {
    cookies.remove(name, options);
  }
}
export default new CookieServices();
