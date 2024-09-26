import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    async function testApi() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await fetch(
        "http://localhost:8080/api/users/email?email=hemanthchoudary4@gmail.com",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const contentType = res.headers.get("Content-Type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
          console.log(data);
        } else {
          console.warn("Response is not JSON:", res.statusText);
        }
      } else {
        const errorText = await res.text(); // Read the error response as text
        console.error("Request failed:", res.status, res.statusText, errorText);
      }
    }

    testApi();
  }, []);

  return <div>Main</div>;
}

export default App;
