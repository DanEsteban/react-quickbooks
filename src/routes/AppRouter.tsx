import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from '@/components/dashboard/layout/layout'
import { MarketingLayout } from "@/components/marketing/layout/layout";
import { HomePage } from "@/pages/marketing/home-page";
import { AuthLayout } from "@/auth/pages/AuthLayout";
import LoginPage from "@/auth/pages/LoginPage";
import RegisterPage from "@/auth/pages/RegisterPage";
import { OverviewPage } from "@/pages/dashboard/overview";
import { LayoutSettings } from "@/components/dashboard/settings/layout";
import { Account } from "@/pages/dashboard/settings/account";
import { Security } from "@/pages/dashboard/settings/security";
import { Company } from "@/pages/dashboard/settings/company";
import { Usuarios } from "@/pages/dashboard/usuarios";
import { PrivateRoutes } from "./PrivateRoutes";
import { NotFound } from "@/pages/not-found";

export const AppRouter = () => {

  return (
    <Routes>
      {/* Rutas públicas*/}
      <Route path="/" element={<MarketingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Rutas de autenticación SIN el layout principal */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>

      {/* Es el ejemplo de una plantilla para crear empresas  */}
      {/* <Route>
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/empresa/*" element={<Navigate to="/empresa" />} />
      </Route> */}

      {/* Rutas privadas */}
      <Route element={<PrivateRoutes />} >
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<OverviewPage />} />

          <Route path="settings" element={<LayoutSettings />}>
            <Route path="account" element={<Account />} />
            <Route path="security" element={<Security />} />
            <Route path="company" element={<Company />} />
          </Route>
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};