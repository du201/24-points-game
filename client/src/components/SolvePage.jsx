import React, { useState, useEffect } from "react";
import BackButton from "./common/BackButton";
import GameSolver from "./GameSolver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./common/Button";
import Loader from 'react-loader-spinner';
import './SolvePage.css';
import SolveModeSettingMenu from "./SolveModeSettingMenu";
import { useWindowSize } from './common/useWindowSize.js';
import run from "../game.jsx";
import $ from "jquery";

const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
let operators = [TIMES, DIVIDES, PLUS, MINUS];

const SolvePage = (props) => {

  const [bottomFadeoutDisplay, setBottomFadeoutDisplay] = useState(true);
  const [topFadeoutDisplay, setTopFadeoutDisplay] = useState(false);
  const [settingMenuOpen, setSettingMenuOpen] = useState(false);
  const [targetNum, setTargetNum] = useState(24);
  const [slotNum, setSlotNum] = useState(4);
  const [numberCollection, setNumberCollection] = useState([
    { id: 1, value: "empty" },
    { id: 2, value: "empty" },
    { id: 3, value: "empty" },
    { id: 4, value: "empty" },
    { id: 5, value: "empty" },
    { id: 6, value: "empty" },
  ]); //when the slot is not filled, its value is "empty", otherwise, it should be an int 
  const [availableOperator, setAvailableOperator] = useState(operators);
  const [showAllAnswers, setShowAllAnswers] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    $("#solution-scroll").scroll(function () {
      //document.getElementById('solution-scroll').scroll(function () {
      if ($(".solution-overflow").height() + $(".solution-overflow").scrollTop() == document.getElementById('solution-scroll').scrollHeight) {
        setBottomFadeoutDisplay(false);
      } else {
        setBottomFadeoutDisplay(true);
      }
      if ($(".solution-overflow").scrollTop() !== 0) {
        setTopFadeoutDisplay(true);
      } else {
        setTopFadeoutDisplay(false);
      }
    });
  }, []);

  useEffect(() => {
    if (screenWidth > 1200 && settingMenuOpen === true) {
      setSettingMenuOpen(false);
    }
  });

  let screenWidth = useWindowSize().width;

  const calculate = () => {
    let inputNums = [];
    let filledSlotNum = 0;
    for (let numSet of numberCollection) {
      inputNums.push(numSet.value);
      if (numSet.value !== "empty") {
        filledSlotNum++;
      }
    }
    //console.log(filledSlotNum);
    //console.log(inputNums);
    //if some slots are not filled
    if (filledSlotNum !== slotNum) {
      props.notifyError(`All the slots must be filled. You only filled ${filledSlotNum} out of ${slotNum}`);
    } else {
      setLoading(true);
      //start calculating
      let inputNums = [];
      for (let numSet of numberCollection) {
        inputNums.push(numSet.value);
      }
      //console.log(inputNums);
      //run(slotNum, );
      //after calculating
      setLoading(false);
      setModalOpen(true);
    }
  }


  const switchSettingMenu = () => {
    setSettingMenuOpen(!settingMenuOpen);
  };

  const backToDefaultSettings = () => {
    setTargetNum(24);
    setSlotNum(4);
    setNumberCollection([
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
      { id: 6, value: 0 },
    ]);
    setAvailableOperator(operators);
    setShowAllAnswers(true);
  }

  const filterArray = (arr, value) => {
    return arr.filter((ele) => {
      return ele !== value;
    });
  };


  const handleAvailableOperatorCheckbox = (event) => {
    let selectValue = event.target.value;
    switch (selectValue) {
      case TIMES:
        operatorSwitch(TIMES);
        break;
      case DIVIDES:
        operatorSwitch(DIVIDES);
        break;
      case PLUS:
        operatorSwitch(PLUS);
        break;
      case MINUS:
        operatorSwitch(MINUS);
        break;
      default:
        break;
    }
  };

  const operatorSwitch = (ops) => {
    if (availableOperator.includes(ops)) {
      //the minimum number of operators is 2
      if (availableOperator.length <= 2) {
        props.notifyError("You must have at least two available operators");
        return;
      }
      setAvailableOperator(filterArray(
        availableOperator,
        ops
      ));

    } else {
      let copy_availableOperator = [...availableOperator];
      copy_availableOperator.push(ops);
      setAvailableOperator(copy_availableOperator);
    }
  };


  const handleSlotNumChange = (event) => {
    setSlotNum(parseInt(event.target.value, 10));
  };

  const handleTargetNumChange = (event) => {
    setTargetNum(parseInt(event.target.value, 10));
  }


  const inputNumHandler = (event, index) => {
    let numberCollectionCopy = [...numberCollection];
    numberCollectionCopy[index - 1] = {
      ...numberCollection[index - 1],
    };
    const numNewValue = event.target.value;
    //if the player empties the slot
    if (numNewValue === "") {
      numberCollectionCopy[index - 1].value = "empty";
    } else {
      numberCollectionCopy[index - 1].value = parseInt(numNewValue, 10);
    }

    setNumberCollection(numberCollectionCopy);
  };

  return (
    <React.Fragment>
      <div className="container-fluid h-100">
        <div className={modalOpen === true ? "result-modal" : "d-none"}>
          <div className={bottomFadeoutDisplay === true ? "result-modal-body-with-fadeout" : "result-modal-body"}>
            <a id="delete-cross" onClick={() => setModalOpen(false)}><span className="result-modal-delete">&times;</span></a>
            <div style={{ clear: "both" }}></div>
            <h2 id={topFadeoutDisplay === true ? "solution-top-text-with-fadeout" : "solution-top-text"} className="fnt-bold" style={{ marginBottom: "-2rem", marginTop: "3rem" }}>We found 454 solutions</h2>
            <div id="solution-scroll" className="solution-overflow">
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
              <p className="solution">12+12+12+12</p>
            </div>
          </div>
        </div>

        <div className={settingMenuOpen === false ? "row h-100" : "row h-100 grey-content"}>
          {/* A fixed width column */}
          <div className="menu-sidebar-hostpage">
            <div id="menu-sidebar-top" style={{ clear: "both" }}>
              <div className="float-left">
                <BackButton
                  handleBack={props.handleBack}
                  prevPage="homePage"
                ></BackButton>
              </div>
              <div className="float-right">
                <a
                  id="menu-switch"
                  onClick={switchSettingMenu}
                >
                  {settingMenuOpen === false ?
                    <FontAwesomeIcon icon={faBars} size="2x" /> :
                    <FontAwesomeIcon icon={faTimes} size="2x" />}
                </a>
              </div>
            </div>
            <div className={settingMenuOpen === false ? "display-none" : "grey-content"}>
              <SolveModeSettingMenu
                slotNum={slotNum}
                targetNum={targetNum}
                availableOperator={availableOperator}
                showAllAnswers={showAllAnswers}
                handleTargetNumChange={handleTargetNumChange}
                handleSlotNumChange={handleSlotNumChange}
                handleAvailableOperatorCheckbox={handleAvailableOperatorCheckbox}
                handleShowAllAnswers={() => setShowAllAnswers(!showAllAnswers)}
                backToDefaultSettings={backToDefaultSettings} />
            </div>
          </div>
          <div className={settingMenuOpen === false ? "col text-center" : "display-none"}>
            <div id="solvePage-mainContent" className="d-flex flex-column align-items-center">
              <div className="d-flex flex-wrap" style={{ marginBottom: "4rem", width: "90%" }}>
                <GameSolver
                  numberCollection={numberCollection}
                  slotNum={slotNum}
                  inputNumHandler={inputNumHandler}
                />
              </div>
              <Button
                onClick={calculate}
                disabled={loading}
                style={0}
                display={loading === true ?
                  <div className="force-inline">
                    <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={20}
                      width={20}
                    />
                  </div> :
                  "Calculate"}
              />
            </div>
          </div>
        </div>
      </div >


    </React.Fragment>








  );
}

export default SolvePage;