import styled, { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  body{
    background-color: #FFA07A;
  }
  `;

export const Container = styled.div`
    background-color: #D3D3D3;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    padding: 50px 0;

    @media(max-width: 750px){
        flex-direction: column;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
`;

export const LogoLink = styled.a`
    display: block;
`;

export const InfoArea = styled.div`
    width: 100%;
    margin: 20px 0;

    @media(max-width: 750px){
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const GridArea = styled.div`
    background-color: #BDB76B;
    display: flex;
    flex: 1;
    justify-content: flex-end;

    @media(max-width:750px){
        justify-content: center;
        margin: 10px 20px;
    }
`;

export const Grid = styled.div`
    background-color: red;
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

