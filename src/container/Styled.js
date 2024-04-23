import styled from "styled-components";

const GlobalUtilityStyle = styled.div`
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

  .custom-placeholder {
    .ant-input-affix-wrapper-lg {
      font-size: 14px;
    }
  }

  .ant-input-affix-wrapper > input.ant-input {
    padding: 7px 11px;
    font-size: 5px;
    line-height: 1.5;
    border-radius: 8px;
  }
`;

export { GlobalUtilityStyle };
