import ProtectedRoute from "@/components/ProtectedRoute";
import UnprotectedRoute from "@/components/UnprotectedRoute";
import { LoadingOverlay } from "@mantine/core";
import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const DashboardLayout = lazy(() => import("@/components/DashboardLayout"));

const SignIn = lazy(() => import("./pages/Auth/SignIn.page"));
const SignUp = lazy(() => import("./pages/Auth/SignUp.page"));
const Verify = lazy(() => import("./pages/Auth/Verify.page"));

const HomePage = lazy(() => import("./pages/Home/Home.page"));

const EventsPage = lazy(() => import("./pages/Events/Events.page"));
const CreateEventPage = lazy(() => import("./pages/Events/CreateEvent.page"));

const router = createBrowserRouter([
    {
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingOverlay />}>
                    <DashboardLayout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<LoadingOverlay />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: "/events",
                element: (
                    <Suspense fallback={<LoadingOverlay />}>
                        <EventsPage />
                    </Suspense>
                ),
            },
            {
                path: "/events/new",
                element: (
                    <Suspense fallback={<LoadingOverlay />}>
                        <CreateEventPage />
                    </Suspense>
                ),
            }

        ],
    },
    {
        path: "/signin",
        element: (
            <Suspense fallback={<LoadingOverlay />}>
                <UnprotectedRoute>
                    <SignIn />
                </UnprotectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/signup",
        element: (
            <Suspense fallback={<LoadingOverlay />}>
                <UnprotectedRoute>
                    <SignUp />
                </UnprotectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/verify",
        element: (
            <Suspense fallback={<LoadingOverlay />}>
                <UnprotectedRoute>
                    <Verify />
                </UnprotectedRoute>
            </Suspense>
        ),
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}