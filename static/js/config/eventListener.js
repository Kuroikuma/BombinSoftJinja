let TypeEvent = {
	click : "click",
	dbClick : "dblclick",
	change : "change",
	focus : "focus",
	submit : "submit",
	domContentLoaded : "DOMContentLoaded",
	resize : "resize",
	load : "load",
	keydown : "keydown",
	keyup : "keyup",
	blur : "blur",
	mouseMove : "mousemove",
	mouseEnter : "mouseenter",
	mouseOut : "mouseout",
	Touchmove : "touchmove",
	Touchend : "touchend",
	beforeunload : "beforeunload",
}

let __events__= [];

// Archivo solo para eventos de las vistas de Equipo
for (const item of Object.keys(TypeEvent)) {
	document.addEventListener(TypeEvent[item], (e) =>
		managerEvent(e, TypeEvent[item])
	);
}

const managerEvent = (e, typeEvent) => {
	const click = e.target;

	const listEvents = __events__.filter(
		(event) => event.type === typeEvent
	);

	if (click.matches) {
		const matchesWithClick = listEvents.filter(
			(_event) =>
				_event.matches != undefined && click.closest(_event.matches)
		);
		matchesWithClick.forEach((_event) =>
			_event.callback(click.closest(_event.matches), e)
		);
	} else {
		listEvents.forEach((event) => event.callback(click));
	}
};

const addEvent = (type, matches, callback) => {
	removeEvent(type, matches);

	__events__.push({
		type,
		callback,
		matches,
	});
};

const addEventWithValidation = (
	type,
	matches,
	callback,
	pathName
) => {
	if (window.location.pathname.toLowerCase().includes(pathName.toLowerCase()))
		return;
	addEvent(type, matches, callback);
};

const removeEvent = (type, matches) => {
	const event = __events__.findIndex(
		(a) => a.type == type && a.matches == matches
	);

	if (event == -1) return;
	__events__.splice(event, 1);
};

//addEvent(TypeEvent.change, ".checkBodega", (e: HTMLInputElement) => changeStateBodega(e));

export { addEvent, TypeEvent, removeEvent, addEventWithValidation };
