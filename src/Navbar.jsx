import React, { useState } from 'react'
import {
    AppBar, Toolbar, Typography, IconButton, Hidden, Drawer, Divider, List, ListItem,
    ListItemText, ListItemIcon, Box, Collapse
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    menuBtn: { marginLeft: 'auto' },
    drawerPaper: { width: '200px' },
    chevron: { toolbar: theme.mixins.toolbar, display: 'flex', alignItems: 'center' },
    list: { [theme.breakpoints.up('sm')]: { display: 'flex', marginLeft: 'auto'} },
    listItemIcon: { color: theme.palette.primary.main},
    nested: { [theme.breakpoints.down('xs')]: { paddingLeft: theme.spacing(4) } },
    nestedList: { [theme.breakpoints.up('sm')]: { position: "absolute", top: 60, left: 200, background: theme.palette.primary.main } }
}))

export const Navbar = () => {
    const classes = useStyles()
    const [showDrawer, setShowDrawer] = useState(false)
    const [expand, setExpand] = useState(false)

    var touch=window.matchMedia("(pointer: coarse)").matches

    const handleNestedClick = () => touch && setExpand(!expand)
    const handleNestedEnter = () => !touch && setExpand(true)
    const handleNestedLeave = () => !touch && setExpand(false)

    const navItems =
        [{ icon: <DashboardIcon />, text: 'Dashboard' },
        { icon: <AccountCircleIcon />, text: 'Profile' },
        { icon: <CategoryIcon />, text: 'Category' },
        { icon: <ExitToAppIcon />, text: 'Logout' }]

    const list =
        <List className={classes.list}>
            {navItems.map((i, k) =>
                i.text !== 'Category'
                    ? <ListItem key={k} button divider={touch && true}>
                        <Hidden smUp>
                            <ListItemIcon className={classes.listItemIcon}>
                                {i.icon}
                            </ListItemIcon>
                        </Hidden>
                        <ListItemText primary={i.text} />
                    </ListItem>
                    :
                    <React.Fragment key={k}>
                        <ListItem button onClick={handleNestedClick} onMouseOver={handleNestedEnter} onMouseLeave={handleNestedLeave} divider={touch && true}>
                            <Hidden smUp>
                                <ListItemIcon className={classes.listItemIcon}>
                                    {i.icon}
                                </ListItemIcon>
                            </Hidden>
                            <ListItemText primary={i.text} />
                            {expand ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={expand} timeout="auto" unmountOnExit>
                            <List component='div' disablePadding className={classes.nestedList} onMouseEnter={handleNestedEnter} onMouseLeave={handleNestedLeave}>
                                <ListItem button className={classes.nested}>
                                    <Hidden smUp>
                                        <ListItemIcon><EmojiPeopleIcon className={classes.listItemIcon} /></ListItemIcon>
                                    </Hidden>
                                    <ListItemText primary='Men' />
                                </ListItem>
                                <ListItem button className={classes.nested} divider={touch && true}>
                                    <Hidden smUp>
                                        <ListItemIcon><PregnantWomanIcon className={classes.listItemIcon} /></ListItemIcon>
                                    </Hidden>
                                    <ListItemText primary='Women' />
                                </ListItem>
                            </List>
                        </Collapse>
                    </React.Fragment>
            )}
        </List>

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h4" color='inherit'>YourApp</Typography>
                    <Hidden xsDown>{list}</Hidden>
                    <Hidden smUp>
                        <IconButton color='inherit' onClick={() => setShowDrawer(true)} className={classes.menuBtn} >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>

            <Drawer open={showDrawer} variant='temporary' anchor='right'
                classes={{ paper: classes.drawerPaper }} onClose={() => setShowDrawer(false)}>
                <Box component='div' className={classes.chevron}>
                    <IconButton onClick={() => setShowDrawer(false)}>
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
                <Divider/>
                {list}
            </Drawer>


        </>
    )
}
