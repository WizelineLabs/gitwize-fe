import { ApiHttpClient } from './base'
import ReposApiClient from './ReposApiClient'
import StatsApiClient from './StatsApiClient'
import ContributorStatsApiClient from './ContributorStatsApiClient'
import CodeChangeVelocityStatsApiClient from './CodeChangeVelocityStatsApiClient'
import QuarterlyTrendsStatsApiClient from './QuarterlyTrendsStatsApiClient'
import WeeklyImpactApiClient from './WeeklyImpactApiClient'
import PullRequestSizeApiClient from './PullRequestSizeApiClient'
import CodeQualityStatsApiClient from './CodeQualityStatsApiClient'

const { REACT_APP_API_URL } = process.env

export class ApiClient {
  constructor() {
    this.httpClient = new ApiHttpClient({
      baseURL: REACT_APP_API_URL,
    })
    this.repos = new ReposApiClient(this.httpClient)
    this.stats = new StatsApiClient(this.httpClient)
    this.contributor = new ContributorStatsApiClient(this.httpClient)
    this.codeChangeVelocity = new CodeChangeVelocityStatsApiClient(this.httpClient)
    this.quarterlyTrends = new QuarterlyTrendsStatsApiClient(this.httpClient)
    this.weeklyImpact = new WeeklyImpactApiClient(this.httpClient)
    this.pullRequestSize = new PullRequestSizeApiClient(this.httpClient)
    this.codeQuality = new CodeQualityStatsApiClient(this.httpClient)
  }

  setAuthService(authServie) {
    this.httpClient.setAuthService(authServie)
  }
}
