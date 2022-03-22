import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import styled from '@mui/material/styles/styled';
import withStyles from '@mui/styles/withStyles';
import withTheme from '@mui/styles/withTheme';
import PropTypes from 'prop-types';
import React from 'react';
import { renderLog } from '../../common/utils/logging';


class ShowMoreButtons extends React.Component {
  render () {
    renderLog('ShowMoreButtons');  // Set LOG_RENDER_EVENTS to log all renders
    const { classes, showMoreId, showMoreButtonsLink, showMoreButtonWasClicked } = this.props;
    let showMoreText;

    if (showMoreButtonWasClicked) {
      showMoreText = 'show less';
    } else {
      showMoreText = 'show more';
    }

    return (
      <ShowMoreButtonsStyled className="card-child" id={showMoreId} onClick={showMoreButtonsLink}>
        <ShowMoreButtonsText>
          { showMoreText }
          {' '}
          {showMoreButtonWasClicked ? (
            <ArrowDropUp
              classes={{ root: classes.cardFooterIconRoot }}
            />
          ) : (
            <ArrowDropDown
              classes={{ root: classes.cardFooterIconRoot }}
            />
          )}
        </ShowMoreButtonsText>
      </ShowMoreButtonsStyled>
    );
  }
}
ShowMoreButtons.propTypes = {
  classes: PropTypes.object,
  showMoreId: PropTypes.string.isRequired,
  showMoreButtonsLink: PropTypes.func.isRequired,
  showMoreButtonWasClicked: PropTypes.bool,
};

const styles = (theme) => ({
  cardFooterIconRoot: {
    fontSize: 30,
    marginBottom: '.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
});

const ShowMoreButtonsStyled = styled('div')(({ theme }) => (`
  border: 0 !important;
  color: #999;
  cursor: pointer;
  display: block !important;
  background: #fff !important;
  font-size: 18px;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  padding: 0 !important;
  text-align: center !important;
  user-select: none;
  ${theme.breakpoints.up('md')} {
    font-size: 16px;
  }
  &:hover {
    background-color: rgba(46, 60, 93, 0.15) !important;
    transition-duration: .2s;
  }
  @media print{
    display: none;
  }
`));

const ShowMoreButtonsText = styled('div')`
  margin-top: 8px !important;
  padding: 0 !important;
  text-align: center !important;
  &:hover {
    text-decoration: underline;
  }
`;

export default withTheme(withStyles(styles)(ShowMoreButtons));



