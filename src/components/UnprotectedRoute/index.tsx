import { useAuth } from "@/context/AuthContext";
import { Center, Loader } from "@mantine/core";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UnprotectedRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();

	if (user === undefined) {
		return (
			<Center mih="100vh">
				<Loader />
			</Center>
		);
	}

	return user === null ? children : <Navigate to="/" />;
};

export default UnprotectedRoute;
