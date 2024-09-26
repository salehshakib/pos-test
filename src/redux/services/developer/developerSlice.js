import { createSlice } from '@reduxjs/toolkit';

import { SITE_LOGO } from '../../../assets/data/defaultLogo';

const initialState = {
  developedBy: null,
  hyperLink: null,
  logo: SITE_LOGO,
  company: null,

  dateFormat: 'DD-MM-YYYY',
  digits: 2,
};

const developerSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    setDeveloper: (state, action) => {
      const { developedBy, hyperLink } = action.payload;

      state.developedBy = developedBy;
      state.hyperLink = hyperLink;
    },
    setLogo: (state, action) => {
      state.logo = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },

    setDateFormat: (state, action) => {
      if (action.payload.toLowerCase() === 'invalid date') {
        state.dateFormat = 'DD-MM-YYYY';
      } else {
        state.dateFormat = action.payload;
      }
    },
    setDigits: (state, action) => {
      state.digits = parseInt(action.payload, 10);
    },
  },
});

export const { setDeveloper, setLogo, setCompany, setDateFormat, setDigits } =
  developerSlice.actions;

export const getLogo = (state) => state.developer.logo;
export const useCompany = (state) => state.developer.company;

export default developerSlice.reducer;
