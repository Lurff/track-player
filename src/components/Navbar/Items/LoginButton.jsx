import React, { useEffect, useState, useContext, startTransition } from "react"; // Import startTransition
import { useTranslation } from "react-i18next";
import { message, Avatar, Menu, ConfigProvider } from "antd";

import { BiLogoSpotify, BiAt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import Context from "../../App/context.jsx";

const LoginButton = () => {
	const { t } = useTranslation();

	const { set, get } = useContext(Context);

	const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
	const REDIRECT_URI = import.meta.env.VITE_URL;
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPES = "user-read-private user-read-email";

	const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
		SCOPES
	)}`;

	useEffect(() => {
		if (get("token") && get("user")) return;

		const hash = getTokenFromUrl();
		const token = hash.access_token;

		if (token) {
			localStorage.setItem("token", token);
			set("token", token);
			startTransition(() => {
				// Wrap fetchUser call with startTransition
				fetchUser(token);
			});
		}
	}, []);

	const { getTokenFromUrl, fetchUser, logOut } = {
		getTokenFromUrl: () => {
			return window.location.hash
				.substring(1)
				.split("&")
				.reduce((initial, item) => {
					let parts = item.split("=");
					initial[parts[0]] = decodeURIComponent(parts[1]);
					return initial;
				}, {});
		},
		fetchUser: (token) => {
			fetch("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					localStorage.setItem("user", JSON.stringify(data));
					startTransition(() => {
						// Wrap state updates in startTransition
						set("user", data);
					});
					message.success({
						content: t("navbar.spotify_success_message"),
						duration: 5,
						className: "success",
					});
				})
				.catch(() => {
					message.error({
						content: t("navbar.spotify_error_message"),
						duration: 5,
						className: "success",
					});
				});
		},
		logOut: () => {
			set("token,user", null);
			localStorage.removeItem("user");
		},
	};

	const items = [
		{
			key: "1",
			icon: (
				<Avatar
					src={get("user")?.images.length && get("user")?.images[0].url}
					style={{
						color: "#191414",
						backgroundColor: "#1DB954",
						fontWeight: "bolder",
					}}
				>
					{!get("user")?.images.length && get("user")?.display_name.charAt(0)}
				</Avatar>
			),
			label: get("user")?.display_name,
			children: [
				{
					key: "2",
					label: t("navbar.spotify_logout_button"),
					icon: <FiLogOut size={20} className="text-red-600" />,
				},
			],
		},
	];

	return (
		<>
			{(!get("token") && (
				<a
					className="px-2.5 py-0.5 rounded-md relative whitespace-nowrap flex items-center justify-center text-gray-300 gap-1 transition-all border border-[#1DB954] hover:bg-[#1DB954] hover:text-white group"
					href={loginUrl}
				>
					<BiLogoSpotify
						size={30}
						className="group-hover:text-[#191414] text-[#1DB954] transition-all"
					/>
					<span className="font-semibold">{t("navbar.spotify_button")}</span>
				</a>
			)) ||
				(get("user") && (
					<ConfigProvider
						theme={{
							components: {
								Menu: {
									colorBgContainer: "transparent",
									itemSelectedColor: "#ccc",
									popupBg: "#111",
									itemColor: "#ccc",
									itemHoverBg: "#222",
									itemSelectedBg: "#333",
									itemActiveBg: "#333",
									itemHoverColor: "#ccc",
									activeBarBorderWidth: 0,
									activeBarWidth: 0,
								},
							},
						}}
					>
						<Menu
							onSelect={logOut}
							mode="horizontal"
							triggerSubMenuAction="click"
							items={items}
						></Menu>
					</ConfigProvider>
				))}
		</>
	);
};

export default LoginButton;
