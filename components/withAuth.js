import React, { useEffect } from "react";
import router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

export const login = ({ token }) => {
  cookie.set("token", token, { expires: 1 });
  router.push("/");
};

export const authCheck = ctx => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    } else {
      Router.push("/signin");
    }
  }
  return token;
};

export const logout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  router.push("/signin");
};

const withAuth = Component => {
  const Comp = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/signin");
      }
    };
    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };
  Comp.getInitialProps = async ctx => {
    const token = authCheck(ctx);
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));
    return { ...pageProps, token };
  };
  return Comp;
};

export default withAuth;
