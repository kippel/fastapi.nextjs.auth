"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  //const navigate = useNavigate();
  const router = useRouter();
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      try {
        const red = await axios.get(
          `http://localhost:4000/auth/verify-token/${token}`
        );

        if (!red.data.ok) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        router.push("/");
        //navigate("/");
      }
    };
    verifyToken();
  }, [router]);

  return <>{children}</>;
}
export default ProtectedRoute;
