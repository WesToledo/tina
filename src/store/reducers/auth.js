const INITIAL = {
  authenticated: false,
  user: {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // login: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    //   select: false,
    // },
    // type: {
    //   type: String,
    //   required: true,
    //   default: "Student",
    // },
  },
};

export default function auth(state = INITIAL, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        authenticated: true,
        user: {
          ...action.payload,
        },
      };

    case "LOGOUT":
      return { INITIAL };
    default:
      return state;
  }
}
