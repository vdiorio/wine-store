import Image from 'next/image';
import React from 'react';
import logo from '../public/images/wine.png';
import search from '../public/images/search.png';
import user from '../public/images/user.png';
import cart from '../public/images/wine-cart.png';

/**
 * Header component.
 * @return {JSX.Element}
 */
export default function Header() {
  return (
    <header>
      <Image className="wine-logo" alt="logo" src={logo} />
      <nav>
        <ul>
          <li>Clube</li>
          <li>Loja</li>
          <li>Produtores</li>
          <li>Ofertas</li>
          <li>Eventos</li>
        </ul>
      </nav>
      <nav>
        <ul className="right-buttons">
          <Image alt="search" src={search} />
          <Image alt="user" src={user} />
          <Image alt="cart" src={cart} />
        </ul>
      </nav>
    </header>
  );
}
