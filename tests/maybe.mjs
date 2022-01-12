//
// A minimal Maybe monad.
//

export const Identity = x => x

export const Nothing = () => ({
  valueOf: () => undefined,
  toString: () => 'Nothing',
  map: () => Nothing(),
  chain: () => Nothing(),
  fold: (f /*, _*/) => f(),
  orElse: f => f(),
  ap: () => Nothing(),
  isNothing: true,
  isJust: false
})

Nothing.of = () => Nothing()

export const Just = x => ({
  valueOf: () => x,
  toString: () => `Just(${x})`,
  map: f => Just(f(x)),
  chain: f => f(x),
  fold: (_, g) => g(x),
  orElse: () => Just(x),
  ap: m => m.map(x),
  isNothing: false,
  isJust: true
})

Just.of = x => Just(x)

export const safe = (predicate = x => x != null) => {
  const Maybe = x => {
    return predicate(x) ? Just(x) : Nothing()
  }
  Maybe.of = x => Maybe(x)
  return Maybe
}

export const Maybe = safe()
