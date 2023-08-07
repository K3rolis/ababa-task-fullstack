import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import styles from './Navigation.module.css';
import Container from '../container/Container';
import { LinkButton } from '../buttons/Buttons';
import classes from '../buttons/Buttons.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscChromeClose } from 'react-icons/vsc';

const Navigation = () => {
  const { auth, setAuth } = useContext(LoginContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = () => {
    setAuth({
      username: '',
      isLoggedIn: false,
    });
    navigate('/');
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search) {
      navigate(`/movies/search/${search}`);
    }
  };

  return (
    <div className={styles.background}>
      <Container>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <NavLink to={'/'}> Kerolis</NavLink>
          </div>
          <div className={styles.navbarGap}>
            <form onSubmit={handleSubmit} className={styles.searchBox}>
              <div className={styles.searchContent}>
                <input type="search" placeholder="search..." onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
                <button className={styles.searchButton}>
                  <AiOutlineSearch className={styles.searchIcon} />
                </button>
              </div>
            </form>
          </div>

          <div className={styles.auth}>
            {!auth.isLoggedIn ? (
              <div className={styles.navbarGap}>
                <LinkButton className={classes.link}>
                  <NavLink to={'/login'}> Sign in</NavLink>
                </LinkButton>
                <LinkButton className={classes.outline}>
                  <NavLink to={'/register'}> Sign up</NavLink>
                </LinkButton>
              </div>
            ) : (
              <div>
                <span className={styles.username}>{auth.username},</span>
                <button className={`${classes.linkButton} ${classes.link}`} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className={`${styles.hamburgerMenu} ${styles.hamburgerMenuActive}`} onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu className={styles.hamburger} />

            {isOpen && (
              <div className={`${styles.responsiveNavigation}`}>
                <div className={styles.hamburgerClose}>
                  <VscChromeClose className={styles.hamburger} />
                </div>
                <ul className={styles.responsiveLinks}>
                  {!auth.isLoggedIn ? (
                    <>
                      <li>
                        <Link to="/login">Sign in</Link>
                      </li>
                      <li>
                        <Link to="/register">Sign up</Link>
                      </li>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <span className={styles.username}>{auth.username},</span>
                      <button className={`${classes.linkButton} ${classes.link}`} onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}

                  <li>
                    <Link to="/">Home</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
