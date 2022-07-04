import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PriceFilter from '../components/home/PriceFilter';
import ProductCard from '../components/home/ProductCard';
import { Product } from '../interfaces';
import { apiFetch } from '../services/fetch';

const HomePage = styled.div`
  display: flex;
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 70%;
    gap: 0;
    .found-text {
      margin: 20px 0;
      span {
        font-weight: bold;
      }
    }
  }
  .products-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }
  .cart-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 23px;
    color: #fff;
    width: 256px;
    height: 39.36px;
    left: 0px;
    top: 348px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    border: none;
    margin: 20px 0;
    text-transform: uppercase;
    cursor: pointer;
    
    /* functional / sucess-default */
    
    background: #7EBC43;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0);
    border-radius: 4px;
  }
  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    a {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      min-width: 19px;
      padding: 5px 10px;
      color: #B6116E;
    }
    .page-button {
      border: 1px solid #B6116E;
      border-radius: 3px;
      margin: 5px;
      background: #fff;
      text-align: center;
    }
    .page-button:nth-of-type(2), .selected + .page-button {
      width: 70px;
    }
    .selected {
      background: #B6116E;
      color: #fff;
    }
  }
`;

export default function Home() {
  const [priceRange, setPriceRange] = useState('');
  const [products, setProducts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const page = useRouter().query.page as string;

  useEffect(() => {
    apiFetch(page || '1', priceRange)
      .then((response) => {
        if (String(response.page) === (page || 1)) {
          setNumberOfPages(response.totalPages);
          setNumberOfItems(response.totalItems);
          setProducts(response.items);
        }
      });
  }, [page]);

  return (
    <HomePage>
      <PriceFilter setPriceRange={setPriceRange} />
      <section>
        <div className="found-text">
          <span>{numberOfItems}</span>
          {' '}
          produtos encontrados.
        </div>
        <div className="products-container">
          {products.map((product) => (
            <div>
              <ProductCard product={product as Product} />
              <button className="cart-button" type="button">Adicionar</button>
            </div>
          ))}
        </div>
        <div className="pages">
          { page !== '1' && (
            <>
              <a className="page-button" href="/?page=1">1</a>
              <a href={`/?page=${Number(page) - 1}`}>{'<< Anterior'}</a>
            </>
          ) }
          <a
            className={Number(page) !== Number(page || 1) ? 'page-button' : 'page-button selected'}
            href={`/?page=${page || 1}`}
          >
            {page || 1}

          </a>
          { numberOfPages !== Number(page) && (
          <>
            <a
              className={Number(page) !== Number(page || 1) + 1 ? 'page-button' : 'page-button selected'}
              href={`/?page=${Number(page || 1) + 1}`}
            >
              {Number(page || 1) + 1}
            </a>
            {
              Number(page) + 2 <= numberOfPages && (
              <>
                <a
                  className={Number(page) !== Number(page || 1) + 2 ? 'page-button' : 'page-button selected'}
                  href={`/?page=${Number(page || 1) + 2}`}
                >
                  {Number(page || 1) + 2}
                </a>
                <a href={`/?page=${numberOfPages}`}>...</a>

              </>
              )
            }
            <a href={`/?page=${Number(page || 1) + 1}`}>
              Próximo
              {' '}
              {'>>'}
            </a>

          </>
          )}
        </div>
      </section>
    </HomePage>
  );
}
