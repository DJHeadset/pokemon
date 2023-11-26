import { jwtDecode } from "jwt-decode";

function decoder() {
    if (document.cookie) {
      const decodedCookie = jwtDecode(
        document.cookie.substring(6, document.cookie.length - 1)
      );
      console.log(decodedCookie);
      return decodedCookie
    }
  }

  export default decoder