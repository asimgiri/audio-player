import React, { Component } from 'react';

let currentSong = 0;

export default class Audio extends Component {
    constructor() {
        super();
        this.myAudio = React.createRef();
        this.state = {
            title: [],
            tracks: [],
            playing: false
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127');
        const data = await response.json();
        // console.log(data);
        // console.log(data.tracks.data[0].preview);

        for (let i = 0; i < data.tracks.data.length; i++) {
            console.log(data.tracks.data[i].preview);

            //push audio datas url, titles into our state arrays

            this.setState({
                title: [...this.state.title, data.tracks.data[i].title],
                tracks: [...this.state.tracks, data.tracks.data[i].preview]
            }, () => {
                // console.log(this.state.title);
                // console.log(this.state.tracks);
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

    }

    pauseAudio = () => {
        const node = this.myAudio.current;
        console.log(node);
        node.pause();

        this.setState({
            playing: false
        })

    }

    render() {
        return (
            <div className="audioplayer">
                <audio controls ref={this.myAudio}>
                    <source src={this.state.tracks[currentSong]}/>
                </audio>

                <button onClick={this.state.playing ? (this.pauseAudio) : (this.playAudio)}>{this.state.playing ? 'Pause' : 'Play'}</button>

            </div>
        )
    }
}