'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Acceso No Autorizado
        </h1>
        <p className="text-gray-600 mb-8">
          No tienes permisos para acceder a esta página.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}
