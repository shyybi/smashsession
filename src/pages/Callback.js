import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { attachToken } from "../api/privateAxiosInstance";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Récupère le hash de l'URL
    const hash = window.location.hash.substring(1); // enlève le '#'
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      attachToken(accessToken);
    }
    navigate("/");
  }, [navigate]);

  return null;
}

export default Callback;
