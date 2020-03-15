export default function getSigfigs(input, sigfigs = 3) {
  input = input.toFixed(10)

  const decimal = input.indexOf('.')
  if (decimal > 1 || input[0] !== '0') {
    return Math.max(0, sigfigs - decimal)
  }

  input = input.slice(decimal + 1)
  for (let i = 0; i < 10; i++) {
    if (input[i] !== '0') {
      return i + sigfigs
    }
  }

  return 0
}
