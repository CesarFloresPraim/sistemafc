import * as actionTypes from "../action-types";

let initialState = {
  showMobileMenu: false,
  isMobileOverlayOpened: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_MOBILE_MENU:
      return {
        ...state,
        showMobileMenu: action.payload,
      };
    case actionTypes.IS_MOBILE_OVERLAY_OPENED:
      return {
        ...state,
        isMobileOverlayOpened: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
