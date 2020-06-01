import { ApiHttpClient } from './base'
import ReposApiClient from './repos'
import StatsApiClient from './stats'
import ContributorStats from './contributorStats'

const { REACT_APP_API_URL } = process.env

export class ApiClient {
  constructor() {
    this.httpClient = new ApiHttpClient({
      baseURL: REACT_APP_API_URL,
    })
    this.repos = new ReposApiClient(this.httpClient)
    this.stats = new StatsApiClient(this.httpClient)
    this.contributor = new ContributorStats(this.httpClient)
  }

  setAccessToken(accessToken) {
    this.httpClient.setAccessToken(accessToken)
  }
}
