import React, { useEffect } from "react";
import axios from "axios";

const LoginTest = ({ idToken }) => {
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/kakao/login",
          null,
          {
            params: {
              idToken,
            },
          }
        );
        //액세스 토큰 추출, 이를 상태관리할 필요 있음
        const accessToken = response.data.data.authTokens.accessToken;
        console.log(accessToken);
      } catch (error) {
        console.error("Error while logging in:", error);
      }
    };

    login();
  }, [idToken]);

  return <></>;
};

export default LoginTest;
