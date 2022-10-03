import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    icon: {
        justifyContent: 'space-around',
    },
    facebookIcon: {
        color: '#4267B2',
    },
    twitterIcon: {
        color: '#1DA1F2',
    },
    linkedInIcon: {
        color: '0077B5',
    },
    blackIcon: {
        color: '#212121',
    },
}));

export default function SocialIcons(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActions className={classes.icon} disableSpacing>
                <IconButton color="primary" aria-label="share" data-testId="FacebookIcon">
                    <FacebookIcon className={classes.facebookIcon} />
                </IconButton>
                <IconButton color="primary" aria-label="share" data-testId="LinkedInIcon">
                    <LinkedInIcon className={classes.linkedInIcon} />
                </IconButton>
                <IconButton aria-label="share" data-testId="GithubIcon">
                    <GitHubIcon className={classes.blackIcon} />
                </IconButton>
                <IconButton color="primary" aria-label="add to favorites" data-testId="TwitterIcon">
                    <TwitterIcon className={classes.twitterIcon} />
                </IconButton>
                <IconButton aria-label="share" data-testId="LinkIcon">
                    <LinkIcon className={classes.blackIcon} />
                </IconButton>
            </CardActions>
        </Card>
    );
}
