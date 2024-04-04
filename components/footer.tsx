'use client'
import { ITranslades } from '@/app/[lang]/dictionaries';
import Link from 'next/link';
import React, { useRef } from 'react';
import styled from 'styled-components';

export const Footer= ({dict}:{dict:ITranslades}) => {
  const year = useRef(new Date()).current
	return (
		<Container>
      <div className='lang'>
        <h3>{dict.footer.lang}</h3>
        <ul>
          <li><Link href='/en' >{dict.footer.languages.english}</Link></li>
          <li><Link href='/es' >{dict.footer.languages.spanish}</Link></li>
        </ul>
      </div>
      <div className='copyright'>© {year.getFullYear()} ChaoticTeam</div>
		</Container>
	);
}
const Container = styled.footer`
background-color: black;
color: white;
display: grid;
padding: 1rem;
grid-template-areas: "lang lang lang copyright";
text-transform: capitalize;
& .lang {
  grid-area: lang;
}
& .copyright {
  grid-area: copyright;
  justify-self: end;
  align-self: center;
}

`;
