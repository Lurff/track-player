import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import DedeKorkut from "/img/dede_korkut.jpg";

const Home = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div className="w-3/4 h-screen flex flex-col items-center justify-center">
			<div className="w-full h-full flex flex-row items-center p-5">
				<div className="relative flex items-center">
					<img
						className="w-64 bg-cover rounded-xl z-10"
						draggable={false}
						src={DedeKorkut}
						alt="DedeKorkut"
					/>
					<img
						className="w-64 bg-cover rounded-lg blur-xl absolute"
						draggable={false}
						src={DedeKorkut}
						alt="DedeKorkut"
					/>
				</div>
				<div className="w-full flex flex-col items-center justify-center gap-5">
					<span className="text-gray-300 text-4xl font-medium max-md:text-2xl">
						<Trans i18nKey={"home.title"} />
					</span>
					<span className="text-gray-300 text-5xl font-bold max-xl:text-3xl max-md:text-xl max-md:text-nowrap">
						<TypeAnimation
							sequence={[
								t("home.paragraph_1"),
								2000,
								t("home.paragraph_2"),
								2000,
							]}
						/>
					</span>
					<span className="p-2 text-gray-300 text-2xl font-medium text-center">
						{t("home.paragraph_3")}
					</span>
					<div className="w-full flex flex-row items-center justify-center gap-5">
						<div className="relative flex items-center justify-center">
							<button
								onClick={() => navigate("/listen")}
								className="p-2 rounded-md text-slate-100 hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 peer z-10 transition-all"
							>
								{t("home.buttons.listen")}
							</button>
							<span className="w-full h-full absolute bg-gradient-to-r to-sky-900 from-indigo-700 rounded-md peer-hover:blur-xl z-0 transition-all"></span>
						</div>
						<a
							rel="noopener noreferrer"
							target="_blank"
							className="p-2 rounded-lg text-slate-200 hover:text-white transition-all border-2 border-[#555] hover:bg-[#333]"
							href="https://acobnn.netlify.app/contact"
						>
							{t("home.buttons.contact")}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
