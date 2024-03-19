import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import useIsMobile from "@/utils/useIsMobile";
import { Container, Flex, Paper, PinInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Verify() {
	const { setUser } = useAuth();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const form = useForm({
		initialValues: {
			otp: searchParams.get("otp") ?? "",
		},

		validate: {
			otp: (value) => (/^[0-9]{6}$/.test(value) ? null : "Invalid OTP value"),
		},
	});

	const email = searchParams.get("email");

	const otpRegex = /^[0-9]{6}$/;
	const isValidOtp = otpRegex.test(form.values.otp);
	const isValidEmail = email !== null;
	const isMobile = useIsMobile();

	useEffect(() => {
		if (email === null) {
			navigate("/signin");
		}
	}, [email, navigate]);

	const verify = async (otp: string) => {
		if (isValidOtp && isValidEmail) {
			const { error, data } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });

			const { session, user } = data;

			if (error) {
				showError({ message: error.message, title: error.name });
			}

			if (session !== null && user !== null) {
				setUser(user);
			}
		}
	};

	if (!email) {
		return null;
	}

	return (
		<Container>
			<Flex direction="column" align="center" justify="center" gap="lg" mih="100vh" w="100%">
				<Title order={2} fw={500} mb="lg">
					Verify your account
				</Title>
				<Paper p="xl" withBorder maw={500} w="100%">
					<PinInput
						{...form.getInputProps("otp")}
						name="otp"
						autoFocus
						size={isMobile ? "xs" : "xl"}
						length={6}
						placeholder="—"
						type="number"
						inputMode="numeric"
						onComplete={verify}
						oneTimeCode
					/>
				</Paper>
			</Flex>
		</Container>
	);
}
