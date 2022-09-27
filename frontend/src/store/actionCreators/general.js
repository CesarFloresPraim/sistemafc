import * as actionTypes from "../action-types";

export const ShowMobileMenu = () => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_MOBILE_MENU, payload: true });
};

export const HideMobileMenu = () => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_MOBILE_MENU, payload: false });
};

export const setMobileOverlayOpened = (val) => (dispatch) => {
  dispatch({ type: actionTypes.IS_MOBILE_OVERLAY_OPENED, payload: val});
};
