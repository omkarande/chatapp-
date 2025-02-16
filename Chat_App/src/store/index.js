// import { create } from "zustand";
// import { createAuthSlice } from "./slices/auth-slice.js";

// export const useAppStore = create((set, get) => ({
//   ...createAuthSlice(set, get),
// }));
import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
