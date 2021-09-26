import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";
import querystring from "querystring";

import { Status, Register, AuthState } from "../types";
import {
  Degree,
  Country,
  Region,
  District,
  SubDistrict,
  Village,
} from "types/schema";

// export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get<{ name?: string; email?: string; type?: string }>('api/me')

//     return response.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error.message })
//   }
// })

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ jwt: any }>(
        "api/auth/login",
        credentials
      );
      // // const refetch = await axios.get<{ name: string }>('api/me', {
      // //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // // })
      // return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      // const response = await axios.post<{ user: any }>(
      //   "api/auth/signup",
      //   credentials
      // );

      // const refetch = await axios.get<{ name: string }>("api/me", {
      //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // });
      // return {
      //   accessToken: response.data.accessToken,
      //   me: { name: refetch.data.name },
      // };

      // return response.data;
      await sleep(4000);
      return {
        id: 584,
        name: "sdf nbb",
        img: "/images/avatar.png",
        uuid: "879a1f43-d496-43eb-a658-648071820d31"
      };
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const submit = createAsyncThunk(
  "auth/submit",
  async (
    body: {
      uuid: string;
      general?: {
        firstname: string;
        lastname: string;
      };
      education: { degree: Degree; graduatedIn: Country; university: string };
      location: {
        country: Country;
        region: Region;
        district: District;
        subDistrict: SubDistrict;
        village: Village;
      };
      avatar: FormData
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<{ user: any }>(
        "api/auth/submit",
        body
      );
      console.log('responsedata', response.data)
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>("api/logout");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

/********************************** */
const initialState: AuthState = {
  jwt: null,
  status: Status.IDLE,
  register: Register.STEP1,
  // user: null,
  user: {
    id: 584,
    name: "sdf nbb",
    img: "/images/avatar.png",
    uuid: "879a1f43-d496-43eb-a658-648071820d31"
  },
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateJWT: (state: AuthState, action: PayloadAction<{ jwt: any }>) => {
      state.jwt = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload;
      // state.me = action.payload.me
      state.status = Status.IDLE;
    });
    builder.addCase(login.rejected, (state, action) => {
      // state = { ...internalInitialState, error: action.error.message }
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.jwt = null;
      state.error = action.payload;
      // throw new Error(action.error.message)
    });
    builder.addCase(signup.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.register = Register.STEP2;
      state.status = Status.IDLE;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submit.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submit.fulfilled, (state, action) => {
      // state.user = action.payload;
      state.register = Register.COMPLETED;
      state.status = Status.IDLE;
    });
    builder.addCase(submit.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logout.fulfilled, (_state) => initialState);

    // builder.addCase(fetchUser.rejected, (state, action) => {
    //   state = { ...internalInitialState, error: action.error }
    //   // throw new Error(action.error.message)
    // })
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.me = action.payload
    // })
  },
});

export const { updateJWT, reset } = authSlice.actions;
