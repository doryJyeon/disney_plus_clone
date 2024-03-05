import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"

const Nav = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [show, handleShow] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const initialUserData = localStorage.getItem("userData")? JSON.parse(localStorage.getItem("userData")) : {}
  const [userData, setUserData] = useState(initialUserData)

  // login에 따라서 페이지 이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user && pathname === "/") {
        navigate("/main")
      } else if(!user) {
        navigate("/")
      }
    })
  }, [auth, navigate, pathname])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    window.scrollY > 50
      ? handleShow(true)
      : handleShow(false)
  }
  
  const handleChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      setUserData(result.user)
      localStorage.setItem("userData", JSON.stringify(result.user))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({})
        localStorage.removeItem("userData")
        navigate(`/`)
      }).catch(error => {
        alert(error.message)
      })
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          src="/images/logo.svg" 
          alt="Disney Plus logo"
          onClick={() => {navigate("/")}} />
      </Logo>

      { pathname === "/" 
        ? (<Login onClick={handleAuth} ></Login>) 
        : (
          <>
            <Input 
              value={searchValue} 
              onChange={handleChange}
              className="nav__input"
              type="text"
              placeholder="movie search"
            />

            <SignOut onclick={handleSignOut}>
              <UserImg src={userData.photoURL} alt={userData.displayName} />
              <DropDown>
                Sign Out
              </DropDown>
            </SignOut>
          </>
        )
      }
    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background-color: rgba(19, 19, 19, .6);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0,0,0, 0.582);
  border-radius: 5px;
  color: white; 
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  
  img {
    display: block;
    width: 100%;
  }
`
