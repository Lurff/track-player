import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<div className="w-full flex justify-center">
			<div className="w-3/4 p-5 flex flex-col border-t border-[#333]">
				<div className="w-full flex flex-col items-center justify-center gap-2">
					<span className="text-gray-400 text-lg max-md:text-sm max-lg:text-center">
						<Trans
							i18nKey={"footer.description"}
							components={{
								a: (
									<a
										className="text-blue-500/80 font-semibold hover:text-blue-400/90 transition-all hover:underline underline-offset-4"
										target="_blank"
										href="https://acobnn.netlify.app/"
									>
										Atakan Çoban
									</a>
								),
							}}
						/>
					</span>
					<span className="text-gray-400 text-lg max-md:text-sm max-lg:text-center">
						<Trans i18nKey={"footer.description_2"} />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
