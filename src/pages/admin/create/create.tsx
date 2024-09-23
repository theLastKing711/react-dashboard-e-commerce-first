import React from "react";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, message, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { ICreateAdmin } from "../types";

export const AdminCreate = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<ICreateAdmin>({
    successNotification: (data, values, resourses) => ({
      message: "إنشاء مستخدم جديد",
      description: "تم إنشاء مستخدم جديد بنجاح",
      type: "success",
    }),
  });

  console.log("mutation result", mutationResult);

  const postData = mutationResult?.data?.data;

  // const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //   resource: "categories",
  //   defaultValue: postData?.category.id,
  // });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="إنشاء مستخدم جديد"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="اسم المستخدم"
          name="name"
          rules={[
            {
              required: true,
              message: "اسم المستخدم مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "كلمة المرور مطلوبة",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}

        {/* <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item> */}
        {/* <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item> */}
        {/* <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item> */}
      </Form>
    </Create>
  );
};
