'use client'
import styled from "styled-components";

export const Body = styled.body`
position: relative;
display: grid;
grid-template-rows: 1.1fr auto;
margin: 0;
min-height: 100vh;
& .content {
    margin: 8px;
}
`