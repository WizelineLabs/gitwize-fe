import React, {useEffect, useRef, useState, useContext} from 'react'
import { useOktaAuth } from '@okta/okta-react'
import PageTitle from '../components/PageTitle'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Chart from '../components/Chart'
import { ApiClient } from '../apis'
import MainLayoutContex from '../contexts/MainLayoutContext'
import {getStartOfMonth, getCurrentDate, getEndOfMonth, getNumberOfMonthBackward} from '../utils/dateUtils'
import {buildChartOptionsBasedOnMaxValue} from '../utils/chartUtils'
import {transformChartDataWithValueAbove} from '../utils/dataUtils'
import 'chartjs-plugin-datalabels';

const apiClient = new ApiClient()

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'space-between',
    marginBottom: '1vw',
    marginTop: 60
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    flexGrow: 0.3,
    fontWeight: 'bold',
    borderRadius: '8px',
    fontSize: '13px'
  },
  textStyle: {
    float: 'left',
    fontSize: '18px',
    fontWeight: '700',
    backgroundColor: 'transparent'
  }
}))

const chartBars = [
                    {name:'Average PR size', color: '#62C8BA', fieldName: 'averagePRSize', chartId: 'chartLegendId-1'},
                    {name:'Average PR review time', color: '#EC5D5C', fieldName: 'averagePRTime', chartId: 'chartLegendId-2'},
                    {name:'Rejected PRs', color: '#9F55E2',fieldName: 'percentageRejectedPR', chartId: 'chartLegendId-3'}, 
                  ]
const chartLines = []
const information = "This section will show the trends related to code changes over the last 3 months"

const calculatedateRange = () => {
  const currentDate = getCurrentDate()
  const twoMonthsBackward = getNumberOfMonthBackward(currentDate, 2)
  const endOfMothCurrentDate = getEndOfMonth(currentDate)
  const startOfMonthFrom = getStartOfMonth(twoMonthsBackward)
  return {
    date_from: new Date(startOfMonthFrom.unix()*1000),
    date_to: new Date(endOfMothCurrentDate.unix()*1000)
  }
}

function QuartelyTrends(props) {
  const [responseData, setResponseData] = useState({})
  const { authState } = useOktaAuth()
  const mainLayout = useRef(useContext(MainLayoutContex))
  const { id } = props.match.params
  const classes = useStyles();

  useEffect(() => {
    apiClient.setAccessToken(authState.accessToken)
    mainLayout.current.handleChangeRepositoryId(id)
    const dateRange  = calculatedateRange()
    apiClient.quarterlyTrends.getQuarterlyTrendsStats(id, dateRange).then((data) => {
      setResponseData(data)
    })
  }, [id, authState.accessToken])

  return (
    <div style={{ width: '100%' }}>
      <PageTitle information={information}>Quartely Trends</PageTitle>
      <Grid container className={classes.root}>
        <Grid className={classes.gridItem} style={{justifyContent: 'flex-end'}} item xs={12}>
            <Grid container className={classes.root}>
              {chartBars.map(chartItem => {
                return (<Grid key={chartItem.chartId} className={classes.gridItem} item xs={4}>
                          <Chart data={transformChartDataWithValueAbove(responseData[chartItem.fieldName], chartItem)} chartOptions={buildChartOptionsBasedOnMaxValue(responseData[chartItem.fieldName])} chartBars={chartBars} chartLines={chartLines} chartLegendId={chartItem.chartId}/>
                        </Grid>)
              })}
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default QuartelyTrends
