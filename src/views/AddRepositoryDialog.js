import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

import { getRepositoryNameFromGitHubUrl } from '../utils/apiUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '28px',
    lineHeight: '42px',
    letterSpacing: '0.01em',
    color: '#192a3e',
  },
  content: {
    '& [class*="MuiFormLabel-asterisk"]': {
      color: 'red'
    }
  },
  message: {
    paddingLeft: '24px',
    paddingBottom: '35px',
    color: '#6A707E' ,
    fontSize: '12px',
    lineHeight: '18px'
  },
  errorMessage: {
    paddingLeft: '24px',
    color: 'red'
  },
  button: {
    backgroundColor: '#000000 !important',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.24)',
    borderRadius: '4px',

    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '19px',
    textAlign: 'center',
    letterSpacing: '0.01em',
    color: '#ffffff !important',
    margin: '30px !important',
  },
}))

function AddRepositoryDialog(props) {
  const { isOpen, handleClose, handleAdd, addingRepoError } = props
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') 
  const [url, setUrl] = useState('')
  const styles = useStyles()

  const reset = () => {
    setUserName('')
    setPassword('')
    setUrl('')
    setErrorMessage('') 
  }

  useEffect(() => {
    if(addingRepoError === "Not be able to parse repository url")
      setErrorMessage("Invalid Repo URL")

    if(addingRepoError.includes("Bad credentials"))
      setErrorMessage("Incorrect Credentials Entered")
      
    if(addingRepoError.includes("Not Found"))
      setErrorMessage("Repository Not Found")
      
    if(addingRepoError.includes("'Url' failed on the 'required' tag"))
      setErrorMessage("Empty Repo URL Not Allowed")
  
  })

  const handleSubmit = () => {
    // get data
    const data = { userName, password, url }
    const name = getRepositoryNameFromGitHubUrl(url)
    handleAdd({ ...data, name})
  }

  const handleCancel = () => {
    handleClose()
    reset()
  }

  return (
    <div className={styles.root}>
      <Dialog open={isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={styles.header}>
          Add Repository
        </DialogTitle>
        <div className={styles.message}>
          Please enter your GitHub credentials
        </div>
        <DialogContent className={styles.content}>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            label="Access Token"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="projectUrl"
            label="Project repo URL"
            type="text"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
        <DialogActions>
          <Button className={styles.button} onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button className={styles.button} onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddRepositoryDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
}

export default AddRepositoryDialog
