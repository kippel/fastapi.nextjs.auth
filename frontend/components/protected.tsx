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
        console.log(red.data);

        if (!red.data.ok) {
          router.push("/");
        }
        /*
        const resquest = await fetch(
          `http://localhost:4000/auth/verify-token/${token}`
        );
        console.log(resquest, "oooooooo");
        if (!resquest.ok) {
          //  navigate("/login");
          console.log("red");
          router.push("/");
        } else {
          console.log("eeeeeee");
        }
        */
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
