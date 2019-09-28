import React, { Component } from 'react';

let currentSong = 0;

export default class AudioPlayer extends Component {
    constructor() {
        super();
        this.myAudio = React.createRef();
        this.state = {
            title: [],
            artist: [],
            cover: [],
            tracks: [],
            duration: [],
            pos: 0,
            currentTime: 0,
            playing: false
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127');
        const data = await response.json();
        console.log(data);

        for (let i = 0; i < data.tracks.data.length; i++) {
            this.setState({
                title: [...this.state.title, data.tracks.data[i].title],
                artist: [...this.state.artist, data.artist.name],
                cover: [...this.state.cover, data.artist.picture_big],
                tracks: [...this.state.tracks, data.tracks.data[i].preview],
                duration: [...this.state.duration, data.tracks.data[i].duration]
            }, () => {
                console.log(this.state.title);
                console.log(this.state.artist);
                console.log(this.state.tracks);
                console.log(this.state.duration);
            })
        }
    }

    playAudio = () => {
        const node = this.myAudio.current;
        console.log(node);
        node.play();

        this.setState({
            playing: true
        })

        node.addEventListener("timeupdate", () => {
            this.setState({
                pos: (node.currentTime / node.duration) * 100,
                currentTime: node.currentTime,
            });
        });
    }

    pauseAudio = () => {
        const node = this.myAudio.current;
        node.pause();

        this.setState({
            playing: false
        })
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-3">
                    <audio controls ref={this.myAudio}>
                        <source src={`https://cdns-preview-e.dzcdn.net/stream/c-e77d23e0c8ed7567a507a6d1b6a9ca1b-7.mp3`} />
                    </audio>
                    <div className="card has-text-centered audio_player">
                        <div className="card-image">
                            <figure className="image is-2by2">
                                <img src={`${this.state.cover[currentSong]}`} alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="progress_bar_wrapper">
                                <div className="progress_bar" style={{ width: this.state.pos + '%', height: 5 }} />
                            </div>
                            <small className="has-text-grey is-pulled-left">{(this.state.currentTime / 100).toFixed(2)}</small>
                            <small className="has-text-grey is-pulled-right">{parseFloat(this.state.duration[currentSong] / 1000).toFixed(2)}</small>
                            <h1 className="title">{this.state.title[currentSong]}</h1>
                            <h2 className="subtitle has-text-grey">{this.state.artist[currentSong]}</h2>
                            <ul>
                                <li><button className="button is-rounded prev"><i className="fas fa-step-backward has-text-primary"></i></button></li>
                                <li>
                                    <button
                                        className="button play is-large is-rounded is-primary"
                                        onClick={this.state.playing ? (this.pauseAudio) : (this.playAudio)}>
                                        <i className={`fas ${this.state.playing ? 'fa-pause' : 'fa-play'} has-text-white`} />
                                    </button>
                                </li>
                                <li><button className="button is-rounded next"><i className="fas fa-step-forward has-text-primary"></i></button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}