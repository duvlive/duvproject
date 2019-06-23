import React from 'react';
import IconPhone from 'assets/icons/phone.svg';

const Header = () => {
  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="row">
          <div className="top-header__left col-sm-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">
                  {' '}
                  <img alt="phone icon" src={IconPhone} /> +2348 234 567 890{' '}
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">info@duvlive.com</a>
              </li>
            </ul>
          </div>
          <div className="top-header__right text-right col-sm-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">Login </a>
              </li>
              <li className="list-inline-item">
                <a href="/">Register Now</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
