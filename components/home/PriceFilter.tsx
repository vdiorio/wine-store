import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30%;
  margin: 0 auto;
  padding: 0 20px;
  gap: 10px;
  span {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    vertical-align: middle;
    margin 10px 0;
  }
`;

export default function PriceFilter(
  { setPriceRange }: { setPriceRange: (priceRange: string) => void },
) {
  const onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(e.target.value);
  };

  return (
    <FilterContainer className="filter-container">
      <h3>Refine sua busca</h3>
      <span>Por preço</span>
      <label htmlFor="<=40">
        <input onChange={onRangeChange} name="price-range" type="radio" id="<=40" value="0-40" />
        Até R$40
      </label>
      <label htmlFor="40-60">
        <input onChange={onRangeChange} name="price-range" type="radio" id="40-60" value="40-60" />
        R$40 até R$60
      </label>
      <label htmlFor="60-100">
        <input onChange={onRangeChange} name="price-range" type="radio" id="60-100" value="60-100" />
        R$60 até R$100
      </label>
      <label htmlFor="100-200">
        <input onChange={onRangeChange} name="price-range" type="radio" id="100-200" value="100-200" />
        R$100 até R$200
      </label>
      <label htmlFor="200-500">
        <input onChange={onRangeChange} name="price-range" type="radio" id="200-500" value="200-500" />
        R$200 até R$500
      </label>
      <label htmlFor=">500">
        <input onChange={onRangeChange} name="price-range" type="radio" id=">500" value="500-999999" />
        Acima de R$500
      </label>
    </FilterContainer>
  );
}

PriceFilter.propTypes = {
  setPriceRange: PropTypes.func.isRequired,
};
