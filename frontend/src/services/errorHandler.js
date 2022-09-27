export const parseError = (error) => {
    if (error.name === "AbortError" || error.name === "CanceledError") {
      return undefined;
    } else if (error.code === "ERR_NETWORK") {
      console.error(error);
      return "Sorry, we are unable to connect to the Breeze server due to an issue with the network connection.";
    }
  
    console.error(error);
    let errorMessage = "";
  
    var hasResponse = error && error.response;
    if (hasResponse) {
      var msg = error.response.data?.errorMessage;
      var errorDetails = error.response.data?.errorDetails;
      if (msg) {
        if (errorDetails) {
          errorMessage = `${msg}\n${errorDetails}`;
        } else {
          errorMessage = msg;
        }
      } else if (error.response.status === 429) {
        return "Sorry, you are trying to perform the same action too often. Please wait some time and then try again.";
      } else if (error.response.status === 403) {
        return "Sorry, you do not have enough permissions to perform this action.";
      }
    } else if (error.request) {
      errorMessage =
        "Sorry, we are unable to connect to the Breeze server due to an issue with the network connection.";
    }
  
    if (errorMessage.length === 0) {
      errorMessage =
        "Sorry, an unexpected error has occurred. Please try again or contact developers team if the issue still persist.";
    }
  
    return errorMessage;
  };
  