import jwt_decode from "jwt-decode";

class Auth {
  static saveToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  static saveUser(user) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_info", JSON.stringify(user));
    }
  }

  static getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  static getUser() {
    if (typeof window !== "undefined" && localStorage.getItem("user_info")) {
      return JSON.parse(localStorage.getItem("user_info"));
    }
    return null;
  }

  static isAuthenticated() {
    const token = this.getToken();
    return token ? true : false;
  }

  static decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  static logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");
    }
  }

  static getTokenExpiration() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.exp;
    }
    return null;
  }

  static isTokenExpired() {
    if (typeof window === "undefined") {
      // Se estamos no servidor, não sabemos se o token expirou
      return true; // Presume expirado por segurança
    }

    let date = new Date();
    const exp = this.getTokenExpiration();
    if (exp) {
      return exp * 1000 < date;
    }
    return true;
  }
}

export default Auth;
