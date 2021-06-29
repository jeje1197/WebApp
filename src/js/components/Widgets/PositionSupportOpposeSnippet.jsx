import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cordovaDot } from '../../utils/cordovaUtils';
import { renderLog } from '../../utils/logging';
import { startsWith, vimeoRegX, youTubeRegX } from '../../utils/textFormat';
import ExternalLinkIcon from './ExternalLinkIcon';

const ReadMore = React.lazy(() => import(/* webpackChunkName: 'ReadMore' */ './ReadMore'));
const ReactPlayer = React.lazy(() => import(/* webpackChunkName: 'ReactPlayer' */ 'react-player'));
const OpenExternalWebSite = React.lazy(() => import(/* webpackChunkName: 'OpenExternalWebSite' */ './OpenExternalWebSite'));
const thumbsUpColorIcon = '../../../img/global/svg-icons/thumbs-up-color-icon.svg';
const thumbsDownColorIcon = '../../../img/global/svg-icons/thumbs-down-color-icon.svg';

export default class PositionSupportOpposeSnippet extends Component {
  render () {
    renderLog('PositionSupportOpposeSnippet');  // Set LOG_RENDER_EVENTS to log all renders
    let stanceIconSrc;
    let className;
    let alt;
    let actorSupportsBallotItemLabel;
    let ballotItemIsSupportedByActorLabel;
    const { isLookingAtSelf, statementText, isSupport, isOppose, isOnBallotItemPage,
      ballotItemDisplayName, speakerDisplayName } = this.props;
    let { moreInfoUrl } = this.props;
    let statementTextHtml = (
      <ReadMore
        numberOfLines={5}
        textToDisplay={statementText || ''}
      />
    );

    let videoUrl = '';
    let youTubeUrl;
    let vimeoUrl;
    let statementTextNoUrl;

    if (statementText) {
      youTubeUrl = statementText.match(youTubeRegX);
      vimeoUrl = statementText.match(vimeoRegX);
    }

    if (youTubeUrl) {
      [videoUrl] = youTubeUrl;
      statementTextNoUrl = statementText.replace(videoUrl, '');
      statementTextHtml = <ReadMore textToDisplay={statementTextNoUrl} />;
    }

    if (vimeoUrl) {
      [videoUrl] = vimeoUrl;
      statementTextNoUrl = statementText.replace(videoUrl, '');
      statementTextHtml = <ReadMore textToDisplay={statementTextNoUrl} />;
    }

    if (isSupport) {
      stanceIconSrc = cordovaDot(thumbsUpColorIcon);
      className = 'explicit-position__icon';
      alt = 'Supports';
      actorSupportsBallotItemLabel = isLookingAtSelf ? 'You Support' : 'Supports'; // Actor supports Ballot item (Active voice)
      ballotItemIsSupportedByActorLabel = isLookingAtSelf ? 'is Supported by You' : 'is Supported by'; // Ballot item is supported by Actor (Passive voice)
    } else if (isOppose) {
      stanceIconSrc = cordovaDot(thumbsDownColorIcon);
      className = 'explicit-position__icon';
      alt = 'Opposes';
      actorSupportsBallotItemLabel = isLookingAtSelf ? 'You Oppose' : 'Opposes';
      ballotItemIsSupportedByActorLabel = isLookingAtSelf ? 'is Opposed by You' : 'is Opposed by';
    } else {
      // We shouldn't be here. Do not display position information. See instead PositionInformationOnlySnippet.jsx
      return <span />;
    }

    let stanceDisplayOff = false;
    if (this.props.stanceDisplayOff !== undefined) {
      stanceDisplayOff = !!this.props.stanceDisplayOff;
    }

    let commentTextOff = false;
    if (this.props.commentTextOff !== undefined) {
      commentTextOff = !!this.props.commentTextOff;
    }

    if (moreInfoUrl) {
      if (!startsWith('http', moreInfoUrl.toLowerCase())) {
        moreInfoUrl = `http://${moreInfoUrl}`;
      }
    }

    return (
      <div className="explicit-position">
        { stanceDisplayOff ?
          null : (
            <div className="explicit-position__text">
              <span className="explicit-position__voter-guide-increase">
                <img src={stanceIconSrc} width="24" height="24" className={className} alt={alt} />
                {isOnBallotItemPage ? (
                  <span>
                    <span className="explicit-position__position-label">{actorSupportsBallotItemLabel}</span>
                    <span>
                      {' '}
                      {ballotItemDisplayName}
                      {' '}
                    </span>
                  </span>
                ) : (
                  <span>
                    <span className="explicit-position__position-label">{ballotItemIsSupportedByActorLabel}</span>
                    <span>
                      {' '}
                      {speakerDisplayName}
                      {' '}
                    </span>
                  </span>
                )}
                <br />
              </span>
              { commentTextOff ? null : (
                <span>
                  <span className="u-wrap-links d-print-none">{statementTextHtml}</span>
                  {/* if there's an external source for the explicit position/endorsement, show it */}
                  { videoUrl ?
                    <ReactPlayer className="explicit-position__media-player" url={`${videoUrl}`} width="100%" height="100%" /> :
                    null }
                  {moreInfoUrl ? (
                    <div className="d-none d-sm-block">
                      {/* default: open in new tab */}
                      <OpenExternalWebSite
                        linkIdAttribute="moreInfo"
                        url={moreInfoUrl}
                        target="_blank"
                        className="u-gray-mid"
                        body={(
                          <span>
                            view source
                            {' '}
                            <ExternalLinkIcon />
                          </span>
                        )}
                      />
                    </div>
                  ) : null}
                </span>
              )}
            </div>
          )}
      </div>
    );
  }
}
PositionSupportOpposeSnippet.propTypes = {
  ballotItemDisplayName: PropTypes.string,
  commentTextOff: PropTypes.bool,
  isLookingAtSelf: PropTypes.bool,
  isOnBallotItemPage: PropTypes.bool,
  isOppose: PropTypes.bool.isRequired,
  isSupport: PropTypes.bool.isRequired,
  moreInfoUrl: PropTypes.string,
  speakerDisplayName: PropTypes.string,
  stanceDisplayOff: PropTypes.bool,
  statementText: PropTypes.string,
};
