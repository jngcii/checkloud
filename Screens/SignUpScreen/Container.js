import React from "react";
import { useMutation } from "react-apollo-hooks";
import { SIGN_UP, SAVE_TOKEN } from "../../API/queries/userQueires";
import useInput from "../../Hooks/useInput";
import Presenter from "./Presenter";

export default ({ type }) => {
    const [signupMutation] = useMutation(SIGN_UP);
    const [saveToken] = useMutation(SAVE_TOKEN);

	const username = useInput("");
	const name = useInput("");
	const password = useInput("");
	const password2 = useInput("");

	const onSubmit = async () => {
		if (
			!username.value ||
			!name.value ||
			!password.value ||
			!password2.value ||
			password.value !== password2.value
		) {
			password.onChange("");
			password2.onChange("");
		} else {
			const { data } = await signupMutation({
				variables: {
					username: username.value,
					name: name.value,
					password: password.value
				}
            });
            
            if(data && data.signup) {
                saveToken({
                    variables: {
                        token: data.signup.token
                    }
                })
            }
		}
	};

	return (
		<Presenter
			type={type}
			username={username}
			name={name}
			password={password}
			password2={password2}
			// func
			onSubmit={onSubmit}
		/>
	);
};
