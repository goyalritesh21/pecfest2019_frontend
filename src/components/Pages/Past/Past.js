import React, {Component} from 'react';
import '../../../styles/components/common/_Video.scss'
import YouTube from 'react-youtube';
import Controls from "../../common/Controls";
import TextBox from "../../common/TextBox";

const pecfestVideos = [
    {
        title: "PECFEST'18",
        year: '2018',
        videoId: 'SjQwQXcDgKg'
    },
    {
        title: "PECFEST'17",
        year: '2017',
        videoId: '70xeFk-Fazw'
    },
    {
        title: "PECFEST'16",
        year: '2016',
        videoId: 'kMotFEvb0xc'
    }
];

class Past extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedVideo: 0,
        }
    }

    _onReady = (event) => {
        // access to player in all event handlers via event.target
        // event.target.mute();
    };

    _onEnd = (event) => {
        this.setState((state, props) => {
            return {selectedVideo: (state.selectedVideo + 1) % pecfestVideos.length};
        });

        event.target.playVideo();
    };

    render() {
        const {selectedVideo} = this.state;

        const videoOptions = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 1,
                rel: 0,
                showinfo: 0
            }
        };

        return (
            <div>
                <Controls
                    onNext={() => {
                        this.setState((state, props) => {
                            return {selectedVideo: (state.selectedVideo + 1) % pecfestVideos.length};
                        });
                    }}
                    onPrev={() => {
                        this.setState((state, props) => {
                            return {selectedVideo: (pecfestVideos.length + state.selectedVideo - 1) % pecfestVideos.length};
                        });
                    }}/>
                <div style={{
                    marginTop: "32px",
                    zIndex: 100,
                }}>
                    <TextBox text={pecfestVideos[selectedVideo].title} large={true}/>
                </div>
                <div className="video-background">
                    <div className="video-foreground">
                        <YouTube
                            videoId={pecfestVideos[selectedVideo].videoId}
                            opts={videoOptions}
                            className="video-iframe"
                            onReady={this._onReady}
                            onEnd={this._onEnd}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Past;