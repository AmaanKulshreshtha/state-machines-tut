# State Machines

* Actions:
  + Adding hooks
  + console.log(state: hook)
* Each state can define events that trigger a transition.
* Transitions:
  + Since our event is a 'switch' event, we add another property in our transitions object
  + A transition defines how a machine would react to the event, state1 -> state2.
  + Switch: 
    - We will define our target state(the one we want to transition to) inside this switch event.
  + A transition can define actions that occur when the transition happens. Actions will typically have side effects.
    - There can be many ways to enter a state and maybe we want some side-effect to happen only when transitioning to state A from a specific state B but not from state C.

