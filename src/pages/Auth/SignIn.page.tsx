import { Anchor, Button, Container, Flex, Loader, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconArrowRight, IconMail } from "@tabler/icons-react";

import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			email: "",
		},

		validate: {
			email: isEmail("Email is not valid"),
		},
	});

	const login = async () => {
		setLoading(true);
		const { data, error } = await supabase.auth.signInWithOtp({
			email: form.values.email,
			options: { data: { name: "Mou" }, emailRedirectTo: location.origin },
		});
		setLoading(false);
		if (error) {
			showError({ message: error.message });
		}
		if (data.user === null && data.session === null && error === null) {
			navigate(`/verify?email=${form.values.email}`);
		}
	};

	return (
		<Container>
			<Flex direction="column" align="center" justify="center" gap="lg" mih="100vh" w="100%">
				<Title order={2} fw={500} mb="lg">
					Sign in to Eventor
				</Title>
				<Paper p="xl" withBorder maw={500} w="100%">
					<form onSubmit={form.onSubmit(() => login())}>
						<Stack>
							<TextInput
								leftSection={<IconMail size="1.2rem" />}
								required
								label="Email"
								placeholder="email@domain.com"
								value={form.values.email}
								onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
								error={form.errors.email}
							/>

							<Button
								type="submit"
								fullWidth
								rightSection={loading ? <Loader size="xs" color="white" /> : <IconArrowRight width={18} height={18} />}
							>
								<Text fw={500}>Sign in</Text>
							</Button>
						</Stack>
					</form>

					<Text c="dimmed" size="xs">
						<span>Don't have an account?</span>
						<Anchor component={Link} to="/signup">
							Sign up
						</Anchor>
					</Text>
				</Paper>
			</Flex>
		</Container>
	);
}
