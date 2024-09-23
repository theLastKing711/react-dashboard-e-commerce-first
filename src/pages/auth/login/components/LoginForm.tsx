import { Edit } from "@refinedev/antd";
import { useLogin } from "@refinedev/core";
import React from "react";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ILoginForm } from "../types";
import { FormProps } from "antd/lib";

const LoginForm = () => {
  const { mutate: login } = useLogin<ILoginForm>();

  const onFinish: FormProps<ILoginForm>["onFinish"] = (values) => {
    console.log("values", values);

    login({
      name: values.name,
      password: values.password,
    });
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <FormItem label={"اسم السمتخدم"} name={"name"}>
        <Input size="large" />
      </FormItem>
      <FormItem label={"كلمة السر"} name={"password"}>
        <Input size="large" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" block>
          إرسال
        </Button>
      </FormItem>
    </Form>
  );
};

export default LoginForm;
