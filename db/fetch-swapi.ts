import axios from 'axios'

export class FetchSwapi {
  static async fetchClass(className: string) {
    let url = `https://swapi.dev/api/${className === 'peoples' ? 'people' : className}/`
    let result = []
    try {
      do {
        let response = await axios.get(url)
        result.push(...response.data.results)
        url = response.data.next
      } while (url)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
