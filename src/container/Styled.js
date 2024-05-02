import styled from "styled-components";

const GlobalUtilityStyle = styled.div`
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => {
      return theme?.token?.colorPrimary;
    }};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => {
      return theme?.token?.secondaryColor;
    }};
  }

  .ant-page-header-heading {
    display: flex;
    align-items: center;
    gap: 10px 0;
  }

  .ant-page-header-heading-extra {
    display: flex;
    justify-content: flex-end;
  }

  .ant-page-header-heading-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-input-number-input-wrap {
    font-size: 14px;
  }

  .ant-input-affix-wrapper-lg {
    font-size: 14px;
  }

  .ant-select {
    border: 2px solid
      ${({ theme }) => {
        return theme?.token?.colorPrimary;
      }} !important;

    // #dcbfff !important;
    border-radius: 8px;
  }

  .ant-select:hover {
    border: 2px solid
      ${({ theme }) => {
        return theme?.token?.secondaryColor;
      }} !important;
    // #51258f !important;
    // border-radius: 8px;
  }

  .ant-select-focused {
    border: 2px solid
      ${({ theme }) => {
        return theme?.token?.secondaryColor;
      }} !important;
    // #51258f !important;
    border-radius: 8px;
  }

  .ant-select-selector {
    font-size: 14px !important;
    border: none !important;
  }

  .ant-btn-primary {
    background-color: ${({ theme }) => {
      return theme?.token?.colorPrimary;
    }} !important;
  }

  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: ${({ theme }) => {
      return theme?.token?.secondaryColor;
    }} !important;
  }

  .ant-menu-item-selected {
    background-color: ${({ theme }) => {
      return theme?.token?.colorPrimary;
    }} !important;

    color: ${({ theme }) => {
      return theme?.token?.secondaryColor;
    }} !important;
  }

  .ant-btn-primary:hover {
    background-color: ${({ theme }) => {
      return theme?.token?.secondaryColor;
    }} !important;
  }
`;

export { GlobalUtilityStyle };
