import React from 'react';

const Footer = () => {
  return (
    <footer style={{position:'absolute', bottom:0, width:'100%'}} className="bg-dark text-light py-3">
      {/* <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              ante vel dui sagittis elementum eu a nulla. Sed eleifend mauris sit
              amet mauris accumsan volutpat.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <h3>Contact Us</h3>
            <p>Email: syntaxswap@gmail.com</p>
            
          </div>
        </div>
      </div> */}
      <div className="bg-secondary text-center py-2">
        <p>Copyright © 2023 SyntaxSwap Tool</p>
      </div>
    </footer>
  );
};

export default Footer;
