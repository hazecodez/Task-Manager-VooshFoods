import { useContext } from "react"
import AuthContext from "../context/authContext"
import Layout from "../components/Layout";


export default function Home() {
    const {user} = useContext(AuthContext);
    console.log(user);
    
  return (
    <Layout>
      <div>
      Home
    </div>
    </Layout>
  )
}
