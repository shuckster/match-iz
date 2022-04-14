import { strict } from 'assert'

import { isArray, isDate, isNumber, isPojo, isString } from '../src/types.mjs'
import { maybeTry, safe } from './maybe.mjs'

import * as lib from '../src/match-iz.mjs'
import * as local from '../dates/index.mjs'
import * as utc from '../dates/utc/index.mjs'

const { match, against, when, otherwise, spread, pluck: $ } = lib
const { allOf, anyOf, not, defined, empty } = lib
const { gt, lt, gte, lte, inRange, startsWith, endsWith } = lib
const { includes, includedIn, hasOwn, cata } = lib
const { firstOf, lastOf } = lib

const { just, nothing } = cata({
  just: m => m?.isJust,
  nothing: m => m?.isNothing,
  getValue: m => m?.valueOf()
})

const maybeNumber = safe(isNumber)

const testCases = [
  [
    'Literals',
    {
      cases: [
        { input: null, expecting: 'null' },
        { input: true, expecting: 'true' },
        { input: false, expecting: 'false' },
        { input: 1, expecting: '1' },
        { input: 'hello, world!', expecting: 'hello, world!' },
        { input: 'non-existent', expecting: false }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(true)('true'),
            when(false)('false'),
            when({ test: 1 })('should not throw if "null" is an input'),
            when(null)('null'),
            when(1)('1'),
            when('hello, world!')('hello, world!'),
            otherwise(false)
          )
        )
      }
    }
  ],
  [
    'Literals, uncurried when()',
    {
      cases: [
        { input: null, expecting: 'null' },
        { input: true, expecting: 'true' },
        { input: false, expecting: 'false' },
        { input: 1, expecting: '1' },
        { input: 'hello, world!', expecting: 'hello, world!' },
        { input: 'non-existent', expecting: false }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(true, 'true'),
            when(false, 'false'),
            when({ test: 1 }, 'should not throw if "null" is an input'),
            when(null, 'null'),
            when(1, '1'),
            when('hello, world!', 'hello, world!'),
            otherwise(false)
          )
        )
      }
    }
  ],
  [
    'when() throws',
    {
      cases: [{ input: null, expecting: 'null' }],
      run: assertCase => {
        assertCase(
          maybeTry(() => when())
            .orElse(() => 'null')
            .valueOf()
        )
      }
    }
  ],
  [
    'Helpers',
    {
      cases: [
        { input: 0, expecting: 'lte' },
        { input: 10, expecting: 'gte' },
        { input: 1, expecting: 'gt' },
        { input: -1, expecting: 'lt' },
        { input: 35, expecting: 'inRange1' },
        { input: 55, expecting: 'inRange2' },
        { input: 'hello, world!', expecting: 'startsWith' },
        { input: 'ahoyhoy, world!', expecting: 'endsWith' },
        { input: ['ignatius', 'cheese'], expecting: 'includesArray' },
        { input: 'chili dogs', expecting: 'includesString' },
        { input: undefined, expecting: 'empty' },
        { input: false, expecting: 'defined' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(inRange(30, 40))('inRange1'),
            when(inRange(60, 50))('inRange2'),
            when(gte(10))('gte'),
            when(gt(0))('gt'),
            when(lt(0))('lt'),
            when(lte(20))('lte'),
            when(startsWith('hello'))('startsWith'),
            when(endsWith('world!'))('endsWith'),
            when(includes('cheese'))('includesArray'),
            when(includes('chili'))('includesString'),
            when(empty)('empty'),
            when(defined)('defined')
          )
        )
      }
    }
  ],
  [
    'Object-prop regular-expressions',
    {
      cases: [
        { input: { note: 'ahoyhoy, world!' }, expecting: 'world' },
        { input: { text: 'hello, world!' }, expecting: 'hello' },
        { input: 'non-existent', expecting: null }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when({ text: /hello/ })('hello'),
            when({ note: /world/ })('world'),
            otherwise(null)
          )
        )
      }
    }
  ],
  [
    'Matching fetch() responses',
    {
      cases: [
        {
          input: { status: 200, headers: { 'Content-Length': 1234 } },
          expecting: 'size is 1234'
        },
        {
          input: { status: 200 },
          expecting: "I didn't understand that..."
        },
        {
          input: { status: 301 },
          expecting: 'This is fine'
        },
        {
          input: { status: 401 },
          expecting: 'Flagrant error! 401'
        },
        {
          input: { status: 404 },
          expecting: 'JSON not found'
        },
        {
          input: { status: 500 },
          expecting: 'Server error!'
        },
        {
          input: { status: 0 },
          expecting: "I didn't understand that..."
        }
      ],
      run: (assertCase, input) => {
        function fetch() {
          return input
        }

        const res = fetch('/json')
        const isInteger = Number.isInteger

        assertCase(
          match(res)(
            // Object prop match + destructuring value
            when({ status: 200, headers: { 'Content-Length': isInteger } })(
              ({ headers: { 'Content-Length': size } }) => {
                return `size is ${size}`
              }
            ),

            // Object prop match
            when({ status: 404 })('JSON not found'),

            // Custom predicate
            when(({ status }) => status >= 500)('Server error!'),

            // Object prop w/ greater-than-or-equal matcher
            when({ status: $(gte(400)) })(
              status => `Flagrant error! ${status}`
            ),

            // Object prop w/ range matcher
            when({ status: inRange(300, 399) })('This is fine'),

            otherwise("I didn't understand that...")
          )
        )
      }
    }
  ],
  [
    'Redux reducers',
    {
      cases: [
        {
          input: [{ todos: [] }, { type: 'unknown' }],
          expecting: {
            todos: []
          }
        },
        {
          input: [
            { todos: [] },
            { type: 'add-todo', payload: 'Do the dishes' }
          ],
          expecting: {
            todos: [{ text: 'Do the dishes', completed: false }]
          }
        },
        {
          input: [
            { todos: [{ text: 'Do the dishes', completed: false }] },
            { type: 'set-visibility-filter', payload: true }
          ],
          expecting: {
            todos: [{ text: 'Do the dishes', completed: false }],
            visFilter: true
          }
        },
        {
          input: [
            { todos: [{ text: 'Do the dishes', completed: false }] },
            { type: 'toggle-todo', payload: 0 }
          ],
          expecting: {
            todos: [{ text: 'Do the dishes', completed: true }]
          }
        }
      ],
      run: (assertCase, [state, action]) => {
        assertCase(
          match(action)(
            when({ type: 'set-visibility-filter', payload: $() })(
              visFilter => ({
                ...state,
                visFilter
              })
            ),

            when({ type: 'add-todo', payload: $() })(text => ({
              ...state,
              todos: [...state.todos, { text, completed: false }]
            })),

            when({ type: 'toggle-todo', payload: $() })(index => ({
              ...state,
              todos: state.todos.map((todo, i) =>
                match(i)(
                  when(index)({ ...todo, completed: !todo.completed }),
                  otherwise(todo)
                )
              )
            })),

            otherwise(state)
          )
        )
      }
    }
  ],
  [
    'HTML component state-machine',
    {
      cases: [
        {
          input: { loading: true },
          expecting: '<Loading />'
        },
        {
          input: { error: "That didn't work out" },
          expecting: "<Error>That didn't work out</Error>"
        },
        {
          input: { data: 'Hey, what up' },
          expecting: '<Page>Hey, what up</Page>'
        }
      ],
      run: (assertCase, props) => {
        const { loading, error, data } = spread(defined)

        const LoadingComponent = () => '<Loading />'
        const ErrorComponent = ({ error }) => `<Error>${error}</Error>`
        const PageComponent = ({ data }) => `<Page>${data}</Page>`

        assertCase(
          match(props)(
            when({ loading })(LoadingComponent),
            when({ error })(ErrorComponent),
            when({ data })(PageComponent)
          )
        )
      }
    }
  ],
  [
    'Vector overloading',
    {
      cases: [
        {
          input: { x: 10, y: 20, z: 5 },
          expecting: 22.9128784747792
        },
        {
          input: { x: 12, y: 65 },
          expecting: 66.09841147864297
        },
        {
          input: [1, 2, 3],
          expecting: 3
        }
      ],
      run: (assertCase, vector) => {
        const { x, y, z } = spread(defined)

        assertCase(
          match(vector)(
            when({ x, y, z })(({ x, y, z }) => Math.hypot(x, y, z)),
            when({ x, y })(({ x, y }) => Math.hypot(x, y)),
            otherwise(vector => vector.length)
          )
        )
      }
    }
  ],
  [
    'Regular-expression matching',
    {
      cases: [
        {
          input: '01234567780',
          expecting: '+44(0)1234 567 780'
        },
        {
          input: 'Ignacius Cheese',
          expecting: 'Mr Cheese'
        },
        {
          input: '1 + 2',
          expecting: 3
        },
        {
          input: 'hello, world!',
          expecting: 'that was standard'
        },
        {
          input: 'the five boxing wizards jump quickly',
          expecting: 'boxing'
        },
        {
          input: false,
          expecting: 'Unknown field in CSV'
        }
      ],
      run: (assertCase, input) => {
        const add = (left, right) => parseInt(left, 10) + parseInt(right, 10)

        assertCase(
          match(input)(
            when(/(boxing)/)(([, firstMatch]) => {
              return firstMatch
            }),

            when(/(?<leadingZero>0?)(?<p1>\d{4,5})(?<p2>\d{3})(?<p3>\d{3})/)(
              ({ leadingZero, p1, p2, p3 }) => {
                return `+44(${leadingZero})${p1} ${p2} ${p3}`
              }
            ),

            when(/(?<firstName>\w+) (?<lastName>\w+)/)(({ lastName }) => {
              return 'Mr ' + lastName
            }),

            when(/(?<left>\d+) \+ (?<right>\d+)/)(({ left, right }) => {
              return add(left, right)
            }),

            when(/world/)('that was standard'),

            otherwise('Unknown field in CSV')
          )
        )
      }
    }
  ],
  [
    'Custom pattern',
    {
      cases: [
        { input: { status: 1 }, expecting: 'status is an integer' },
        { input: 1, expecting: 'input is an integer' }
      ],
      run: (assertCase, input) => {
        const isInteger = value => Number.isInteger(value)

        assertCase(
          match(input)(
            when({ status: isInteger })('status is an integer'),
            when(isInteger)('input is an integer')
          )
        )
      }
    }
  ],
  [
    'Nested pattern objects',
    {
      cases: [
        {
          input: { status: 1, hello: { where: 'world' } },
          expecting: 'nested "world"'
        },
        {
          input: { status: 1, hello: { where: 'there' } },
          expecting: 'nested "there"'
        },
        {
          input: { status: 1, hello: { where: 'everywhere' } },
          expecting: 'nested "everywhere"'
        },
        {
          input: { status: 1 },
          expecting: 'just status 1'
        }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when({ status: 1, hello: { where: 'world' } })('nested "world"'),
            when({ status: 1, hello: { where: 'there' } })('nested "there"'),
            when({ status: 1, hello: { where: /where|every/ } })(
              'nested "everywhere"'
            ),
            when({ status: 1 })('just status 1')
          )
        )
      }
    }
  ],
  [
    'sort(against...',
    {
      cases: [{ input: [10, 9, 8, 7], expecting: [7, 8, 9, 10] }],
      run: (assertCase, input) => {
        assertCase(
          input.sort(
            nargs(
              against(
                when(([a, b]) => a < b)(-1),
                when(([a, b]) => a === b)(0),
                when(([a, b]) => a > b)(1)
              )
            )
          )
        )
      }
    }
  ],
  [
    'Matching an array against an array instead of literals/objects',
    {
      cases: [
        { input: ['1', '', undefined, ''], expecting: 'one' },
        { input: ['1', '', '', '!'], expecting: 'nope' },
        { input: ['', '2'], expecting: 'two, two items' },
        { input: ['', '2', '', ''], expecting: 'two, four items' },
        { input: ['', '2', ''], expecting: 'two, three items' },
        { input: [undefined, '2', ''], expecting: 'two, three items' },
        { input: ['', '2', undefined], expecting: 'two, three items' },
        { input: ['', []], expecting: 'nope' },
        { input: 'fish', expecting: 'nope' }
      ],
      run: (assertCase, input) => {
        const _ = empty
        assertCase(
          match(input)(
            when(['1', _, _, _])('one'),
            when([_, '2', _, _])('two, four items'),
            when([_, '2'])('two, two items'),
            when([_, '2', _])('two, three items'),
            otherwise('nope')
          )
        )
      }
    }
  ],
  [
    'Various isDate(Invalid Date)',
    {
      cases: [
        { input: new Date(NaN), expecting: 'bad' },
        { input: new Date(-Infinity), expecting: 'bad' },
        { input: new Date(Infinity), expecting: 'bad' },
        { input: new Date('Invalid Date'), expecting: 'bad' },
        { input: new Date('1970-01-01'), expecting: 'ok' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(not(isDate))(() => 'bad'),
            otherwise('ok')
          )
        )
      }
    }
  ],
  [
    'isNumber(NaN) should return false',
    {
      cases: [
        { input: NaN, expecting: 'NaN' },
        { input: 1, expecting: '1' },
        { input: 2, expecting: '2' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(2)('2'),
            when(isNumber)('1'),
            when(not(isNumber))('NaN')
          )
        )
      }
    }
  ],
  [
    'Can match NaN, sub-arrays',
    {
      cases: [
        { input: [1, NaN], expecting: '1 NaN' },
        { input: [2, NaN], expecting: '2 NaN' },
        { input: [3, NaN], expecting: '3 NaN' },
        { input: [4, NaN, [NaN]], expecting: '4 NaN' },
        { input: [4, NaN, [NaN, 'b']], expecting: '5 NaN' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when([1, NaN])('1 NaN'),
            when([2, isNaN])('2 NaN'),
            when([3, Number.isNaN])('3 NaN'),
            when([4, Number.isNaN, [NaN]])('4 NaN'),
            when([4, isNaN, [NaN, 'b']])('5 NaN'),
            otherwise('oops')
          )
        )
      }
    }
  ],
  [
    'anyOf() / OR',
    {
      cases: [
        {
          input: { message: 'hello world!', number: 42 },
          expecting: "that's no good"
        },
        {
          input: { message: 'hello wrrld!', number: 42 },
          expecting: 'ok!'
        },
        {
          input: 'two',
          expecting: 'two?'
        }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when({ message: endsWith('world!'), number: 42 })("that's no good"),
            when(anyOf({ message: endsWith('world!') }, { number: 42 }))('ok!'),
            when(anyOf('one', /two/))('two?')
          )
        )
      }
    }
  ],
  [
    'allOf() / AND',
    {
      cases: [
        { input: { option: 'yes', quantity: 1 }, expecting: '1' },
        { input: { option: 'yes', quantity: 2 }, expecting: '2' },
        { input: { option: 'yes', quantity: 3 }, expecting: '3' },
        { input: { array: [1, 2, 3, 4] }, expecting: '4' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(allOf(isPojo, { option: 'yes' }, { quantity: 1 }))('1'),
            when(allOf(isPojo, { option: 'yes', quantity: 2 }))('2'),
            when(allOf(isPojo, { quantity: 3 }, { option: 'yes' }))('3'),
            when({
              array: allOf(not(isPojo), Array.isArray, x => x.length === 4)
            })('4')
          )
        )
      }
    }
  ],
  [
    'not()',
    {
      cases: [
        { input: 0, expecting: 'a' },
        { input: 10, expecting: 'b' },
        { input: 20, expecting: 'c' },
        { input: 30, expecting: 'd' },
        { input: 40, expecting: 'e' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(not(gte(10)))('a'),
            when(not(gte(20)))('b'),
            when(not(gte(30)))('c'),
            when(not(40))('d'),
            when(40)('e')
          )
        )
      }
    }
  ],
  [
    'includedIn()',
    {
      cases: [
        { input: 0, expecting: 'a' },
        { input: 10, expecting: 'b' },
        { input: 20, expecting: 'c' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(includedIn([1, 2, 3, 0, 4, 5]))('a'),
            when(includedIn([1, 2, 3, 10, 4, 5]))('b'),
            when(includedIn([1, 2, 3, 20, 4, 5]))('c')
          )
        )
      }
    }
  ],
  [
    'hasOwn()',
    {
      cases: [
        { input: { pages: 1, data: { body: 'text' } }, expecting: 'a' },
        { input: { pages: 2, data: { body: 'text' } }, expecting: 'b' },
        { input: { data: { body: 'text' } }, expecting: 'c' },
        { input: { pages: 0, data: { body: 'text' } }, expecting: 'd' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(not(hasOwn('pages', 'data')))('c'),
            when({ pages: gt(1) })(() => 'b'),
            when({ pages: 1 })('a'),
            otherwise(() => 'd')
          )
        )
      }
    }
  ],
  [
    'cata',
    {
      cases: [
        { input: maybeNumber(42), expecting: 42 },
        { input: maybeNumber('42'), expecting: 'empty' },
        { input: '42', expecting: 'not a monad' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            just(x => x),
            nothing('empty'),
            otherwise('not a monad')
          )
        )
      }
    }
  ],
  [
    'empty() === ""',
    {
      cases: [{ input: '', expecting: 'empty' }],
      run: (assertCase, input) => {
        assertCase(match(input)(when(empty)('empty')))
      }
    }
  ],
  [
    'empty() === undefined',
    {
      cases: [{ input: undefined, expecting: 'empty' }],
      run: (assertCase, input) => {
        assertCase(match(input)(when(empty)('empty')))
      }
    }
  ],
  [
    'empty() === null',
    {
      cases: [{ input: null, expecting: 'empty' }],
      run: (assertCase, input) => {
        assertCase(match(input)(when(empty)('empty')))
      }
    }
  ],
  [
    'empty() === []',
    {
      cases: [{ input: [], expecting: 'empty' }],
      run: (assertCase, input) => {
        assertCase(match(input)(when(empty)('empty')))
      }
    }
  ],
  [
    'empty() === {}',
    {
      cases: [{ input: {}, expecting: 'empty' }],
      run: (assertCase, input) => {
        assertCase(match(input)(when(empty)('empty')))
      }
    }
  ],
  [
    'isDay / isFri / isTue',
    {
      cases: [
        {
          input: datesFrom({ startDate: [2022, 1, 1], days: 365 }),
          expecting: 114
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(
            when(local.isDay(-1))(true),
            when(local.isFri)(true),
            when(local.isTue)(true)
          )
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'isDay(gt(28)) in 2022',
    {
      cases: [
        {
          input: datesFrom({ startDate: [2022, 1, 1], days: 366 }),
          expecting: 29
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(when(allOf(local.isDay(gt(28))))(true))
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'isDay(gt(28)) in 2024',
    {
      cases: [
        {
          input: datesFrom({ startDate: [2024, 1, 1], days: 366 }),
          expecting: 30
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(when(allOf(local.isDay(gt(28))))(true))
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'inTheNext(...)',
    {
      cases: [
        {
          input: datesFrom({
            startDate: Date.now(),
            days: 10
          }),
          expecting: 5
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(when(utc.inTheNext(5, 'days'), true), otherwise(false))
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'inTheFuture()',
    {
      cases: [
        {
          input: datesFrom({
            startDate: Date.now() - daysMs(5),
            days: 11
          }),
          expecting: 5
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(when(utc.inTheFuture(), true), otherwise(false))
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'inThePast(...)',
    {
      cases: [
        {
          input: datesFrom({
            startDate: Date.now() - daysMs(10),
            days: 12
          }),
          expecting: 5
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(when(utc.inThePast(5, 'days'), true), otherwise(false))
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'inThePast()',
    {
      cases: [
        {
          input: datesFrom({
            startDate: Date.now() - daysMs(4),
            days: 10
          }),
          expecting: 5
        }
      ],
      run: (assertCase, input) => {
        const days = input.filter(
          against(when(utc.inThePast(), true), otherwise(false))
        )
        assertCase(days.length)
      }
    }
  ],
  [
    'when() guards',
    {
      cases: [
        {
          input: 6,
          expecting: 'greater than 5'
        },
        {
          input: 8,
          expecting: 'greater than 6 and less than 11'
        }
      ],
      run: (assertCase, input) => {
        const result = match(input)(
          when(
            isNumber,
            gte(7),
            lt(11),
            () => 'greater than 6 and less than 11'
          ),
          when(isNumber, gt(5), () => 'greater than 5')
        )
        assertCase(result)
      }
    }
  ],
  [
    'firstOf(), lastOf()',
    {
      cases: [
        {
          input: [1, 'a', 3, 4, 5, 6],
          expecting: 'firstOf'
        },
        {
          input: [9, 8, 7, 6, 5, 'a'],
          expecting: 'lastOf'
        }
      ],
      run: (assertCase, input) => {
        const result = match(input)(
          when(lastOf(isNumber, isString))(() => {
            return 'lastOf'
          }),
          when(firstOf(isNumber, isString))(() => {
            return 'firstOf'
          })
        )
        assertCase(result)
      }
    }
  ]
]

function daysMs(n) {
  return n * 24 * 60 * 60 * 1000
}

function datesFrom({ startDate, days }) {
  const refDate = match(startDate)(
    when([isNumber, isNumber, isNumber])(x => {
      const [year, month, day] = x
      return new Date(Date.UTC(year, month - 1, day))
    }),
    when(isNumber)(x => new Date(x)),
    when(isDate)(x => x)
  )
  return Array.from(
    { length: days },
    (_, i) => new Date(refDate.getTime() + daysMs(i))
  )
}

function nargs(fn) {
  return (...args) => fn(args)
}

function makeTester(expecting, message) {
  return saw => {
    try {
      if (isPojo(expecting) || isArray(expecting)) {
        strict.deepEqual(saw, expecting)
      } else {
        strict.equal(saw, expecting)
      }
    } catch (error) {
      throw new Error(error + message)
    }
  }
}

testCases.forEach(([description, testCase]) => {
  const { cases, run } = testCase
  cases.forEach(({ input, expecting }, index) => {
    const message = `\n\n^\n| Test case failed in [${index}]: ${description}\n`
    const test = makeTester(expecting, message)
    run(test, input)
  })
})

process.exit(0)
