import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/login_register.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spline from "@splinetool/react-spline";
import Login from "@/components/login";
import Register from "@/components/register";
import Image from "next/image";
import FlatifyDashboard from "./dashboard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { notification } from "antd";
import UserService from "@/services/UserService";
import { LoadScript } from "@react-google-maps/api";
import Loading from "../components/Loading";
import AdminDashboard from "./admin";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  const [api, popUp] = notification.useNotification();

  const userService = new UserService();

  const session = useSession();
  const supabase = useSupabaseClient();

  function openNotificationWithIcon(type) {
    api[type]({
      message: "Confirmation email sent!",
      duration: 3,
      description:
        "We sent you a confirmation email. Click on the link provided to confirm your account and login",
    });
  }

  async function handleRegister() {
    const user = await userService.register(supabase, name, email, password);
    openNotificationWithIcon("success");
    setUser(user);
  }

  async function handleLogin() {
    const user = await userService.login(supabase, email, password);
    setIsAdmin(user.is_admin);
    setUser(user);
  }

  useEffect(() => {
    (async () => {
      const user_profile = await userService.getAuthUserProfile(supabase);
      setIsAdmin(user_profile.is_admin);
    })();
  }, [session]);

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      loadingElement={<Loading />}
    >
      <div className="main-div">
        {popUp}
        {session ? (
          isAdmin === null ? (
            <Loading />
          ) : isAdmin ? (
            <AdminDashboard />
          ) : (
            isAdmin === false && <FlatifyDashboard />
          )
        ) : (
          <Container className="main-container">
            <Row>
              <Col sm={12} md={6} className="text-light p-5">
                <div className={styles.logo}>
                  <Image
                    src="/fdmlogo.png"
                    width={200}
                    height={200}
                    alt="logo"
                  />
                </div>
                <Row>
                  <Col>
                    <Login
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      handleLogin={handleLogin}
                    />
                  </Col>
                  <Col>
                    <Register
                      email={email}
                      setEmail={setEmail}
                      name={name}
                      setName={setName}
                      password={password}
                      setPassword={setPassword}
                      handleRegister={handleRegister}
                    />
                  </Col>
                </Row>
              </Col>

              <Col sm={12} md={6} className="p-5">
                <div></div>
                <div className="container">
                  <Spline scene="https://prod.spline.design/G9WRoRn2ZkIOLcxr/scene.splinecode" />
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </LoadScript>
  );
}
