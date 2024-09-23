import { Card } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import LoginForm from "./components/LoginForm";

const useStyles = createStyles(({ token, css }) => ({
  // Supports the writing style of css object
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: token.colorBgLayout,
    // borderRadius: token.borderRadiusLG,
    // maxWidth: 400,
    // width: '100%',
    // height: 180,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  // Also supports obtaining the same writing experience as normal css through css string templates
  card: css`
    box-shadow: ${token.boxShadow};
    padding: ${token.padding}px;
    border-radius: ${token.borderRadius}px;
    color: ${token.colorTextTertiary};
    background: ${token.colorBgContainer};
    transition: all 100ms ${token.motionEaseInBack};

    margin-bottom: 8px;
    cursor: pointer;

    &:hover {
      color: ${token.colorTextSecondary};
      box-shadow: ${token.boxShadowSecondary};
    }
  `,
  header: css`
    font-size: "1.25rem";
  `,
}));

const cardStyles: React.CSSProperties | undefined = {
  width: 400,
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  fontSize: "1.5rem",
};

const cardHeaderStyles: React.CSSProperties | undefined = {
  fontSize: "1.125rem",
};

const Login = () => {
  const { styles, cx } = useStyles();

  return (
    <div className={cx("login-root-class", styles.container)}>
      <Card
        title={"تسجيل الدخول"}
        styles={{
          header: cardHeaderStyles,
        }}
        style={cardStyles}
      >
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
