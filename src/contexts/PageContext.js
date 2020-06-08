import React, { useReducer } from 'react'

const today = new Date()
const last7Days = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))

const defaultValue = {
  handleChangeRepositoryId: (repositoryId) => {},
  handleDisplaySubMenu: (isDisplayDashBoard) => {},
  handleChangeRepositoryName: (repositoryName) => {}
}
const PageContext = React.createContext(defaultValue)

const initialState = {
  dateRange: {
    date_from: last7Days,
    date_to: today
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeDate':
      return {
        ...state,
        dateRange: action.newDate
      };
      
    default:
      return state;
  }
};

export const PageProvider = ({children}) =>(
  <PageContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </PageContext.Provider>
);


export const PageConsumer = PageContext.Consumer

export default PageContext
