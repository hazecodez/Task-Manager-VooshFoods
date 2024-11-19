import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import Layout from "../components/Layout";
import api from "../services/apis";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    api.getTasks(user.token).then((data) => setTasks(data));
  }, []);

  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
}
