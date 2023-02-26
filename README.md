# Distance calculation between coordinates

## Example

```
//mock users
const users = [
    {name: 'Dmitry', coords: {lat: 55.75997082507456, long: 37.61880091717522}},
    {name: 'Arseniy', coords: {lat: 55.75715520072312, long: 37.59930911096237}},
    {name: 'Vladimir', coords: {lat: 55.76534722706627, long: 37.6381087219935}},
    {name: 'Alexey', coords: {lat: 55.7313717263022, long: 37.63652230967238}},
    {name: 'Vlad', coords: {lat: 55.72829490711412, long: 37.578260951637525}}
];

const coordsLengthDistance = new CoordsLengthDistance('#app', {users});
coordsLengthDistance.init();
```