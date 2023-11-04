import { useReducer } from "react";

// const enum Status {
//   START = "start",
//   PENDING = "pending",
//   FINISHED = "finsihed",
//   IDLE = "idle",
// }
type requestStepStatus = "start" | "pending" | "finished" | "idle";

type State = {
  isRequestInProgress: boolean;
  requestStep: requestStepStatus;
  // Status
};

type Action =
  | { type: "START_REQUEST" }
  | { type: "PENDING_REQUEST" }
  | { type: "FINISH_REQUEST" }
  | { type: "RESET_REQUEST" };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
  // Status.IDLE
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_REQUEST":
      return {
        ...state,
        isRequestInProgress: true,
        requestStep: "start",
        // Status.START;
      };

    case "PENDING_REQUEST":
      return {
        ...state,
        isRequestInProgress: true,
        requestStep: "pending",
        // Status.PENDING
      };
    case "FINISH_REQUEST":
      return {
        ...state,
        isRequestInProgress: false,
        requestStep: "finished",
        // Status.FINISHED
      };
    case "RESET_REQUEST":
      return {
        ...state,
        isRequestInProgress: false,
        requestStep: "idle",
        // Status.IDLE
      };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ type: "START_REQUEST" });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: "PENDING_REQUEST" });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: "RESET_REQUEST" });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
