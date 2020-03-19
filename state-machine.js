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

/*
* Actions:
		- Adding hooks
		- console.log(state: hook)
* Each state can define events that trigger a transition.
* Transitions:
		- Since our event is a 'switch' event, we add another property in our transitions object
		- A transition defines how a machine would react to the event, state1 -> state2.
		- Switch: 
				- We will define our target state(the one we want to transition to) inside this switch event.
		- A transition can define actions that occur when the transition happens. Actions will typically have side effects.
				- There can be many ways to enter a state and maybe we want some side-effect to happen only when transitioning to state A from a specific state B but not from state C.
*/

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
