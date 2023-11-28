import { jwtDecode } from "jwt-decode";

function decoder() {
  if (document.cookie) {
    console.log(document.cookie);
    const decodedCookie = jwtDecode(
      document.cookie.substring(5, document.cookie.length)
    );
    console.log(decodedCookie);
    return decodedCookie;
  }
}

export default decoder;
