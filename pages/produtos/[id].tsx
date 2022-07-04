import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ReactLoading from 'react-loading';
import { apiFetchAll } from '../../services/fetch';
import { Product } from '../../interfaces';
import fullStar from '../../public/images/full-star.svg';
import emptyStar from '../../public/images/empty-star.svg';

const ProductPage = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  button {
    margin: 20px;
    margin-left: 170px;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    border: none;
    color: #555;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    background-color: transparent;
  }
  .product {
    padding: 100px 0;
    display: flex;
    .product-image-c {
      height: 500px;
      width: 400px;
      position: relative;
    }
    .product-info {
      padding: 20px;
    }
    .rating-container {
      display: inline-block;
    }
    .product-tags {
      width: 100%;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #555555;
    }
    .product-path {
      color: #888888;
    }
    .country {
      color: #C81A78;
      font-weight: bold;
    }
    .sommelier-comment {
      max-width: 500px;
      color: #666666;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
    }
    .product-hero {
      margin-top: 20px;
      font-weight: 700;
      font-size: 28px;
      line-height: 32px;
    }
    div {
      .flag-container {
        height: 16px;
        width: 16px;
        position: relative;
        display: inline-block;
      }
    }
  }
`;

export default function ProductCard() {
  const [product, setProduct] = useState({} as Product);
  const [notFound, setNotFound] = useState(false);
  const { id = '1' } = useRouter().query;
  const stars = [1, 2, 3, 4, 5];
  useEffect(() => {
    apiFetchAll()
      .then(({ items }: { items: Product[] }) => {
        const foundProduct = items.find((p: Product) => String(p.id) === id);
        if (!foundProduct) {
          setNotFound(true);
        }
        setProduct(foundProduct!);
      });
  }, [id]);
  return (
    <ProductPage>
      <button type="button" onClick={Router.back}>{'< Voltar'}</button>
      { notFound
        ? <ReactLoading height={667} width={375} />
        : (
          <div className="product">
            {product.image && (
            <>
              <div className="product-image-c">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" />
              </div>
              <div className="product-info">
                <div className="product-path">
                  <a href="/" className="product-path country">Vinhos</a>
                  {' > '}
                  <a href="/" className="product-path country">{product.country}</a>
                  {' > '}
                  <a href="/" className="product-path">{product.region}</a>
                </div>
                <div>
                  <h1 className="product-hero">{product.name}</h1>
                  <div>
                    <span className="product-tags">
                      <div className="flag-container">
                        <Image src={product.flag} alt={product.name} layout="fill" objectFit="contain" />
                      </div>
                      {`${product.country} ${product.type} ${product.classification} ${product.volume}`}
                      {stars.map((index) => (
                        <div className="rating-container">
                          { index <= product.rating
                            ? <Image src={fullStar} alt="star" />
                            : <Image src={emptyStar} alt="star" />}
                        </div>
                      ))}
                    </span>
                  </div>
                </div>
                <h3>Comentário do sommelier</h3>
                <p className="sommelier-comment">{product.sommelierComment}</p>
                <button type="button">Adicionar</button>
              </div>
            </>
            )}
          </div>
        ) }
    </ProductPage>
  );
}
