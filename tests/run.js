const { strict } = require('assert')
const { isPojo, isArray } = require('../src/types')
const lib = require('../src/match-iz')

const { match, when, otherwise, spread } = lib
const {
  defined,
  empty,
  gt,
  lt,
  gte,
  lte,
  inRange,
  startsWith,
  endsWith,
  includes
} = lib

const testCases = [
  [
    'Literals',
    {
      cases: [
        { input: true, expecting: 'true' },
        { input: false, expecting: 'false' },
        { input: 1, expecting: '1' },
        { input: 'hello, world!', expecting: 'hello, world!' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(true)('true'),
            when(false)('false'),
            when(1)('1'),
            when('hello, world!')('hello, world!')
          )
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
        { input: 35, expecting: 'inRange' },
        { input: 'hello, world!', expecting: 'startsWith' },
        { input: 'ahoyhoy, world!', expecting: 'endsWith' },
        { input: ['ignatius', 'cheese'], expecting: 'includesArray' },
        { input: 'chili dogs', expecting: 'includesString' },
        { input: undefined, expecting: 'empty' },
        { input: true, expecting: 'defined' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when(inRange(30, 40))('inRange'),
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
        { input: { text: 'hello, world!' }, expecting: 'hello' }
      ],
      run: (assertCase, input) => {
        assertCase(
          match(input)(
            when({ text: /hello/ })('hello'),
            when({ note: /world/ })('world')
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
          expecting: 'size is undefined'
        },
        {
          input: { status: 301 },
          expecting: 'This is fine'
        },
        {
          input: { status: 400 },
          expecting: 'Flagrant error!'
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

        assertCase(
          match(res)(
            // Object prop match + destructuring value
            when({ status: 200 })(
              ({ headers: { 'Content-Length': s } = {} }) => `size is ${s}`
            ),

            // Object prop match
            when({ status: 404 })('JSON not found'),

            // Custom predicate
            when(({ status }) => status >= 500)('Server error!'),

            // Object prop w/ greater-than-or-equal matcher
            when({ status: gte(400) })('Flagrant error!'),

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
          expecting: { todos: [] }
        },
        {
          input: [
            { todos: [] },
            { type: 'add-todo', payload: 'Do the dishes' }
          ],
          expecting: { todos: [{ text: 'Do the dishes', completed: false }] }
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
          expecting: { todos: [{ text: 'Do the dishes', completed: true }] }
        }
      ],
      run: (assertCase, [state, action]) => {
        assertCase(
          match(action)(
            when({ type: 'set-visibility-filter' })(
              ({ payload: visFilter }) => ({
                ...state,
                visFilter
              })
            ),

            when({ type: 'add-todo' })(({ payload: text }) => ({
              ...state,
              todos: [...state.todos, { text, completed: false }]
            })),

            when({ type: 'toggle-todo' })(({ payload: index }) => {
              return {
                ...state,
                todos: state.todos.map((todo, i) =>
                  i !== index ? todo : { ...todo, completed: !todo.completed }
                )
              }
            }),

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
          input: false,
          expecting: 'Unknown field in CSV'
        }
      ],
      run: (assertCase, input) => {
        const add = (left, right) => parseInt(left, 10) + parseInt(right, 10)

        assertCase(
          match(input)(
            when(/(?<leadingZero>0?)(?<p1>\d{4,5})(?<p2>\d{3})(?<p3>\d{3})/)(
              ({ groups: { leadingZero, p1, p2, p3 } }) => {
                return `+44(${leadingZero})${p1} ${p2} ${p3}`
              }
            ),

            when(/(?<firstName>\w+) (?<lastName>\w+)/)(
              ({ groups: { lastName } }) => {
                return 'Mr ' + lastName
              }
            ),

            when(/(?<left>\d+) \+ (?<right>\d+)/)(
              ({ groups: { left, right } }) => {
                return add(left, right)
              }
            ),

            when(/world/)('that was standard'),

            otherwise('Unknown field in CSV')
          )
        )
      }
    }
  ]
]

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
