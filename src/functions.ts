/**
 * 
 * @param num ваше число
 * @param wordArr [0] вернется, если num === 1. [1] если 2 <= num <= 4. [2] если num === 0 или 11 <= num <= 19 или 5 <= num <= 9.
 */
export const getWordsEnding = (num: number, wordArr:string[]):string => {
  const decNum = num % 100
  const digit = num % 10

  if (decNum >= 11 && decNum <= 19) return wordArr[2]

  if (digit === 1) return wordArr[0]
  if (digit >= 2 && digit <= 4) return wordArr[1]
  if (digit >= 5 && digit <= 9 || digit === 0) return wordArr[2]

  return 'Ошибка'
}