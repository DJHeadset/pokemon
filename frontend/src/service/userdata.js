import decoder from "./Decoder";

export const fetchUserData = () => {
  const cookie = decoder();
  if (cookie === undefined) {
    return null;
  } else {
    return fetch("/api/auth/getuser").then((res) => res.json());
  }
};

export default fetchUserData;
