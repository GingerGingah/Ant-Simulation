# Ant-Simulation
Ginger's version of an Ant Simulation.

## Current Features:
- Ants are represented with a directional sprite that points the way they're facing.
- Ants can be added one at a time, in batches of 100, deleted, or cleared entirely via buttons.
- Ants that naturally explore as if in their natural habitat, wandering with randomised movement that eases off the closer they are to a strong pheromone trail.
- Ants are clamped to the canvas and cannot walk off-screen, sliding along walls instead of bouncing through them.
- Ants that die play a placeholder death animation (a fading splat) before disappearing.
- They find food, and pheromone trails build — two separate trails (to food, and to home), deposited and sensed depending on whether an ant is currently carrying food.
- Food-trail strength fades the further an ant carries food from its source, giving the trail a real direction to follow rather than just marking "food is somewhere nearby."
- Food can be spawned via a button, is depleted as ants harvest it, visibly shrinks as it depletes, and disappears once exhausted.
- A nest is visible on the surface; food-carrying ants are pulled gently toward it on top of trail-following, and deposit collected food into a running nest total.
- Ants that wander too long without finding food are gradually pulled back toward the nest, so the colony doesn't lose ants to endless random wandering.

## Planned Ideas:
- A queen ant begins her journey with 0 ants, so she follows the natural ant cycle of a new colony being to dig a nest (you can actively view her digging and see the colony's home grow & change)
- Be able to see the "Surface" and the "Nest"
- Be self-serving where the ants don't need outside interference, however I can do whatever to add experiments to the world.
- Ant types
- Pause/resume with saved state, so the simulation can be closed and reopened without losing progress