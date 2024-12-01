import { NextRequest, NextResponse } from "next/server";
import { TOKEN_NAME } from "./constants";
import { jwtDecode } from "jwt-decode";

// Define las rutas protegidas y sus roles permitidos
const protectedRoutes = {
  '/dashboard/employees': ['MANAGER', 'ADMIN'],
  '/dashboard/managers': ['ADMIN'],
  '/dashboard/profile': ['EMPLOYEE', 'MANAGER', 'ADMIN']
};

export default function Middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME)?.value;

  // Redirección a login si no hay token
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verificar roles para rutas protegidas
    try {
      const decoded = jwtDecode(token) as { userRoles: string[] };
      const path = req.nextUrl.pathname;
      
      // Verificar si la ruta actual está protegida
      const requiredRoles = protectedRoutes[path as keyof typeof protectedRoutes];
      if (requiredRoles) {
        const hasRequiredRole = decoded.userRoles.some(role => 
          requiredRoles.includes(role)
        );
        
        if (!hasRequiredRole) {
          return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}