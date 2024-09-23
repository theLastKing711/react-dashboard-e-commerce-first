import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  AuthPage,
} from "@refinedev/antd";
import { ConfigProvider, App as AntdApp } from "antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { ADMIN_URI, BASE_URI } from "./constants";
import Login from "./pages/auth/login/Login";
import { authProvider } from "./authProvider";
import { AdminList } from "./pages/admin/list/list";
import { dataProvider } from "./data-provider";
import { AdminCreate } from "./pages/admin/create/create";
import { AdminEdit } from "./pages/admin/edit/edit";
import { CategoryList } from "./pages/categories/list/list";
import { CategoryCreate } from "./pages/categories/create/create";
import { CategoryEdit } from "./pages/categories/edit/edit";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <ConfigProvider direction={"rtl"} theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(ADMIN_URI)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "admin",
                list: "/admin",
                show: "/admin/show/:id",
                create: "/admin/create",
                edit: "/admin/edit/:id",
                meta: {
                  label: "اﻹداريين",
                },
              },
              {
                name: "categories",
                list: "/categories",
                show: "/categories/show/:id",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                meta: {
                  label: "التصنيفات",
                },
              },
              {
                name: "posts",
                list: "/posts",
                show: "/posts/show/:id",
                create: "/posts/create",
                edit: "/posts/edit/:id",
                meta: {
                  label: "المنشورات",
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="admin" />}
                />

                <Route path="/admin">
                  <Route index element={<AdminList />} />
                  <Route path="create" element={<AdminCreate />} />
                  {/* <Route path="show/:id" element={<AdminEdit />} /> */}
                  <Route path="edit/:id" element={<AdminEdit />} />
                </Route>

                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryEdit />} />
                </Route>

                <Route path="/posts">
                  <Route index element={<PostList />} />
                  <Route path="create" element={<PostCreate />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                  <Route path="show/:id" element={<PostShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
