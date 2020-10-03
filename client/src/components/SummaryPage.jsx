import React from "react";
import BackButton from "./common/BackButton";
import ScoresRank from "./ScoresRank";
import { HOMEPAGE } from './roomConst';
import ExitRoomButton from './common/ExitRoomButton';

const SummaryPage = (props) => {
  return (
    <div className="d-flex flex-column">
      <div style={{ marginTop: "1.4rem" }}>
        <ExitRoomButton
          onCancel={props.exitRoomButtonPress}
        />
      </div>
      <h1 className="align-self-center fnt-bold" style={{ marginBottom: "3rem" }}>Final Ranking</h1>
      <ScoresRank
        scoreRanking={props.scoreRanking}
      //scoreRanking={[{ name: "Xin", totalScore: 2 }, { name: "Xin", totalScore: 2 }, { name: "Xin", totalScore: 2 }, { name: "Xin", totalScore: 2 }, { name: "Xin", totalScore: 2 }, { name: "Xin", totalScore: 2 }, { name: "Xin", totalScore: 2 }]}
      ></ScoresRank>

    </div>
  );
}

export default SummaryPage;