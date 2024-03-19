import { Anchor, Button, Container, Flex, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconArrowRight, IconMail } from "@tabler/icons-react";

import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import useIsMobile from "@/utils/useIsMobile";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			email: "",
		},

		validate: {
			email: isEmail("Invalid email"),
		},
	});

	const register = async () => {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: form.values.email,
			options: { shouldCreateUser: true, data: { name: "Mou" } },
		});

		if (error) {
			showError({ message: error.message, title: error.name });
		}

		if (data.user === null && data.session === null && error === null) {
			navigate("/verify");
		}
	};

	return (
		<Container>
			<Flex direction="column" align="center" justify="center" gap="lg" mih="100vh" w="100%">
				<Title order={2} fw={500} mb="lg">
					Create your Eventor account
				</Title>
				<Paper p="xl" withBorder maw={500} w="100%">
					<form onSubmit={form.onSubmit(() => register())}>
						<Stack>
							<TextInput
								leftSection={<IconMail size="1.2rem" />}
								required
								label="Email"
								placeholder="email@domain.com"
								value={form.values.email}
								onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
								error={form.errors.email && "Invalid email"}
							/>

							<Button type="submit" fullWidth rightSection={<IconArrowRight />}>
								<Text fw={500}>Sign up</Text>
							</Button>
						</Stack>
					</form>

					<Text c="dimmed" size="xs">
						<span>Already have an Eventor account? </span>
						<Anchor component={Link} to="/signin">
							Sign in
						</Anchor>
					</Text>
				</Paper>
			</Flex>
		</Container>
	);
}
