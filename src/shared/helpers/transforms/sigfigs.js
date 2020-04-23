const MAX_DIGITS = 10

export default function toSigfigs(input, target = 3) {
  const sigfigs = getSigfigs(input, target)
  return input.toFixed(sigfigs)
}

function getSigfigs(input, target = 3) {
  input = input.toFixed(MAX_DIGITS)

  const decimal = input.indexOf('.')
  if (decimal > 1 || input[0] !== '0') {
    return Math.max(0, target - decimal)
  }

  input = input.slice(decimal + 1)
  for (let i = 0; i <= MAX_DIGITS - target; i++) {
    if (input[i] !== '0') {
      return i + target
    }
  }

  return 0
}
