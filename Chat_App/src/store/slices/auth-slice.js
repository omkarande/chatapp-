// import { produce } from "immer";

// export const createAuthSlice = (set, get) => ({
//   userInfo: null,
//   //setUserInfo: (userInfo) => set({ userInfo }),
//   setUserInfo: (userInfo) => {
//     console.log(`setUserInfo: ${userInfo}`);
//     set(
//       produce((state) => {
//         state.userInfo = userInfo;
//       })
//     );
//     console.log(`setUserInfo: ${userInfo}`);
//   },
// });

export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});
