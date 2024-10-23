import { createContext, useEffect, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
	const [data, setData] = useState({ token: null, user: null });

	const values = {
		get: (key) => data[key],
		set: (key, value) => {
			if (key.includes(",") && Array.isArray(value)) {
				const keys = key.trim().split(",");
				const values = value;

				if (values.length < keys.length)
					throw Error("Birden fazla başlık altına yazılacak değer sayısı az!");

				keys.map((key, index) => {
					setData((prevValues) => ({ ...prevValues, [key]: values[index] }));
				});
			} else if (key.includes(",") && !Array.isArray(value)) {
				const keys = key.trim().split(",");

				keys.map((key) => {
					setData((prevValues) => ({ ...prevValues, [key]: value }));
				});
			} else {
				setData((prevValues) => ({ ...prevValues, [key]: value }));
			}
			return data[key];
		},
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const token = localStorage.getItem("token");

		setData((prev) => ({ ...prev, token, user }));
	}, []);

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default Context;
