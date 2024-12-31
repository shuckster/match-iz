export function desc(index, input, expecting) {
  const [_input, _expecting] = [input, expecting].map(x => JSON.stringify(x));
  return `Case #${index + 1}: input = ${_input}, expecting = ${_expecting}`;
}
