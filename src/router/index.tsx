import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TemplateGallery from '@/pages/TemplateGallery';
import CoverEditor from '@/pages/CoverEditor';
import MyWorks from '@/pages/MyWorks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TemplateGallery />,
  },
  {
    path: '/editor/:templateId',
    element: <CoverEditor />,
  },
  {
    path: '/my-works',
    element: <MyWorks />,
  },
  {
    path: '*',
    element: <TemplateGallery />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default router;
