/**
 *
 * @param {string} file
 * @returns {ParsedFile}
 */
export function parseFile (file) {
  const linesAsStr = file.split('\n')
  linesAsStr.shift()
  if (linesAsStr.length === 0) {
    return { lines: [] }
  }
  let filename
  /** @type {Array<Line>} */
  const lines = linesAsStr.reduce(
    /**
     * @param {Array<Line>} acc
     * @param {string} line
     */
    (acc, line) => {
      const data = line.split(',')
      if (data.length === 4) {
        const text = data[1]
        const number = Number(data[2])
        const hex = data[3]
        if (!(text === '' || isNaN(number) || hex === '')) {
          filename = data[0]
          acc.push({
            text: data[1],
            number: Number(data[2]),
            hex: data[3]
          })
        }
      }
      return acc
    },
    []
  )

  return { file: filename, lines }
}

/**
 * @typedef {Object} Line
 * @property {string} text
 * @property {number} number
 * @property {string} hex
 */
/**
 * @typedef {Object} ParsedFile
 * @property {string} file
 * @property {Line[]} lines
 */
