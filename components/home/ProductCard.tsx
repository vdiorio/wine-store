import PropTypes from 'prop-types';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Product } from '../../interfaces';
import selo from '../../public/images/selo.svg';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 10px 20px 20px 20px;
  background-color: #fff;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  .non-member {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    text-transform: uppercase;
    color: #888888;
  }
  h4 {
    max-width: 200px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }
  div.image-container {
    min-width: 100px;
    min-height: 180px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .selo-wine {
      right: 0px;
      bottom: 12px;
      width: 40px;
      height: 40px;
      position: absolute;
    }
  }
  .full-price-c {
    margin: 0;
    .full-price {
      color: #888888;
      text-decoration: line-through;
      font-style: normal;
      font-weight: 700;
      font-size: 11px;
      line-height: 16px;
    }
    .discount {
      background-color: #F79552;
      border-radius: 5px;
      text-decoration: none;
      color: #fff;
      padding: 2px 5px;
      margin-left: 5px;
      font-style: normal;
      font-weight: 700;
      font-size: 10px;
      line-height: 12px;
    }
  }
  .member-price-c {
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 27px;
    .price-hero {
      font-size: 23px;
      font-weight: bold;
    }
    .member-price {
      font-size: 11px;
      font-weight: bold;
      color: #B6116E;
      margin-left: 5px;
      .price-hero {
        font-size: 24px;
      }
    }
  }
  `;

export default function ProductCard({ product }: { product: Product }) {
  const {
    name, image, price, discount, priceMember, priceNonMember,
  } = product;

  function formatPrice(priceToFormat: number) {
    const p = priceToFormat.toFixed(2);
    const [unit, decimals] = p.split('.');
    return (
      <>
        <span className="price-hero">
          {unit}
          ,
        </span>
        <span>{decimals}</span>
      </>
    );
  }
  return (
    <Link href={`/produtos/${name}`}>
      <Card>
        <div className="image-container">
          <Image src={image} alt={name} layout="fill" objectFit="contain" />
          <div className="selo-wine">
            <Image src={selo} alt="selo" layout="fill" objectFit="contain" />
          </div>
        </div>
        <h4>{name}</h4>
        <div className="full-price-c">
          <span className="full-price">
            R$
            {formatPrice(price)}
          </span>
          <span className="discount">{`${discount}% OFF`}</span>
        </div>
        <div className="member-price-c">
          <span className="member-hero">SÓCIO WINE</span>
          <span className="member-price">
            R$
            {formatPrice(priceMember)}
          </span>
        </div>
        <span className="non-member">
          Não SÓCIO
          { ' ' }
          <span>
            R$
            {formatPrice(priceNonMember)}
          </span>
        </span>
      </Card>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    priceMember: PropTypes.number.isRequired,
    priceNonMember: PropTypes.number.isRequired,
  }).isRequired,
};
