/* Aqui estan las diferentes configuraciones q puede llevar */
/*
    new alert(
    "texto a llevar",
    {
        type: "danger | warning | success | default",
        ubication: "top | bottom",
        color: "rgba | rgb | hexadecimales"
    }
    )
*/


class Alert {
	config;
	tag;
	htmlAlert;

	constructor(text, config) {
		this.config = config || {};
		this.tag = this.createdAlert(text);
		this.stylusAlert(this.tag, config);
	}

	prepareAlert() {
		let existe;

		if (this.config) {
			const ubication =
				this.config.ubication === "top" ? "top" : "bottom";

			if (document.querySelector(`.containerAlert-${ubication}`)) {
				return document.querySelector(`.containerAlert-${ubication}`);
			} else {
				var containAlert = document.createElement("main");
				containAlert.setAttribute(
					"class",
					`containerAlert-${ubication}`
				);
				document.body.append(containAlert);
				existe = containAlert;
			}
		} else {
			if (document.querySelector(`.containerAlert-bottom`)) {
				return document.querySelector(`.containerAlert-bottom`);
			} else {
				var containAlert = document.createElement("main");
				containAlert.setAttribute("class", `containerAlert-bottom`);
				document.body.append(containAlert);
				existe = containAlert;
			}
		}

		return existe;
	}

	createdAlert(text) {
		const divContainer = this.prepareAlert();

		const alertNew = document.createElement("div");
		this.htmlAlert = alertNew;

		alertNew.setAttribute("class", "AlertPlannerApp Alert-default");

		alertNew.innerHTML = text;

		divContainer.append(alertNew);
		this.activeCloseAlert(alertNew);
		return alertNew;
	}

	closeAlert(div) {
		if (!div) div = this.htmlAlert;

		div.style.animation = "AlertClose .5s forwards";

		setTimeout(() => div.remove(), 500);
	}

	activeCloseAlert(div) {
		setTimeout(() => this.closeAlert(), this.config.timeClose || 9000);

		div.addEventListener("click", () => this.closeAlert());
	}

	stylusAlert(tag, config) {
		if (config === undefined || config === null) {
			return;
		} else {
			tag.style.color = config.color || "auto";
			tag.classList.add(`Alert-${config.type || ""}`);
		}
	}
}

window.Window.prototype.Alert = function (text, config) {
	new Alert(text, config);
};

// @ts-ignore
window.Alert = Alert;

export default Alert;
