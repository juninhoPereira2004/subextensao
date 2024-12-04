import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "../utils/auth.js";

const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Para evitar flash enquanto valida

  useEffect(() => {
    const validateAuth = () => {
      if (!Auth.isAuthenticated() || Auth.isTokenExpired()) {
        Auth.logout();
        router.push("/page/login");
      } else {
        setIsLoading(false); // Tudo OK, pode renderizar
      }
    };

    validateAuth();
  }, [router]);

  return isLoading; // Retorna estado de carregamento
};

export default useAuth;
