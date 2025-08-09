import { createBrowserRouter } from "react-router-dom";
import { UploadImages } from "../components/pages/upload-images/UploadImages";
import { UploadPhotos } from "../components/pages/upload-photos/UploadPhotos";
import { Login } from "../components/pages/login/Login";
import { RequireAuth } from "./RequreAuth";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { ConsultationsPage } from "../components/pages/consultations-page/consultations-page";
import { ServiceTypePage } from "../components/pages/service-type-page/service-type-page";
import { ReferralSourcePage } from "../components/pages/referral-source-page/referral-source-page";

export const router = createBrowserRouter([
     {
          path: "/",
          element: (
               <RequireAuth>
                    <Dashboard />
               </RequireAuth>
          ),
     },
     {
          path: "/login",
          element: <Login />,
     },
     {
          path: "/upload-images",
          element: (
               <RequireAuth>
                    <UploadImages />
               </RequireAuth>
          ),
     },
     {
          path: "/consultations",
          element: (
               <RequireAuth>
                    <ConsultationsPage />
               </RequireAuth>
          ),
     },
     {
          path: "/service-type",
          element: (
               <RequireAuth>
                    <ServiceTypePage />
               </RequireAuth>
          ),
     },
     {
          path: "/referral-sources",
          element: (
               <RequireAuth>
                    <ReferralSourcePage />
               </RequireAuth>
          ),
     },
     {
          path: "/upload-photo",
          element: (
               <RequireAuth>
                    <UploadPhotos />
               </RequireAuth>
          ),
     },
]); 