function createMachine(stateMachineDefinition) {
	const machine = {
		// machine object
		value: stateMachineDefinition.initialState,
		transition(currentState, event) {
			const currentStateDefinition = stateMachineDefinition[currentState];
			const destStateTransition = currentStateDefinition.transitions[event];

			if (!destStateTransition) {
				return;
			}

			const destState = destStateTransition.target;
			const destStateDefinition = stateMachineDefinition[destState];
			destStateTransition.action();
			currentStateDefinition.actions.onExit();
			destStateDefinition.actions.onEnter();

			machine.value = destState;
			return machine.value;
		}
	};
	return machine;
}

const machine = createMachine({
	// state machine definition object here...
	initialState: 'off',
	off: {
		actions: {
			onEnter() {
				console.log('off: onEnter');
			},
			onExit() {
				console.log('off: onExit');
			}
		},
		transitions: {
			switch: {
				target: 'on',
				action() {
					console.log('transition action for "switch" in "off" state');
				}
			}
		}
	},
	on: {
		actions: {
			onEnter() {
				console.log('on: onEnter');
			},
			onExit() {
				console.log('on: onExit');
			}
		},
		transitions: {
			switch: {
				target: 'off',
				action() {
					console.log('transition action for "switch" in "on" state');
				}
			}
		}
	}
});

let state = machine.value;
console.log(`current state: ${state}`); // current state: off

state = machine.transition(state, 'switch');
console.log(`\n current state: ${state}`); // current state: on

state = machine.transition(state, 'switch');
console.log(`\n current state: ${state}`); // current state: off
