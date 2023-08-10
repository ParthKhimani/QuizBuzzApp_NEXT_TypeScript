import { NextRequest, NextResponse } from "next/server";
import {
  adminRoutes,
  authRoutes,
  employeeRoutes,
  managerRoutes,
} from "./src/router/routes";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { notFound } from "next/navigation";

export const config = {
  matcher: [
    "/",
    "/admin-dashboard",
    "/admin-dashboard/add-employee",
    "/admin-dashboard/add-manager",
    "/admin-dashboard/add-quiz",
    "/admin-dashboard/update-employee",
    "/admin-dashboard/update-manager",
    "/manager-dashboard",
    "/manager-dashboard/add-employee",
    "/manager-dashboard/add-quiz",
    "/manager-dashboard/update-employee",
    "/employee-dashboard",
    "/employee-dashboard/quiz-page",
    "/employee-dashboard/check-answers",
    "/employee-dashboard/sign-up",
  ],
};

const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token && !authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (token) {
    const decode: JwtPayload = jwt_decode(token);
    if (adminRoutes.includes(req.nextUrl.pathname) && decode.role === "admin")
      return;
    else if (
      adminRoutes.includes(req.nextUrl.pathname) &&
      decode.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      managerRoutes.includes(req.nextUrl.pathname) &&
      decode.role === "manager"
    )
      return;
    else if (
      managerRoutes.includes(req.nextUrl.pathname) &&
      decode.role !== "manager"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      employeeRoutes.includes(req.nextUrl.pathname) &&
      decode.role === "employee"
    )
      return;
    else if (
      employeeRoutes.includes(req.nextUrl.pathname) &&
      decode.role !== "employee"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (authRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }
};

export default middleware;
