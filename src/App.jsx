import { BrowserRouter, Routes, Route, Outlet, useParams, Navigate } from "react-router-dom"
import Home from "./page/Home";
import Contact from "./page/Contact";
import About from "./page/About";
import AppLayout from "./layout/AppLayout";
import PageNotFound from "./page/PageNotFound";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { useState } from "react";
import LoginForm from "./features/auth/LoginForm";



function Posts() {
  return (
    <>
      <h1>Posts</h1>
      <Outlet />
    </>

  )
}

function Post() {
  let params = useParams();

  return (
    <>
      <h1>Post: {params.postId}</h1>
    </>
  )
}


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ user: { roles: [] } });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout setAuthenticated={setAuthenticated} roles={user.user.roles} />
            </ProtectedRoute>}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="posts" element={<Posts />}>
                <Route index element={<h1>New Posts</h1>} />
                <Route path=":postId" element={<Post />} />
              </Route>
            </Route>
          </Route>
          <Route path="login" element={<LoginForm isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} />
          
          <Route path="*" element={<PageNotFound />} />

        </Routes>
        

      </BrowserRouter>
    </>
  )
}




export default App
