import React, {useEffect, useState} from 'react'
import { ListItemText, Button } from '@material-ui/core'
import useToggle from '../hooks/useToggle';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItem from '@material-ui/core/ListItem'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse';
import {NavLink} from 'react-router-dom'
import List from '@material-ui/core/List'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '100%'
	},
	notPaddingTopBottomRight: {
		paddingTop: 0,
		paddingBottom: 0,
		paddingRight: 0
	},
	listPadding: {
		paddingTop: '0.2vh',
		paddingBottom: '0.2vh',
	},
	button: {
		padding: 0,
		minWidth: 0,
	},
	chosenButton: {
		fontWeight: 'bold',
		color: '#3D3D3D !important'
	},
	buttonText: {
		width: '100%',
		fontStyle: 'normal',
		fontWeight: 500,
		fontSize: '1.5vh',
		lineHeight: '21px',
		color: '#C5C5C5',
	},
	navText: {
		fontStyle: 'normal',
		lineHeight: '21px',
		color: '#C5C5C5'
	},
	buttonSubMenutext: {
		fontSize: '1.4vh',
	},
	textTruncated: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontWeight: 600,
		textAlign: 'start'
	},
	chosenParent: {
		color: '#EC5D5C',
		fontWeight: 'bold',
		borderLeft: '6px solid',
		borderRadius: 0,
		paddingLeft: 10
	},
	chosenWithoutParent: {
		fontWeight: 'bold',
		color: '#EC5D5C !important',
	}
}))

export function SubMenuItemNode (props) {
	const {renderNav, children, name, baseURI} = props
	const [isDisplay, toggleDisplay] = useToggle(true)
	const [isParentChosen, setParentChosen] = useState(false)
	const classes = useStyles()
	const handleToggleDisplay = () => {
		toggleDisplay()
	}

	const currentURI = window.location.href

	useEffect(()=> {
		const parentURI = []
		let parentChosenValue = false
		children.forEach(item => parentURI.push(baseURI+item.uri))
		
		parentURI.forEach(item => {
			if(currentURI.includes(item)) {
				parentChosenValue = true
			}
		})
		setParentChosen(parentChosenValue)
	}, [children, baseURI, currentURI])

	return (<List className={classes.listPadding}>
            <ListItem className={clsx(classes.root, classes.notPaddingTopBottomRight)}>
              <Button className={clsx(classes.buttonText, (isParentChosen) && classes.chosenParent)} onClick={() => handleToggleDisplay()}>
                <ListItemText classes={{primary: classes.textTruncated}} primary={name}/>
                {isDisplay ? <ExpandLess /> : <ExpandMore />}
              </Button>
              <Collapse style={{width: '100%'}} in={isDisplay}>
                {renderNav(children, baseURI)}
              </Collapse>
            </ListItem>
          </List>)
}

export function SubMenuItemLeaf(props) {
	const classes = useStyles()
	const {repoId, uri, name, handleLink, baseURI} = props
	const [isChangeClass, setChangeClass] = useState(false)
	let parentURI = ''

	if(baseURI) {
		parentURI = baseURI
	}
	
	const currentURI = window.location.href

	useEffect(()=> {
		setChangeClass(!baseURI && currentURI.includes(uri))
	}, [baseURI, currentURI, uri])

	return (<List className={classes.listPadding}>
            <ListItem className={classes.notPaddingTopBottomRight} key={name}>
              <Button className={clsx(!baseURI && classes.buttonText, baseURI && classes.buttonSubMenutext, (isChangeClass) && classes.chosenParent)}>
                <NavLink className={clsx(classes.navText, (isChangeClass) && classes.chosenWithoutParent)} activeClassName={classes.chosenButton} key={name} to={`/repository/${repoId}${parentURI}${uri}`} style={{ width: '100%' }} onClick={handleLink}>
                  <ListItemText classes={{primary: classes.textTruncated}} primary={name}/>
                </NavLink>
              </Button>
            </ListItem>
          </List>)
}