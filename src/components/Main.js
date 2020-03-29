import React, {Component} from 'react';

import nba from '../nba-client.js';
import Profiles from './Profiles.js';
import DataViewContainer from "./DataViewContainer.js";
import SearchBar from "./SearchBar.js";

import { DEFAULT_PLAYER_INFO } from '../constants';
class Main extends Component {

    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }


    componentDidMount() {
        window.nba = nba;
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    loadPlayerInfo = (playerName) =>{
        nba.stats.playerInfo( { PlayerID: nba.findPlayer(playerName).playerId})
            .then((info) => {
                const playInfo =
                    Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log(playInfo);
                this.setState(({playerInfo: playInfo}));
            })
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profiles playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;