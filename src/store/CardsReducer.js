import {
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  SELECT_CARD,
  DESELECT_CARD,
  SHOW_COMMENTS,
  HIDE_COMMENTS,
  TABLE_CURRENT_DATE,
  ADDING_CARD,
  GET_CARDS_PENDING,
  GET_CARDS_FULFILLED,
  GET_CARDS_REJECTED,
  GO_TABLE_NEXT,
  GO_TABLE_PREV
} from "./ActionTypes";

import { courses } from "./../res/colors";

function getCommentsOfDay(day) {
  const comms = [];
  for (let i = 0; i < 12; i++) {
    comms.push({
      key: Math.random() * 10000,
      date: new Date(),
      text: `this is comment of this is comment of this is comment of this is comment of this is comment of ${i}`,
      owner: "Alex"
    });
  }
  return comms;
}

function mapCourseToColor(course) {
  const result = courses.find(item => item.identifier === course);
  if (result) return result.color;
  else return "#000000";
}

const initialState = {
  cards: [],
  selectedCard: null,
  visibleComments: null,
  currDate: new Date(2019, 10, 12),
  addingCard: false,
  errorMessage: "",
  cardsLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [
          ...state.cards,
          {
            key: Math.random(),
            type: action.cardType,
            course: action.cardCourse,
            color: mapCourseToColor(action.cardCourse),
            duration: action.cardDuration,
            date: action.cardDate,
            startTime: action.cardStartTime
          }
        ]
      };
    case EDIT_CARD:
      const newCards = state.cards.map(card => {
        if (card.key === action.cardKey)
          return {
            type: action.cardType ? action.cardType : card.type,
            course: action.cardCourse ? action.cardCourse : card.course,
            color: mapCourseToColor(
              action.cardCourse ? action.cardCourse : card.course
            ),
            duration: action.cardDuration ? action.cardDuration : card.duration,
            date: action.cardDate ? action.cardDate : card.date,
            startTime: action.cardStartTime
              ? action.cardStartTime
              : card.startTime
          };
        else return card;
      });
      return {
        ...state,
        cards: newCards
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => {
          return card.key !== state.selectedCard.key;
        }),
        selectedCard: null
      };
    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.cardItem
      };
    case DESELECT_CARD:
      return {
        ...state,
        selectedCard: null
      };
    case SHOW_COMMENTS:
      return {
        ...state,
        visibleComments: getCommentsOfDay(new Date())
      };
    case HIDE_COMMENTS:
      return {
        ...state,
        visibleComments: null
      };
    case TABLE_CURRENT_DATE:
      return {
        ...state,
        currDate: action.currDate
      };
    case ADDING_CARD:
      return {
        ...state,
        addingCard: action.payload
      };
    case GET_CARDS_PENDING:
      return {
        ...state,
        cardsLoading: action.cardsLoading
      };
    case GET_CARDS_FULFILLED:
      return {
        ...state,
        cardsLoading: action.cardsLoading,
        cards: action.payload
      };
    case GET_CARDS_REJECTED:
      return {
        ...state,
        cardsLoading: action.cardsLoading,
        errorMessage: action.error
      };
    case GO_TABLE_NEXT:
      const tmpDateNext = state.currDate;
      tmpDateNext.setDate(tmpDateNext.getDate() + 3);
      return {
        ...state,
        currDate: tmpDateNext
      };
    case GO_TABLE_PREV:
      const tmpDatePrev = state.currDate;
      tmpDatePrev.setDate(tmpDatePrev.getDate() - 3);
      return {
        ...state,
        currDate: tmpDatePrev
      };
    default:
      return state;
  }
};

export default reducer;
