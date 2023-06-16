import { expect } from 'chai'
import { describe } from 'mocha'
import FilesController from '../src/routes/files/files.controller.mjs'
import { parseFile } from '../src/routes/files/files.utils.mjs'

const emptyFile = 'file,text,number,hex'
const goodFile = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5
file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3e29651a63a5202a5661e05a060401fb
file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252`
const badFile = `file,text,number,hex
test15.csv,LTYM
test15.csv,iekIhypdhOXwTwwBwech,,
test15.csv,HOOWgQfrZPLYHmRhC,,
test15.csv,sovPnRJgKLSTGaQxjenPezbr,,
test15.csv,cVrWtqlqFuqybrRsNtfUCZzCbD,,
test15.csv,IKuhHQnnouqEzkUArQDuYRkYucx,,
test15.csv,PNKUZGdVHXEeQJUCcmaBnwDvs,,
test15.csv,lnnSdCOApUNnEAuHCFQfodEZk,,
test15.csv,pCRwQmJiFzdlZoBuByTKMTShYJGYt,,,,`
const somewhatGoodFile = `file,text,number,hex
test2.csv,reiQM
test2.csv,okUE,863,89e6b6aa2813295673e1d3c6990574f5`

const goodFileParsed = {
  file: 'file1.csv',
  lines: [
    {
      text: 'RgTya',
      number: 64075909,
      hex: '70ad29aacf0b690b0467fe2b2767f765'
    },
    { text: 'AtjW', number: 6, hex: 'd33a8ca5d36d3106219f66f939774cf5' },
    {
      text: 'PNzRfORtKtEDOzmIVrQuSh',
      number: 74088708,
      hex: '3e29651a63a5202a5661e05a060401fb'
    },
    { text: 'd', number: 6173, hex: 'f9e1bcdb9e3784acc448af34f4727252' }
  ]
}

const somewahtGoodFileParsed = {
  file: 'test2.csv',
  lines: [
    { text: 'okUE', number: 863, hex: '89e6b6aa2813295673e1d3c6990574f5' }
  ]
}

describe('#parseFile', function () {
  context('when the file is empty', function () {
    it('should return an empty array', function () {
      expect(parseFile(emptyFile)).to.deep.equal({ lines: [] })
    })
  })
  context('when the file is incorrect', function () {
    it('should return only the lines with the correct format', function () {
      expect(parseFile(badFile).lines).to.deep.equal([])
    })
  })
  context('when the file is correct', function () {
    it('should return an array of lines', function () {
      expect(parseFile(goodFile)).to.deep.equal(goodFileParsed)
    })
  })
  context('when the file is correct but has some incorrect lines', function () {
    it('should return an array of lines', function () {
      expect(parseFile(somewhatGoodFile)).to.deep.equal(somewahtGoodFileParsed)
    })
  })
})
describe('#filesController', function () {
  /** @type {FilesController} */
  let controller
  const mockService = {
    getFiles: async () => ['0', '1', '2', '3'],
    getFile: async (filename) =>
      [goodFile, badFile, emptyFile, somewhatGoodFile][filename]
  }
  beforeEach(function () {
    controller = new FilesController(mockService)
  })

  it('should return an array of files', async function () {
    const files = await controller._getParsedFiles()
    expect(files).to.deep.equal([goodFileParsed, somewahtGoodFileParsed])
  })
  it('should return one file', async function () {
    const file = await controller._getOneParsedFile('0')
    expect(file).to.deep.equal(goodFileParsed)
  })
})
